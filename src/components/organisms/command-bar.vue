<script lang="ts" setup>
import { ref } from 'vue'
import { useMagicKeys } from '@vueuse/core'
import { Command } from 'vue-command-palette'
import { useAuthStore } from 'store/auth.store'

// globals
const { changeTheme } = useTheme()
const { logout } = useAuthStore()

// refs
const visible = ref(false)
const inputValue = ref('')
const commandItems = [
  {
    title: 'Links',
    children: [
      {
        icon: 'ph:link',
        label: 'Add new link',
        shortcut: ['S', 'P'],
        action: () => {
          //
        },
      },
    ],
  },
  {
    title: 'Open-Source',
    children: [
      {
        icon: 'ph:github-logo',
        label: 'Github',
        shortcut: ['⇧', 'D'],
        action: () => {
          navigateTo('https://github.com/sumitkolhe/kut', { external: true })
        },
      },
    ],
  },
  {
    title: 'Preferences',
    children: [
      {
        icon: 'ph:sun',
        label: 'Change Theme',
        shortcut: ['G', 'T'],
        action: () => changeTheme(),
      },
      {
        icon: 'ph:arrow-line-right-light',
        label: 'Logout',
        shortcut: [],
        action: async () => await logout(),
      },
    ],
  },
]

const { dead, escape } = useMagicKeys()

watch(dead, () => {
  visible.value = true
})

watch(escape, (esc) => {
  if (esc) visible.value = false
})
</script>

<template>
  <Command.Dialog :visible="visible" theme="vercel">
    <template #header>
      <!-- <div command-vercel-label>
        <label command-vercel-badge> Home </label>
      </div> -->
      <Command.Input v-model:value="inputValue" placeholder="What do you need?" />
    </template>
    <Command.Loading> Hang on... </Command.Loading>

    <template #body>
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>
        <Transition name="pop-page">
          <KeepAlive>
            <Command.Group v-for="item in commandItems" :key="item.title" :heading="item.title">
              <Command.Item
                v-for="child in item.children"
                :key="child.label"
                :shortcut="child.shortcut"
                :data-value="child.label"
                @select="child.action"
              >
                <icon :name="child.icon" />

                <p>{{ child.label }}</p>
                <div command-vercel-shortcuts="">
                  <kbd v-for="key in child.shortcut" :key="key">{{ key }}</kbd>
                </div>
              </Command.Item>
            </Command.Group>
          </KeepAlive>
        </Transition>
      </Command.List>
    </template>
  </Command.Dialog>
</template>

<style>
:root {
  --gray4: hsl(0, 0%, 93%);
  --gray6: hsl(0, 0%, 88.7%);
  --gray8: hsl(0, 0%, 78%);
  --gray9: hsl(0, 0%, 56.1%);
  --gray11: hsl(0, 0%, 43.5%);
  --gray12: hsl(0, 0%, 9%);
  --grayA3: hsla(0, 0%, 0%, 0.047);
}

.dark {
  --gray4: hsl(0, 0%, 15.8%);
  --gray6: hsl(0, 0%, 20.5%);
  --gray8: hsl(0, 0%, 31.2%);
  --gray9: hsl(0, 0%, 43.9%);
  --gray11: hsl(0, 0%, 62.8%);
  --gray12: hsl(0, 0%, 93%);
  --grayA3: hsla(0, 0%, 100%, 0.056);
}

div [command-dialog-mask] {
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 200;
  animation: 333ms cubic-bezier(0.16, 1, 0.3, 1) 0s 1 normal none running shown;

  @apply dark:bg-primary-900/[0.8] bg-primary-50/[0.8];
}

div [command-dialog-wrapper] {
  position: relative;
  border-radius: 8px;
  border: 1px solid var(--gray6);
  box-shadow: 0 16px 70px rgba(0, 0, 0, 0.3);
  flex-direction: column;
  margin: 20vh auto auto;
  max-width: 560px;
  animation: 333ms cubic-bezier(0.16, 1, 0.3, 1) 0s 1 normal none running shown;

  @apply bg-primary-50 dark:bg-primary-800;
}

.vercel [command-root] {
  max-width: 640px;
  width: 100%;
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--gray6);
  transition: transform 100ms ease;
}

.dark .vercel [command-root] {
  background: rgba(22, 22, 22, 0.7);
}

.vercel [command-input] {
  border: none;
  width: 100%;
  padding: 16px;
  outline: none;
  color: var(--gray12);
  border-bottom: 1px solid var(--gray6);
  margin-bottom: 8px;
  border-radius: 0;
  background-color: transparent;
}

.vercel [command-input]::placeholder {
  @apply text-primary-300 dark:text-primary-600;
}

.vercel [command-vercel-badge] {
  height: 20px;
  background: var(--grayA3);
  display: inline-flex;
  align-items: center;
  padding: 0 8px;
  font-size: 12px;
  border-radius: 4px;
  margin: 4px 0 4px 4px;
  user-select: none;
  text-transform: capitalize;
  font-weight: 500;

  @apply text-primary-400 dark:text-primary-400;
}

.vercel [command-item] {
  content-visibility: auto;
  cursor: pointer;
  height: 48px;
  border-radius: 8px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
  color: var(--gray11);
  user-select: none;
  will-change: background, color;
  transition: all 150ms ease;
  transition-property: none;
}

.vercel [command-item][aria-selected='true'] {
  background: var(--grayA3);
  color: var(--gray12);
}

.vercel [command-item][aria-disabled='true'] {
  color: var(--gray8);
  cursor: not-allowed;
}

.vercel [command-item]:active {
  transition-property: background;
  background: var(--gray4);
}

.vercel [command-item] + [command-item] {
  margin-top: 4px;
}

.vercel [command-item] svg {
  width: 18px;
  height: 18px;
}

.vercel [command-list] {
  height: min(330px, calc(var(--command-list-height)));
  max-height: 400px;
  overflow: auto;
  overscroll-behavior: contain;
  transition: 100ms ease;
  transition-property: height;
  padding: 0px 8px;
  margin-bottom: 12px;
}

.vercel [command-vercel-shortcuts] {
  display: flex;
  margin-left: auto;
  gap: 8px;
}

.vercel [command-vercel-shortcuts] kbd {
  font-size: 12px;
  min-width: 20px;
  padding: 4px;
  height: 20px;
  border-radius: 4px;
  color: var(--gray11);
  background: var(--gray4);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
}

.vercel *:not([hidden]) + [command-group] {
  margin-top: 8px;
}

.vercel [command-group-heading] {
  user-select: none;
  font-size: 12px;
  color: var(--gray11);
  padding: 0 8px;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.vercel [command-empty] {
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  white-space: pre-wrap;
  color: var(--gray11);
}
</style>

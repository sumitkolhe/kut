export const useDrawer = createSharedComposable(() => {
  const isDrawerVisible = ref(false)

  const toggleDrawer = () => {
    isDrawerVisible.value = !isDrawerVisible.value
  }

  return { toggleDrawer, isDrawerVisible }
})

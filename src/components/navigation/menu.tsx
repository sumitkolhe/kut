import React from 'react'
import { Button, useTheme, Popover } from '@geist-ui/react'
import * as Icons from 'react-feather'
import Link from 'next/link'
import { usePrefers } from '../../lib/use-prefers'

const Menu: React.FC = () => {
  const theme = useTheme()
  const prefers = usePrefers()

  return (
    <div className="border-b border-geistGray-200 dark:border-geistGray-700 bg-geistGray-100 dark:bg-black">
      <nav className="items-center justify-between hidden w-full sm:flex ml-auto mr-auto max-w-5xl">
        <div className="flex items-center py-6">
          <div className="overflow-hidden">
            <nav className="">Trym</nav>
          </div>
        </div>
        <div className="flex items-center">
          <Button
            aria-label="Toggle Dark mode"
            className="theme-button"
            auto
            type="abort"
            onClick={() => prefers.switchTheme(theme.type === 'dark' ? 'light' : 'dark')}
          >
            {theme.type === 'dark' ? <Icons.Sun size={16} /> : <Icons.Moon size={16} />}
          </Button>

          <Popover
            content={
              <div className="w-56">
                <Popover.Item title>
                  <span>User Settings</span>
                </Popover.Item>
                <Popover.Item>
                  <Link href="#">Teams</Link>
                </Popover.Item>
                <Popover.Item>
                  <Link href="https://github.com/ofekashery/react-dashboard-design">GitHub</Link>
                </Popover.Item>
                <Popover.Item line />
                <Popover.Item>
                  <Link href="#">Logout</Link>
                </Popover.Item>
              </div>
            }
            placement="bottomEnd"
          >
            <Button icon={<Icons.Settings />} auto>
              Menu
            </Button>
          </Popover>
        </div>
      </nav>
      <nav className="flex flex-col items-center w-full px-8 py-6 sm:hidden">
        <div className="z-20 flex items-center justify-between w-full">
          <div className="flex items-center min-w-0 pr-6 max-w">
            <Link href="/projects" passHref>
              <Button type="secondary" auto>
                Create Project
              </Button>
            </Link>
          </div>
          <div className="flex justify-end cursor-pointer"></div>
        </div>
      </nav>
    </div>
  )
}

export default Menu

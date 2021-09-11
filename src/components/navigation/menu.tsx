import React from 'react'
import { Button, Tooltip, useTheme, Popover } from '@geist-ui/react'
import * as Icons from 'react-feather'
import { usePrefers } from '../../lib/use-prefers'
import UserSettings from '../../components/navigation/user-settings'

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
        <div className="flex items-center"></div>
        <Popover content={<UserSettings />} placement="bottomEnd" portalClassName="user-settings__popover">
          <Button icon={<Icons.Settings />} auto>
            Menu
          </Button>
        </Popover>
      </nav>
      <nav className="flex flex-col items-center w-full px-8 py-6 sm:hidden">
        <div className="z-20 flex items-center justify-between w-full">
          <div className="flex items-center min-w-0 pr-6 max-w">
            <a aria-label="Home" href="/"></a>
          </div>
          <div className="flex justify-end cursor-pointer"></div>
        </div>
      </nav>
    </div>
  )
}

export default Menu

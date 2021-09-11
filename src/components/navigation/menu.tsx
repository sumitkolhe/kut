import React from 'react'
import { Avatar, Button, useTheme, Popover, ButtonDropdown } from '@geist-ui/react'
import * as Icons from 'react-feather'
import Submenu from './submenu'
import UserSettings from './user-settings'
import { usePrefers } from '../../lib/use-prefers'

const Menu: React.FC = () => {
  const theme = useTheme()
  const prefers = usePrefers()

  return (
    <>
      <nav className="menu-nav">
        <h1 className="menu-nav__title">Trym</h1>
        <div>
          <Button
            aria-label="Toggle Dark mode"
            className="theme-button"
            auto
            type="abort"
            onClick={() => prefers.switchTheme(theme.type === 'dark' ? 'light' : 'dark')}
          >
            {theme.type === 'dark' ? <Icons.Sun size={24} /> : <Icons.Moon size={24} />}
          </Button>
          <Popover content={<UserSettings />} placement="bottomEnd" portalClassName="user-settings__popover">
            <button className="user-settings__button">
              <Avatar height="1.5" width="1.5" text="OA" />
            </button>
          </Popover>
          <ButtonDropdown>
            <ButtonDropdown.Item main>Default Action</ButtonDropdown.Item>
            <ButtonDropdown.Item>Secondary Action</ButtonDropdown.Item>
            <ButtonDropdown.Item>Tertiary Action</ButtonDropdown.Item>
          </ButtonDropdown>
        </div>
      </nav>
      <Submenu />
      <style jsx>{`
        .menu-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: ${theme.layout.pageWidthWithMargin};
          max-width: 100%;
          margin: 0 auto;
          padding: 0 ${theme.layout.pageMargin};
          background-color: ${theme.palette.background};
          font-size: 16px;
          height: 96px;
          box-sizing: border-box;
        }
        .menu-nav__title {
          font-size: 2rem;
          font-weight: 700;
          margin: 0;
          letter-spacing: 0;
        }
        .menu-nav > div {
          display: flex;
          align-items: center;
        }
        .menu-nav :global(.theme-button) {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.25rem;
          height: 2.25rem;
          padding: 0;
          margin: 0 ${theme.layout.gapHalf};
        }
        .user-settings__button {
          border: none;
          background: none;
          padding: 0;
          margin: 0;
          appearance: none;
          cursor: pointer;
        }
        :global(.user-settings__popover) {
          width: 180px !important;
        }
      `}</style>
    </>
  )
}

export default Menu

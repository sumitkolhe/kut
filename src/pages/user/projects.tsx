import React from 'react'
import { Button, Input, useTheme } from '@geist-ui/react'
import SearchIcon from '@geist-ui/react-icons/search'
import CreateTeamIcon from '@geist-ui/react-icons/userPlus'

const Page = (): JSX.Element => {
  const theme = useTheme()

  return (
    <>
      <div className="page__wrapper">
        <div className="page__content">
          <div className="actions-stack">
            <Input
              scale={1.25}
              width="100%"
              icon={<SearchIcon color={theme.palette.accents_5} />}
              placeholder="Search..."
            />
            <Button auto type="secondary" marginLeft={1}>
              New Project
            </Button>
            <Button iconRight={<CreateTeamIcon />} marginLeft={1} px={0} width="48px" />
          </div>
        </div>
      </div>
      <style jsx>{`
        .page__wrapper {
          background-color: ${theme.palette.accents_1};
          min-height: calc(100vh - 172px);
        }
        .page__content {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          width: ${theme.layout.pageWidthWithMargin};
          max-width: 100%;
          margin: 0 auto;
          padding: calc(${theme.layout.unit} * 2) ${theme.layout.pageMargin};
          box-sizing: border-box;
        }
        .actions-stack {
          display: flex;
          width: 100%;
        }
        .actions-stack :global(.input-wrapper) {
          background-color: ${theme.palette.background};
        }
        .actions-stack :global(input) {
          font-size: 14px;
        }
      `}</style>
    </>
  )
}
export default Page

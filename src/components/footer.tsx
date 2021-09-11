import React from 'react'
import { Text, Link, useTheme } from '@geist-ui/react'

const Footer: React.FC = () => {
  const theme = useTheme()

  return (
    <>
      <footer>
        <Text>
          Copyright 2020 ©{' '}
          <Link href="https://github.com/sumitkolhe/trym" target="_blank" rel="noopener" underline>
            Trym
          </Link>{' '}
        </Text>
      </footer>
      <style jsx>{`
        footer {
          border-top: 1px solid ${theme.palette.border};
          padding: ${theme.layout.gapQuarter} ${theme.layout.gap};
          text-align: center;
        }
      `}</style>
    </>
  )
}

export default Footer

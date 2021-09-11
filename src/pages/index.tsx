import React from 'react'
import NextLink from 'next/link'
import { useTheme, Button, Card, Grid } from '@geist-ui/react'
import PackageIcon from '@geist-ui/react-icons/package'
import FeatherIcon from '@geist-ui/react-icons/feather'
import GitHubIcon from '@geist-ui/react-icons/github'
import DocsIcon from '@geist-ui/react-icons/bookOpen'

const Page = (): JSX.Element => {
  const theme = useTheme()

  return (
    <>
      <h1 className="text-center text-9xl">Trym</h1>
      <h3 className="hero__description">An open source modern link shortener.</h3>
      <div className="hero__actions">
        <NextLink href="/en-us/guide/installation" passHref>
          <Button auto type="success" icon={<DocsIcon />} shadow scale={1.25} margin={0.25}>
            Documentation
          </Button>
        </NextLink>
        <NextLink href="https://github.com/geist-org/react" passHref>
          <Button icon={<GitHubIcon />} auto type="secondary" scale={1.25} margin={0.25}>
            GitHub
          </Button>
        </NextLink>
      </div>
    </>
  )
}

export default Page

/* eslint-disable @next/next/no-page-custom-font */
import 'tailwindcss/tailwind.css'
import React, { useCallback, useEffect, useState } from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { CssBaseline } from '@geist-ui/react'
import { PrefersContext, themes, ThemeType } from '../lib/use-prefers'
import Menu from '../components/navigation/menu'
import Footer from '../components/footer'

const DashboardApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const [themeType, setThemeType] = useState<ThemeType>('dark')

  useEffect(() => {
    document.documentElement.removeAttribute('style')
    document.body.removeAttribute('style')

    const theme = window.localStorage.getItem('theme') as ThemeType
    if (themes.includes(theme)) setThemeType(theme)
  }, [])

  const switchTheme = useCallback((theme: ThemeType) => {
    setThemeType(theme)
    if (typeof window !== 'undefined' && window.localStorage) window.localStorage.setItem('theme', theme)
  }, [])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <title>Trym</title>
        <meta name="og:title" content="React Dashboard Design" />
        <meta name="og:description" content="Inspired by and based on the Vercel™ Design System." />
        <meta name="description" content="Inspired by and based on the Vercel™ Design System." />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <CssBaseline />
      <PrefersContext.Provider value={{ themeType, switchTheme }}>
        <Menu />
        <Component {...pageProps} />
        <Footer />
      </PrefersContext.Provider>
    </>
  )
}

export default DashboardApp

/* eslint-disable no-console */
import React from 'react'
import { GetServerSideProps } from 'next'
import { requireAuthentication } from '../../components/auth'

const Page = (context): JSX.Element => {
  
  return (
    <>
      <h1 className="text-center text-9xl">PROTECTED PAGE {{this.props.me}}</h1>
    </>
  )
}

export default Page

export const getServerSideProps: GetServerSideProps = requireAuthentication(async () => ({
  props: {},
}))

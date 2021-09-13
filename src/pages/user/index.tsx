import React from 'react'
import { GetServerSideProps } from 'next'
import { requireAuthentication } from '../../components/auth'

const Page = (): JSX.Element => (
  <>
    <h1 className="text-center text-9xl">Trym</h1>
  </>
)

export default Page

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getServerSideProps: GetServerSideProps = requireAuthentication(async (_ctx) => ({
  props: {},
}))

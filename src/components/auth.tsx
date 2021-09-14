/* eslint-disable no-console */
import axios from 'axios'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

export const requireAuthentication = (gssp: GetServerSideProps) => async (context: GetServerSidePropsContext) => {
  try {
    const { req } = context
    const authCookie = req.headers.cookie

    const user = await axios.get('http://localhost:3000/api/user/me', {
      headers: { cookie: authCookie },
      withCredentials: true,
    })
    return {
      props: { me: user.data },
    }
  } catch (error) {
    console.log(error.message)
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }

  return await gssp(context)
}

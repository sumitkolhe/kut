import axios from 'axios'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

export const requireAuthentication = (gssp: GetServerSideProps) => async (context: GetServerSidePropsContext) => {
  const { req } = context
  const authCookie = req.headers.cookie
  const accessToken = authCookie?.split('=')[1]

  try {
    const user = await axios.get('http://localhost:3000/api/user/me')
    // eslint-disable-next-line no-console
    console.log(user.data)
    if (!accessToken)
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
      }
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }

  return await gssp(context)
}

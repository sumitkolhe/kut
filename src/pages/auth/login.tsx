import { Button, Spacer, Text } from '@geist-ui/react'
import Github from '@geist-ui/react-icons/github'
import Google from '@geist-ui/react-icons/facebook'

const Login = () => (
  <div className="flex flex-col items-center">
    <Text h1>Log in to Trym</Text>

    <Button scale={1.5} icon={<Github />} shadow type="secondary">
      Login with GitHub
    </Button>
    <Spacer height={1} />
    <Button scale={1.5} icon={<Google />} shadow type="success">
      Login with Google
    </Button>
    <Spacer height={1} />
  </div>
)

export default Login

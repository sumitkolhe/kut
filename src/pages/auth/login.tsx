import { Button, Spacer, Text, Input } from '@geist-ui/react'
import Github from '@geist-ui/react-icons/github'
import Google from '@geist-ui/react-icons/facebook'
import { useState } from 'react'
import axios from 'axios'

const Login = (): JSX.Element => {
  const [email, setEmail] = useState()
  const emailHandler = (e) => {
    setEmail(e.target.value)
  }
  const [password, setPassword] = useState()
  const passwordHandler = (e) => {
    setPassword(e.target.value)
  }

  const submitLoginDetails = async () => {
    axios.defaults.withCredentials = true
    await axios
      .post('http://localhost:3000/api/auth/login', {
        email: email,
        password: password,
      })
      .then((res) => {
        // eslint-disable-next-line no-console
        console.log(res.data)
      })
  }

  return (
    <div className="flex flex-col items-center">
      <Text h1>Log in to Trym</Text>

      <Input value={email} onChange={emailHandler} placeholder="Geist UI" />
      <Input value={password} onChange={passwordHandler} placeholder="Geist UI" />

      <Button scale={1.5} onClick={submitLoginDetails} shadow type="secondary">
        Login
      </Button>
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
}

export default Login

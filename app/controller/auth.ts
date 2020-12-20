import axios from 'axios'

let axiosConfig = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache',
  },
}

export const registerUser = async (email: string, password: string) => {
  const authToken = await axios
    .post(
      'http://localhost:80/api/auth/register',
      { email: email, password: password },
      axiosConfig
    )
    .then((response) => {
      console.log(response)
    })
    .catch((err) => {
      console.log(err)
    })
}

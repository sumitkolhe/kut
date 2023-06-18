import { useConfig } from 'server/common/configs'
import type { GithubUser, GithubUserEmail } from 'server/modules/users/types'

const {
  github: { clientId, clientSecret },
} = useConfig()

export const getGithubAccessToken = (code: string) => {
  console.log('clientId', clientId)
  return $fetch<{ access_token: string; token_type: string; scope: string }>(
    'https://github.com/login/oauth/access_token',
    {
      method: 'POST',
      headers: {
        accept: 'application/json',
      },
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        code,
      },
    }
  )
}

export const getGithubUser = (accessToken: string) => {
  return $fetch<GithubUser>('https://api.github.com/user', {
    headers: {
      accept: 'application/json',
      Authorization: `token ${accessToken}`,
    },
  })
}

export const getGithubUserEmails = (accessToken: string) => {
  return $fetch<GithubUserEmail[]>('https://api.github.com/user/emails', {
    headers: {
      accept: 'application/json',
      Authorization: `token ${accessToken}`,
    },
  })
}

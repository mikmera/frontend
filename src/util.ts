import Axios from 'axios'
import {
  initializeAppCheck,
  getToken,
  ReCaptchaV3Provider,
} from 'firebase/app-check'
import { app } from '~/service/firebase'

const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LcPWBEkAAAAAGvMehTfPWRw4-yqyAJ9mNg28xRp'),
})

export const api = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
})

export const fetcher = async (url: string) => {
  const appCheckTokenResponse = await getToken(
    appCheck,
    /* forceRefresh= */ false
  )
  const { data } = await api.get(url, {
    headers: {
      'X-Firebase-AppCheck': appCheckTokenResponse.token,
    },
  })

  return data.body
}

export const put = async (url: string, data: object) => {
  await api.put(url, data)
}

export const apiUrl = (path: string) =>
  `${import.meta.env.VITE_API_BASE}${path}`

import Axios from 'axios'
import {
  getToken,
  initializeAppCheck,
  ReCaptchaV3Provider,
} from 'firebase/app-check'
import { getCookie } from 'react-use-cookie'
import { app } from '~/service/firebase'
import { ApiBase } from '~/types/api'

export const api = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
})

const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LcPWBEkAAAAAGvMehTfPWRw4-yqyAJ9mNg28xRp'),
})

const getHeaders = async () => {
  const appCheckToken = await getToken(appCheck, false)
  const Authorization = getCookie('Authorization')
  return {
    Authorization: `Bearer ${Authorization}`,
    'X-Firebase-Appcheck': appCheckToken.token,
  }
}

export const fetcher = async (url: string): Promise<ApiBase> => {
  try {
    const headers = await getHeaders()
    const { data } = await api.get(url, { headers })
    return data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response?.data
  }
}

export const poster = async (
  url: string,
  payload: object,
): Promise<ApiBase> => {
  try {
    const headers = await getHeaders()
    const { data } = await api.post(url, payload, { headers })
    return data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response?.data
  }
}

export const patcher = async (
  url: string,
  payload: object,
): Promise<ApiBase> => {
  try {
    const headers = await getHeaders()
    const { data } = await api.patch(url, payload, { headers })
    return data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response?.data
  }
}

export const deleter = async (url: string): Promise<ApiBase> => {
  try {
    const headers = await getHeaders()
    const { data } = await api.delete(url, { headers })
    return data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response?.data
  }
}

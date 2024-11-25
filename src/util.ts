import Axios from 'axios'
import { getToken, initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'
import { getCookie } from 'react-use-cookie'
import { app } from '~/service/firebase'

const appCheck = initializeAppCheck(app, {
	provider: new ReCaptchaV3Provider(import.meta.env.VITE_RECAPTCHA_SITE_KEY)
})

export const api = Axios.create({
	baseURL: import.meta.env.VITE_API_BASE
})

export const fetcher = async (url: string) => {
	const Authorization = getCookie('Authorization')
	const appCheckTokenResponse = await getToken(appCheck, false)
	try {
		const { data } = await api.get(url, {
			headers: {
				Authorization: `Bearer ${Authorization}`,
				'X-Firebase-AppCheck': appCheckTokenResponse.token
			}
		})

		return data
	} catch (error: any) {
		return error.response.data
	}
}

export const put = async (url: string, data: object) => {
	const Authorization = getCookie('Authorization')
	const appCheckTokenResponse = await getToken(appCheck, /* forceRefresh= */ true)

	await api.put(url, data, {
		headers: {
			Authorization: `Bearer ${Authorization}`,
			'X-Firebase-AppCheck': appCheckTokenResponse.token
		}
	})
}

export const apiUrl = (path: string) => `${import.meta.env.VITE_API_BASE}${path}`

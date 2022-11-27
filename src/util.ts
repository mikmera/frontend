import Axios from 'axios'

export const api = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
})

export const fetcher = async (url: string) => {
  const { data } = await api.get(url)

  return data.body
}

export const apiUrl = (path: string) =>
  `${import.meta.env.VITE_API_BASE}${path}`

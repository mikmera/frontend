export enum ApiStatus {
  'SUCCESS' = 'success',
  'ERROR' = 'error',
}

export interface ApiBase {
  data: any
  status: ApiStatus
  error?: {
    code: string
    message: string
  }
}

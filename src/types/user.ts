export interface BaseUser {
  uuid: string
  roles: string[]
  points: number
  profile: {
    displayName: string
    bio: string
  }
}
export interface UserMe extends BaseUser {
  settings: {
    locale: string
    timezone: string
    darkMode: boolean
  }
}

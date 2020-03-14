export default interface User {
  uuid?: string | null
  username?: string
  fullname?: string
  email?: string
  roles: string[]
  access_token?: string
  refresh_token?: string
}

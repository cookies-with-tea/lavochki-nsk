import ky, { type BeforeRequestHook } from 'ky'

const baseUrl =
  process.env.NODE_ENV === 'production' || typeof window === 'undefined' ? process.env.BASE_URL: ''

const authHandler: BeforeRequestHook  = (request) => {
  if (typeof window !== 'undefined') {
    const access = localStorage.getItem('access')

    if (access) {
      request.headers.set('Authorization', `Bearer ${access}`)
    }
  }
}

export const kyInstance = ky.create({
  prefixUrl: `${baseUrl}/api/v1`,
  hooks: {
    beforeRequest: [authHandler]
  }
})

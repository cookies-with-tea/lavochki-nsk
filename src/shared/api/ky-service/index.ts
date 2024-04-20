import ky, { KyInstance, Options, ResponsePromise } from 'ky'

export class KyService {
  protected kyInstance!: KyInstance

  constructor(options: Options) {
    this.kyInstance = ky.create(options)
  }

  protected baseFetch = async <T = unknown>(url: string, options: Options): Promise<T> => {
    // try {
    //   const data = await this.kyInstance(url, options).json<T>()
    //
    //   return {
    //     data,
    //     error: undefined
    //   }
    // } catch (error) {
    //   return {
    //     data: undefined,
    //     error
    //   }
    // }

    return await this.kyInstance(url, options).json<T>()
  }
}

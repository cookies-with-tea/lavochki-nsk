import ky, { KyInstance, Options } from 'ky'

export class KyService {
  protected kyInstance!: KyInstance

  constructor(options: Options) {
    this.kyInstance = ky.create(options)
  }

  protected baseFetch = async <T = unknown>(url: string, options: Options): Promise<T> => {
    return await this.kyInstance(url, options).json<T>()
  }
}

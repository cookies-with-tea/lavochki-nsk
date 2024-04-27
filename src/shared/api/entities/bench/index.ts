import { AbstractBenchApi } from '#shared/api/entities/bench/bench.abstract'

class BenchApi extends AbstractBenchApi {
  create = async (payload: any) => {
    return await this.baseFetch<BenchTypes.All>('', {
      method: 'post',
    })
  }

  getAll = async () => {
    return await this.baseFetch<BenchTypes.All>('', {
      method: 'get',
    })
  }

  getOne = async (id: BenchTypes.One['id']) => {
    return await this.baseFetch<BenchTypes.One>(id, {
      method: 'get',
    })
  }

  updateOne = async (payload: BenchTypes.Update) => {
    return await this.baseFetch('', {
      method: 'patch',
      json: payload,
    })
  }

  deleteOne = async (id: BenchTypes.One['id']) => {
    return await this.baseFetch(id, {
      method: 'delete',
    })
  }
}

export const benchApi = new BenchApi({
  prefixUrl: '/api/todos',
})

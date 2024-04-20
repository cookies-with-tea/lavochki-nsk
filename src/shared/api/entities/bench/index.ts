import { AbstractBenchApi } from '#shared/api/entities/bench/bench.abstract'

class BenchApi extends AbstractBenchApi {
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
}

export const benchApi = new BenchApi({
  prefixUrl: '/api/todos',
})

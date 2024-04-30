import { BENCH_TAGS_MOCK_DATA } from '#entities/bench'
import { AbstractBenchApi } from '#entities/bench/api/repositories.abstract'

class BenchApi extends AbstractBenchApi {
  create = async (payload: BenchTypes.Create) => {
    console.log(payload)
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

  getTags = async () => {
    return await this.fakeFetch<BenchTypes.AllTags>(
      '',
      {
        method: 'get',
      },
      BENCH_TAGS_MOCK_DATA
    )
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

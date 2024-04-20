import { KyService } from '#shared/api'

export abstract class AbstractBenchApi extends KyService {
  abstract getAll(payload?: CommonTypes.PayloadPagination): Promise<BenchTypes.All>
  abstract getOne(id: BenchTypes.One['id']): Promise<BenchTypes.One>
}

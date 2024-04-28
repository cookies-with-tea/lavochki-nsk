import { KyService } from '#shared/api'

export abstract class AbstractBenchApi extends KyService {
  abstract create(payload?: BenchTypes.Create): any
  abstract getAll(payload?: CommonTypes.PayloadPagination): Promise<BenchTypes.All>
  abstract getOne(id: BenchTypes.One['id']): Promise<BenchTypes.One>
  abstract updateOne(payload: BenchTypes.Update): Promise<any>
  abstract deleteOne(id: BenchTypes.One['id']): Promise<any>
}

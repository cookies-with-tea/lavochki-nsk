import { KyService } from '#shared/api'

export abstract class AbstractUserApi extends KyService {
  abstract getMe(): Promise<UserTypes.One>
  abstract getAll(): Promise<UserTypes.ResponseType>
}

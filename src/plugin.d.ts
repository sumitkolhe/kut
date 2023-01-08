/* eslint-disable @typescript-eslint/no-unused-vars */
import 'pinia'
import type { AuthService } from 'services/auth.service'
import type { QueryService } from 'services/query.service'
import type { MutationService } from 'services/mutation.service'
import type { LinkService } from 'services/link.service'
import type { StatisticsService } from 'services/statistics.service'

declare module 'pinia' {
  export interface PiniaCustomProperties<Id, S, G, A> {
    $http: { auth: AuthService; link: LinkService; statistics: StatisticsService }
  }
}

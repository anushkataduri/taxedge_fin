import type { ApplicationStatus, Timestamped } from '@shared/types'

/** Replace with the real Income tax model once the API contract is agreed. */
export interface ItrItem extends Timestamped {
  id: string
  reference: string
  title: string
  status: ApplicationStatus
  amount?: number
}

export interface ItrFilters {
  status?: ApplicationStatus
  search?: string
}

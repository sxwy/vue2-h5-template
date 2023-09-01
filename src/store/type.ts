import { Session, User } from '@/types'

export interface UserState {
  session: Session | null
  current: User | null
}

export interface StoreState {
  user: UserState
}

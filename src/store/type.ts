import type { IloginState } from './login/type'
import type { ISystemState } from './main/system/type'
import type { IAnalysisState } from './main/analysis/type'
import type { IStoryType } from './main/story/type'
export interface IRootState {
  name: string
  age: number
  entireDepartment: []
  entireRole: []
  entirMenu: []
}

export interface IRootWithModule {
  login: IloginState
  system: ISystemState
  analysis: IAnalysisState
  stroy: IStoreType
}
export type IStoreType = IRootState & IRootWithModule

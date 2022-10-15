import chRequest from '../index'
import { IAccount, IloginResult, IDataType } from './type'
enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/'
}
export function accountLoginRequest(account: IAccount) {
  return chRequest.post<IDataType<IloginResult>>({
    //<IDataType<IloginResult>>为请求数据的格式
    url: LoginAPI.AccountLogin,
    data: account
  })
}
export function requestUserInfoById(id: number) {
  return chRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}
export function requestUserMenusByRoleId(id: number) {
  return chRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}

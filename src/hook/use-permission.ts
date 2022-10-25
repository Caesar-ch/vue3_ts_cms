import { useStore } from '@/store/index'

export function usePermission(pageName: string, handleBtnName: string) {
  const store = useStore()
  const permissions = store.state.login.permission

  const verifyPermission = `system:${pageName}:${handleBtnName}`

  return !!permissions.find((item) => item === verifyPermission)
}

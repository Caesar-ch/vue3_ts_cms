import { RouteRecordRaw } from 'vue-router'
import { IBreadcrumb } from '@/base-ui/breadcrumb/type'
export let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1.先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = require.context('../router/main', true, /\.ts/)
  // console.log(routeFiles.keys()) //拿到这个文件的路径数组，后面可以通过拼接路径，然后请求里面的资源

  routeFiles.keys().forEach((key) => {
    // console.log(key.split('.'))//0: "" , 1: "/analysis/overview/overview" , 2: "ts"
    const route = require('../router/main' + key.split('.')[1]) //拿到这个文件的所有的资源，存在default里
    // console.log(route)//default: {path: '/main/analysis/dashboard', name: 'dashboard', children: Array(0), component: ƒ}
    allRoutes.push(route.default)
  })

  // 2.根据菜单获取需要添加的routes
  // userMenus:
  // type === 1 -> children -> type === 1
  // type === 2 -> url -> route
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        //type = 1 的不是路由，只是用来点击能展开有路由的链接，type=2的是路由
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
        if (!firstMenu) {
          firstMenu = menu //这个用来保存第一个menu用于，重定向时用
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}
export function pathMApBreadcrumbs(userMenus: any[], currentPath: string): any {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children, currentPath)
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name })
        console.log(breadcrumbs)

        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}
export function mapMenuToPermissions(userMenus: any[]) {
  const permission: string[] = []
  const _recurseGetPermission = (menus: any[]) => {
    for (const item of menus) {
      if (item.type === 1 || item.type === 2) {
        _recurseGetPermission(item.children ?? [])
      } else if (item.type === 3) {
        permission.push(item.permission)
      }
    }
  }
  _recurseGetPermission(userMenus)
  return permission
}
export function mapMenuToLeaf(menuList: number[]) {
  const leafKeys: any[] = []
  const _recurseGetLeafKeys = (List: any) => {
    for (const item of List) {
      if (item.children) {
        _recurseGetLeafKeys(item.children)
      } else {
        leafKeys.push(item.id)
      }
    }
  }
  _recurseGetLeafKeys(menuList)
  return leafKeys
}

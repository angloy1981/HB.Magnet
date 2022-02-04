import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import { RouteConfig } from 'vue-router'
import { asyncRoutes, constantRoutes } from '@/router'
import store from '@/store'
import { getRoutes } from '@/api/route'
import { registerLayout } from 'echarts'
/* Layout */
import Layout from '@/layout/index.vue'

//动态路由
/**
 * @description 将后端菜单树转换为路由树 递归树
 * @param {Array} menus
 * @returns {Array}
 */
 export const backendMenusToRouters = (menus:Array<any>) => {
  let routers:RouteConfig[] = []
  menus.forEach((menu:any) => {
    // 将后端数据转换成路由数据
    let route = backendMenuToRoute(menu)
    // 如果后端数据有下级，则递归处理下级
    if (menu.children && menu.children.length !== 0 && menu.name != "") {
      route.children = backendMenusToRouters(menu.children)
    }
    routers.push(route)
  })
  // console.log(routers)
  return routers
}

/**
 * @description 将后端菜单转换为路由 处理树
 * @param {Object} menu
 * @returns {Object}
 */
 const backendMenuToRoute = (menu:any) => {
  // 具体内容根据自己的数据结构来定，这里需要注意的一点是
  // 原先routers写法是component: () => import('@/view/error-page/404.vue')
  // 经过json数据转换，这里会丢失，所以需要按照上面提过的做转换，下面只写了核心点，其他自行处理
  let route:any = {} //Object.assign({}, menu)
  route.path = `/${menu.name}`
  route.component = Layout
  // route.component = () => import(`/* webpackChunkName: ${menu.title} */'@/${menu.component}'`)\
 
  // 菜单配置的时候都是矢量图标库里面的图标所以要加上iconfont,ivew-admin里面都是默认的font-family：'Ionicons'=>转成 font-family:'iconfont'
  if(menu.meta){
    route.meta = {}
    route.meta.icon = `iconfont ${menu.meta.icon}`
    route.meta.title = menu.meta.title
    route.meta.roles = menu.meta.roles
    route.meta.translate = false
  } //矢量图标转划

  // if(menu.component == "components/main"){
  //   route.component = Main;  //一级菜单判断
  // }
  // else if(menu.component == "components/parentView"){
  //   route.component = parentView; //二级菜单判断
  // }
  // else{
  //   route.component  = () =>  import(`@/${menu.component}`);
  // }

  // route.component  = () =>  import(`@/${menu.component}`);
  
  return route
}

const hasPermission = (roles: string[], route: RouteConfig) => {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

export const filterAsyncRoutes = (routes: RouteConfig[], roles: string[]) => {
  const res: RouteConfig[] = []
  routes.forEach(route => {
    const r = { ...route }
    if (hasPermission(roles, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, roles)
      }
      res.push(r)
    }
  })
  return res
}

export interface IPermissionState {
  routes: RouteConfig[]
  dynamicRoutes: RouteConfig[]
}

@Module({ dynamic: true, store, name: 'permission' })
class Permission extends VuexModule implements IPermissionState {
  public routes: RouteConfig[] = []
  public dynamicRoutes: RouteConfig[] = []
  public customRoute: RouteConfig[] = []

  @Mutation
  private SET_ROUTES(routes: RouteConfig[]) {
    this.routes = constantRoutes.concat(routes)
    this.dynamicRoutes = routes
  }

  @Action({ rawError: true })
  public async GenerateRoutes(roles: string[]) {
    let accessedRoutes
    if (roles.includes('admin')) {
      accessedRoutes = asyncRoutes
    } else {
      accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
    }
    //生成customRoute
    let menus:any
    // getRoutes(0).then(res=>
    // {
    //   menus=res.data
    // })
    menus = await actiontest()
    let customRoute = backendMenusToRouters(menus)
    let filterRoutes = filterAsyncRoutes(customRoute, roles)
    // accessedRoutes.concat(filterRoutes)
    filterRoutes.forEach(m=>{
      accessedRoutes.push(m)
    })
    // accessedRoutes.push(filterRoutes)
    // accessedRoutes = filterAsyncRoutes(customRoute, roles)

    this.SET_ROUTES(accessedRoutes)
  }
}
const actiontest = async ()=>{
  let menus:any
  await getRoutes(0).then(res=>
    {
      menus=res.data
    })

  return menus
} 

export const PermissionModule = getModule(Permission)

import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { getToken, setToken, removeToken, getTenantId } from '@/utils/cookies'
import router, { resetRouter } from '@/router'
import { PermissionModule } from './permission'
import { TagsViewModule } from './tags-view'
import store from '@/store'

export interface ITenantState {
    id:number;
    tenancyName:string;
    name:string;
    adminEmailAddress:string;
    isActive:boolean;
    connectionString:string;   
  }
  @Module({
    dynamic:true,
    store,
    name:'tenant'
  })
  class Tenant extends VuexModule implements ITenantState {
    public id = Number(getTenantId()) || 0
    public tenancyName = ''
    public name = ''
    public adminEmailAddress = ''
    public isActive = false
    public connectionString = ''
    public Tenant()
    {

    }
  }

  export const TenantModule = getModule(Tenant)
import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { getTenantId } from '@/utils/cookies'
import store from '@/store'
import { getRootCatalog, getCatalogs, createCatalogs } from '@/api/catalog'
import variables from '@/styles/_variables.scss'

export interface ICatalogState {
    id: string
    name: string
    type: Number
    sort: Number
  }

export interface CatalogTreeData{
    _id: string
    name: string
    parent: string
    sort: number
    type: number
    children: CatalogTreeData[]
}

@Module({ dynamic: true, store, name: 'catalog' })
class Catalog extends VuexModule implements ICatalogState {
  public id = ''
  public name = ''
  public type = 0
  public sort = 0
  public count = 0

  // private catalogResult:any={
  //   Id: '',
  //   Name: '',
  //   Type: 0,
  //   Sort: 0
  // }

  @Mutation
  public SET_ID(id: string) {
    this.id = id
  }

  @Mutation
  public SET_NAME(name: string) {
    this.name = name
  }

  @Mutation
  public SET_TYPE(type: number) {
    this.type = type
  }

  @Mutation
  public SET_SORT(sort: number) {
    this.sort = sort
  }

  @Mutation
  public SET_COUNT(count: number) {
    this.count = count
  }

  @Action({ rawError: true })
  public async InitialCatalog():Promise<CatalogTreeData[]> {
    this.SET_COUNT( this.count + 1)
    console.log(this.count)
    const { data } = await getRootCatalog()
    const catalogs: CatalogTreeData[] = []
    data.result.items.forEach((res: { id: any; name: any; sort: any; catalogType: any }) => {
      const catalogres:CatalogTreeData = {
        _id: res.id,
        name: res.name,
        parent: this.id,
        sort: res.sort,
        type: res.catalogType,
        children: []
      }
      catalogs.push(catalogres)
    });

    return catalogs
  }

  public async GetCatalogs():Promise<CatalogTreeData[]> {
    const { data } = await getCatalogs(this.id, Number(getTenantId()))
    const catalogs: CatalogTreeData[] = []
    
    data.result.items.forEach((catalogResult: { Id: any; Name: any; Sort: any; catalogType: any }) => {
      const catalog:CatalogTreeData = {
        _id: catalogResult.Id,
        name: catalogResult.Name,
        parent: this.id,
        sort: catalogResult.Sort,
        type: catalogResult.catalogType,
        children: []
      }
      catalogs.fill(catalog)
    });
    return catalogs
  }

  @Action({ rawError: true })
  public async createCatalog(confirmData: ICatalogState):Promise<CatalogTreeData> {
    const requestData = {
      Name: confirmData.name,
      CatalogType: confirmData.type,
      Sort: confirmData.sort
    }
    console.log("createCatalogs:", confirmData)
    const { data } = await createCatalogs(requestData, this.id)
    const catalog:CatalogTreeData = {
      _id: data.result.Id,
      name: data.result.Name,
      parent: this.id,
      sort: data.result.Sort,
      type: data.result.catalogType,
      children: []
    }
    
    this.id = catalog._id
    this.name = catalog.name
    this.type = catalog.type
    this.sort = catalog.sort
    return catalog
  }
}

export const CatalogModule = getModule(Catalog)

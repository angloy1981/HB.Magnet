import request from '@/utils/request'

export const getRootCatalog = () =>
  request(
    {
      url: '/services/app/Catalog/GetRootCatalog',
      method: 'get'
    }
  ).then(res => {
    return { code: '20000', data: res }
  })

export const getCatalogs = (ParentId: string, TenantId: Number) =>
  request(
    {
      url: `/services/app/Catalog/GetAll?ParentId=${ParentId}&TenantId=${TenantId}`,
      method: 'get'
    }
  ).then(res => {
    return { code: '20000', data: res }
  })

  export const createCatalogs = (data: any, ParentId: string) =>
    request(
      {
        url: `/services/app/Catalog/CreateCatalog?parentId=${ParentId}`,
        method: 'post',
        data
      }
    ).then(res => {
      return { code: '20000', data: res }
    })

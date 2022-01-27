using Abp.Application.Features;
using Abp.Domain.Repositories;
using Abp.MultiTenancy;
using HB.Magnet.Authorization.Users;
using HB.Magnet.Editions;

namespace HB.Magnet.MultiTenancy
{
    public class TenantManager : AbpTenantManager<Tenant, User>
    {
        public TenantManager(
            IRepository<Tenant> tenantRepository, 
            IRepository<TenantFeatureSetting, long> tenantFeatureRepository, 
            EditionManager editionManager,
            IAbpZeroFeatureValueStore featureValueStore) 
            : base(
                tenantRepository, 
                tenantFeatureRepository, 
                editionManager,
                featureValueStore)
        {
        }
    }
}

using Abp.Application.Services;
using HB.Magnet.MultiTenancy.Dto;

namespace HB.Magnet.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}


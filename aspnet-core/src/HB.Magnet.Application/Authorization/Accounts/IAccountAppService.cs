using System.Threading.Tasks;
using Abp.Application.Services;
using HB.Magnet.Authorization.Accounts.Dto;

namespace HB.Magnet.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}

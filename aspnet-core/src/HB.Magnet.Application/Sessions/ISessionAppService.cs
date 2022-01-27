using System.Threading.Tasks;
using Abp.Application.Services;
using HB.Magnet.Sessions.Dto;

namespace HB.Magnet.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}

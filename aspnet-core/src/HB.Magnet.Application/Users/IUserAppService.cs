using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using HB.Magnet.Roles.Dto;
using HB.Magnet.Users.Dto;

namespace HB.Magnet.Users
{
    public interface IUserAppService : IAsyncCrudAppService<UserDto, long, PagedUserResultRequestDto, CreateUserDto, UserDto>
    {
        Task<ListResultDto<RoleDto>> GetRoles();

        Task ChangeLanguage(ChangeUserLanguageDto input);

        Task<bool> ChangePassword(ChangePasswordDto input);
    }
}

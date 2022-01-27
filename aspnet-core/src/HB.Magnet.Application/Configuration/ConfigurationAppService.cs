using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using HB.Magnet.Configuration.Dto;

namespace HB.Magnet.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : MagnetAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}

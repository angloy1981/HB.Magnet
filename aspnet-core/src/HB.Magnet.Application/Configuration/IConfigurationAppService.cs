using System.Threading.Tasks;
using HB.Magnet.Configuration.Dto;

namespace HB.Magnet.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}

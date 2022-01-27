using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace HB.Magnet.Controllers
{
    public abstract class MagnetControllerBase: AbpController
    {
        protected MagnetControllerBase()
        {
            LocalizationSourceName = MagnetConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}

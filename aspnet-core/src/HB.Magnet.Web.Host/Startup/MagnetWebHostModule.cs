using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using HB.Magnet.Configuration;

namespace HB.Magnet.Web.Host.Startup
{
    [DependsOn(
       typeof(MagnetWebCoreModule))]
    public class MagnetWebHostModule: AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public MagnetWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(MagnetWebHostModule).GetAssembly());
        }
    }
}

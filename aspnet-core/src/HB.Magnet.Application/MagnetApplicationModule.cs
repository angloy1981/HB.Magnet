using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using HB.Magnet.Authorization;

namespace HB.Magnet
{
    [DependsOn(
        typeof(MagnetCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class MagnetApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<MagnetAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(MagnetApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}

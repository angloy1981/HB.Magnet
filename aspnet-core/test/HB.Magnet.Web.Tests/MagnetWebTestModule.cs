using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using HB.Magnet.EntityFrameworkCore;
using HB.Magnet.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace HB.Magnet.Web.Tests
{
    [DependsOn(
        typeof(MagnetWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class MagnetWebTestModule : AbpModule
    {
        public MagnetWebTestModule(MagnetEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(MagnetWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(MagnetWebMvcModule).Assembly);
        }
    }
}
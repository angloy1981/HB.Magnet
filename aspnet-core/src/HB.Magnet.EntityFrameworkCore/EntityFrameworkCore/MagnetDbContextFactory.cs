using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using HB.Magnet.Configuration;
using HB.Magnet.Web;

namespace HB.Magnet.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class MagnetDbContextFactory : IDesignTimeDbContextFactory<MagnetDbContext>
    {
        public MagnetDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<MagnetDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            MagnetDbContextConfigurer.Configure(builder, configuration.GetConnectionString(MagnetConsts.ConnectionStringName));

            return new MagnetDbContext(builder.Options);
        }
    }
}

using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace HB.Magnet.EntityFrameworkCore
{
    public static class MagnetDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<MagnetDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<MagnetDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}

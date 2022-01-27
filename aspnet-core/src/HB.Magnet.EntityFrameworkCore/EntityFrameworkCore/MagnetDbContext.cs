using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using HB.Magnet.Authorization.Roles;
using HB.Magnet.Authorization.Users;
using HB.Magnet.MultiTenancy;

namespace HB.Magnet.EntityFrameworkCore
{
    public class MagnetDbContext : AbpZeroDbContext<Tenant, Role, User, MagnetDbContext>
    {
        /* Define a DbSet for each entity of the application */
        
        public MagnetDbContext(DbContextOptions<MagnetDbContext> options)
            : base(options)
        {
        }
    }
}

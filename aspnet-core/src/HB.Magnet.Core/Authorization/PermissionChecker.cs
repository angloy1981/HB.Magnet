using Abp.Authorization;
using HB.Magnet.Authorization.Roles;
using HB.Magnet.Authorization.Users;

namespace HB.Magnet.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}

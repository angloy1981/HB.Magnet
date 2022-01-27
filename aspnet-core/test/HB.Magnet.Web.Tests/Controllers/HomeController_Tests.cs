using System.Threading.Tasks;
using HB.Magnet.Models.TokenAuth;
using HB.Magnet.Web.Controllers;
using Shouldly;
using Xunit;

namespace HB.Magnet.Web.Tests.Controllers
{
    public class HomeController_Tests: MagnetWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}
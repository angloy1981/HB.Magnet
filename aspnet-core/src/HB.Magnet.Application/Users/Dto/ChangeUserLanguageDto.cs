using System.ComponentModel.DataAnnotations;

namespace HB.Magnet.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}
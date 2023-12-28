using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class ChangePasswordRequest
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string OldPassWord { get; set; }
        [Required]
        public string NewPassword { get; set; }
    }
}

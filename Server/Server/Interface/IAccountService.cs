using Server.Models;
using BCrypt.Net;
namespace Server.Interface
{
    public interface IAccountService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);
        IEnumerable<Account> GetAll();
        Account GetById(int id);

        void ChangePassword(ChangePasswordRequest model);
        
        //bool CreateAccount (Account account);

    }
}
 
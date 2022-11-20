using Server.Data;
using Server.Models;
using BCryptNet = BCrypt.Net.BCrypt;
namespace Server
{
    public class Seed
    {
        private readonly DataContext dataContext;
        public Seed(DataContext context)
        {
            this.dataContext = context;
        }
        public void SeedDataContext() {
            if (!dataContext.Accounts.Any()) {
                var Account = new List<Account>
                {
                    new Account(){ 
                        UserName ="ManagerTest",
                        PasswordHash =BCryptNet.HashPassword("manager"),
                        Role= Role.Manager    
                    },
                    new Account(){
                        UserName ="AdminTest",
                        PasswordHash =BCryptNet.HashPassword("admin"),
                        Role= Role.Admin
                    },
                    new Account(){
                        UserName ="Student",
                        PasswordHash =BCryptNet.HashPassword("student"),
                        Role= Role.Student
                    }
                };
                dataContext.Accounts.AddRange(Account);
                dataContext.SaveChanges();
            }
        }
    }
}

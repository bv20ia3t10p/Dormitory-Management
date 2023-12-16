using Server.Data;
using Server.Models;
using System.Runtime.ExceptionServices;
using static System.Reflection.Metadata.BlobBuilder;
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
        public void SeedDataContext()
        {
            if (!dataContext.Accounts.Any())
            {
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

            if (!dataContext.Rooms.Any())
            {

                var RoomType1 = new RoomType()
                {
                    NumberOfSLot = 4,
                    Furniture = true,
                    DomitoryFee = 180000
                };
                var RoomType2 = new RoomType()
                {
                    NumberOfSLot = 4,
                    Furniture = false,
                    DomitoryFee = 140000
                };
                var RoomType3 = new RoomType()
                {
                    NumberOfSLot = 6,
                    Furniture = true,
                    DomitoryFee = 100000
                };
                var RoomType4 = new RoomType()
                {
                    NumberOfSLot = 6,
                    Furniture = false,
                    DomitoryFee = 80000
                };
                var Blocks = new List<Block>
                    {
                        new Block(){
                            Name = "A1",
                            Room = new List<Room>(){
                                new Room() {
                                    Name = "A1-001",
                                    SlotRemain=4,
                                    Status = true,
                                    RoomType = RoomType1

                                },
                                 new Room() {
                                    Name = "A1-002",
                                    SlotRemain=4,
                                    Status = true,
                                    RoomType = RoomType2
                                 },
                                 new Room() {
                                    Name = "A1-003",
                                    SlotRemain=6,
                                    Status = true,
                                    RoomType = RoomType3
                                 },
                                  new Room() {
                                    Name = "A1-003",
                                    SlotRemain=6,
                                    Status = true,
                                    RoomType = RoomType4
                                 }
                            }
                        },
                        new Block(){
                            Name = "A2",
                            Room = new List<Room>(){
                                new Room() {
                                    Name = "A2-001",
                                    SlotRemain=4,
                                    Status = true,
                                    RoomType = RoomType1

                                },
                                 new Room() {
                                    Name = "A2-002",
                                    SlotRemain=4,
                                    Status = true,
                                    RoomType = RoomType2
                                 },
                                 new Room() {
                                    Name = "A2-003",
                                    SlotRemain=6,
                                    Status = true,
                                    RoomType = RoomType3
                                 },
                                  new Room() {
                                    Name = "A2-004",
                                    SlotRemain=6,
                                    Status = true,
                                    RoomType = RoomType4
                                 }
                            }
                        }


                };

                dataContext.Blocks.AddRange(Blocks);
                dataContext.SaveChanges();
            }

            if (!dataContext.Universities.Any())
            {
                var university = new List<University> {
                    new University() {
                       Name = "Trường Đại Học Công Nghệ Thông Tin"
                    },
                    new University() {
                       Name = "Trường Đại Học Bách Khoa"
                    },
                    new University() {
                       Name = "Trường Đại Học Khoa Học Tự Nhiên"
                    },
                    new University() {
                       Name = "Trường Đại Học Kinh Tế Luật"
                    }
                };
                dataContext.Universities.AddRange(university);
                dataContext.SaveChanges();
            }

            if (!dataContext.Students.Any())
            {
                var students = new List<Student>
                {
                    new Student() {
                        LastName ="Tuan",
                        FirstName="Trung",
                        BirthDate = new DateTime(2002,02,02),
                        Gender = true,
                        Ethnic = "Kinh",
                        Nationnality = "Việt Nam",
                        PhoneNumber = "02322222",
                        HomeAddress = "Xuân Lộc, Đồng Nai",
                        MainAddress = "KTXA, Linh Trung, Thủ Đức",
                        Email = "tuan@gmail.com",
                        Avartar = Convert.FromBase64String("test"),
                        IdentifyCardNumber = "00020202020",
                        UniversitysutdentId ="20522068",
                        Faculty = "Information system",
                        Major = "Information system",
                        SchoolYear = "2020-2024",
                        RelatedPersonName = "Ba",
                        RelatedPersonPhoneNumber = "12344",
                        status = true,
                        University = dataContext.Universities.Where(u=>u.Id==1).FirstOrDefault(),
                        account = new Account{
                            UserName ="tuan@gmail.com",
                            PasswordHash =BCryptNet.HashPassword("123456"),
                            Role= Role.Student
                        }
                    },
                     new Student() {
                        LastName ="Dang",
                        FirstName="Ngia",
                        BirthDate = new DateTime(2002,02,02),
                        Gender = true,
                        Ethnic = "Kinh",
                        Nationnality = "Việt Nam",
                        PhoneNumber = "02322222",
                        HomeAddress = "Xuân Lộc, Đồng Nai",
                        MainAddress = "KTXA, Linh Trung, Thủ Đức",
                        Email = "dangnghia@gmail.com",
                        Avartar = Convert.FromBase64String("test"),
                        IdentifyCardNumber = "00020202020",
                        UniversitysutdentId ="20522068",
                        Faculty = "Information system",
                        Major = "Information system",
                        SchoolYear = "2020-2024",
                        RelatedPersonName = "Ba",
                        RelatedPersonPhoneNumber = "12344",
                        status = true,
                        University = dataContext.Universities.Where(u=>u.Id==1).FirstOrDefault(),
                        account = new Account{
                            UserName ="dangnghia@gmail.com",
                            PasswordHash =BCryptNet.HashPassword("123456"),
                            Role= Role.Student
                        }
                    },
                      new Student() {
                        LastName ="Bao",
                        FirstName="An",
                        BirthDate = new DateTime(2002,02,02),
                        Gender = true,
                        Ethnic = "Kinh",
                        Nationnality = "Việt Nam",
                        PhoneNumber = "02322222",
                        HomeAddress = "Xuân Lộc, Đồng Nai",
                        MainAddress = "KTXA, Linh Trung, Thủ Đức",
                        Email = "baoan@gmail.com",
                        Avartar = Convert.FromBase64String("test"),
                        IdentifyCardNumber = "00020202020",
                        UniversitysutdentId ="20522068",
                        Faculty = "Information system",
                        Major = "Information system",
                        SchoolYear = "2020-2024",
                        RelatedPersonName = "Ba",
                        RelatedPersonPhoneNumber = "12344",
                        status = true,
                        University = dataContext.Universities.Where(u=>u.Id==2).FirstOrDefault(),
                        account = new Account{
                            UserName ="baoan@gmail.com",
                            PasswordHash =BCryptNet.HashPassword("123456"),
                            Role= Role.Student
                        }

                    },
                       new Student() {
                        LastName ="Thao",
                        FirstName="Trang",
                        BirthDate = new DateTime(2002,02,02),
                        Gender = true,
                        Ethnic = "Kinh",
                        Nationnality = "Việt Nam",
                        PhoneNumber = "02322222",
                        HomeAddress = "Xuân Lộc, Đồng Nai",
                        MainAddress = "KTXA, Linh Trung, Thủ Đức",
                        Email = "thaotrang@gmail.com",
                        Avartar = Convert.FromBase64String("test"),
                        IdentifyCardNumber = "00020202020",
                        UniversitysutdentId ="20522068",
                        Faculty = "Information system",
                        Major = "Information system",
                        SchoolYear = "2020-2024",
                        RelatedPersonName = "Ba",
                        RelatedPersonPhoneNumber = "12344",
                        status = true,
                        University = dataContext.Universities.Where(u=>u.Id==3).FirstOrDefault(),
                        account = new Account{
                            UserName ="thaotrang@gmail.com",
                            PasswordHash =BCryptNet.HashPassword("123456"),
                            Role= Role.Student
                        }
                       }
                };
                dataContext.Students.AddRange(students);
                dataContext.SaveChanges();
            }

            if (!dataContext.Managers.Any())
            {
                var managers = new List<Manager>
                {
                    new Manager
                    {
                        LastName = "Nhật",
                        FirstName = "Lê",
                        DateOfBirth = new DateTime(2002, 1, 26),
                        Email = "quangnhatle2601@gmail.com",
                        IdentiFyCardNumber = "079202009444",
                        PhoneNumber = "0367844882",
                        Address = "141 Tám Danh, phường 4, quận 8, Tp Hồ Chí Minh",
                        Gender = true,
                        IdCard = 20521705,
                        Status = true,
                        Account = new Account()
                        {
                            UserName = "quangnhatle2601@gmail.com",
                            PasswordHash = BCryptNet.HashPassword("20521705"),
                            Role = Role.Manager,
                        },
                    },
                    new Manager
                    {
                        LastName = "Smith",
                        FirstName = "John",
                        DateOfBirth = new DateTime(1990, 5, 15),
                        Email = "john.smith@example.com",
                        IdentiFyCardNumber = "123456789",
                        PhoneNumber = "1234567890",
                        Address = "123 Main St, City, Country",
                        Gender = false,
                        IdCard = 98765432,
                        Status = true,
                        Account = new Account()
                        {
                            UserName = "john.smith@example.com",
                            PasswordHash = BCryptNet.HashPassword("98765432"),
                            Role = Role.Manager,
                        },
                    },
                    new Manager
                    {
                        LastName = "Nguyen",
                        FirstName = "Van",
                        DateOfBirth = new DateTime(1995, 8, 10),
                        Email = "van.nguyen@example.com",
                        IdentiFyCardNumber = "0987654321",
                        PhoneNumber = "0987654321",
                        Address = "456 Tran Phu, phường 7, quận 3, Tp Hồ Chí Minh",
                        Gender = true,
                        IdCard = 12345678,
                        Status = true,
                        Account = new Account()
                        {
                            UserName = "van.nguyen@example.com",
                            PasswordHash = BCryptNet.HashPassword("12345678"),
                            Role = Role.Manager,
                        },
                    },
                    new Manager
                    {
                        LastName = "Tran",
                        FirstName = "Thi",
                        DateOfBirth = new DateTime(1988, 4, 5),
                        Email = "thi.tran@example.com",
                        IdentiFyCardNumber = "1122334455",
                        PhoneNumber = "1122334455",
                        Address = "789 Le Loi, phường 10, quận 5, Tp Hồ Chí Minh",
                        Gender = false,
                        IdCard = 87654321,
                        Status = true,
                        Account = new Account()
                        {
                            UserName = "thi.tran@example.com",
                            PasswordHash = BCryptNet.HashPassword("87654321"),
                            Role = Role.Manager,
                        },
                    },
                    new Manager
                    {
                        LastName = "Pham",
                        FirstName = "Huu",
                        DateOfBirth = new DateTime(1993, 12, 20),
                        Email = "huu.pham@example.com",
                        IdentiFyCardNumber = "9876543210",
                        PhoneNumber = "9876543210",
                        Address = "321 Nguyen Hue, phường 2, quận 1, Tp Hồ Chí Minh",
                        Gender = true,
                        IdCard = 54321678,
                        Status = true,
                        Account = new Account()
                        {
                            UserName = "huu.pham@example.com",
                            PasswordHash = BCryptNet.HashPassword("54321678"),
                            Role = Role.Manager,
                        },
                    },
                    new Manager
                    {
                        LastName = "Le",
                        FirstName = "Thao",
                        DateOfBirth = new DateTime(1997, 6, 15),
                        Email = "thao.le@example.com",
                        IdentiFyCardNumber = "555566667777",
                        PhoneNumber = "555566667777",
                        Address = "999 Phan Xich Long, phường 6, quận Phu Nhuan, Tp Hồ Chí Minh",
                        Gender = false,
                        IdCard = 13579246,
                        Status = true,
                        Account = new Account()
                        {
                            UserName = "thao.le@example.com",
                            PasswordHash = BCryptNet.HashPassword("13579246"),
                            Role = Role.Manager,
                        },
                    },
                    new Manager
                    {
                        LastName = "Hoang",
                        FirstName = "Minh",
                        DateOfBirth = new DateTime(1990, 9, 30),
                        Email = "minh.hoang@example.com",
                        IdentiFyCardNumber = "333344445555",
                        PhoneNumber = "333344445555",
                        Address = "222 Vo Van Tan, phường 3, quận 3, Tp Hồ Chí Minh",
                        Gender = true,
                        IdCard = 98761234,
                        Status = true,
                        Account = new Account()
                        {
                            UserName = "minh.hoang@example.com",
                            PasswordHash = BCryptNet.HashPassword("98761234"),
                            Role = Role.Manager,
                        },
                    }
                };
                dataContext.Managers.AddRange(managers);
                dataContext.SaveChanges();
            }
        }
    }
}

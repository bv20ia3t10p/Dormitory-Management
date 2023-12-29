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
                        Status = true,
                        University = dataContext.Universities.Where(u=>u.Id==1).FirstOrDefault(),
                        Account = new Account{
                            UserName ="tuan@gmail.com",
                            PasswordHash =BCryptNet.HashPassword("123456"),
                            Role= Role.Student
                        }
                    },    
                    new Student() {
                        LastName ="Phuc",
                        FirstName="Pham",
                        BirthDate = new DateTime(2002,08,09),
                        Gender = true,
                        Ethnic = "Kinh",
                        Nationnality = "Việt Nam",
                        PhoneNumber = "023456890",
                        HomeAddress = "Thủ Đức, Hồ Chí Minh",
                        MainAddress = "Thủ Đức, Hồ Chí Minh",
                        Email = "phucsv@gmail.com",
                        Avartar = Convert.FromBase64String("test"),
                        IdentifyCardNumber = "000234568",
                        UniversitysutdentId ="20521771",
                        Faculty = "Information system",
                        Major = "Information system",
                        SchoolYear = "2020-2024",
                        RelatedPersonName = "Ba",
                        RelatedPersonPhoneNumber = "1234567",
                        Status = true,
                        University = dataContext.Universities.Where(u=>u.Id==1).FirstOrDefault(),
                        Account = new Account{
                            UserName ="phucsv@gmail.com",
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
                        Status = true,
                        University = dataContext.Universities.Where(u=>u.Id==1).FirstOrDefault(),
                        Account = new Account{
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
                        Status = true,
                        University = dataContext.Universities.Where(u=>u.Id==2).FirstOrDefault(),
                        Account = new Account{
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
                        Status = true,
                        University = dataContext.Universities.Where(u=>u.Id==3).FirstOrDefault(),
                        Account = new Account{
                            UserName ="thaotrang@gmail.com",
                            PasswordHash =BCryptNet.HashPassword("123456"),
                            Role= Role.Student
                        }
                       },
                       new Student()
                        {
                            LastName = "Huong",
                            FirstName = "Mai",
                            BirthDate = new DateTime(2001, 5, 15),
                            Gender = false,
                            Ethnic = "Kinh",
                            Nationnality = "Việt Nam",
                            PhoneNumber = "0123456789",
                            HomeAddress = "Ninh Kieu, Can Tho",
                            MainAddress = "KTXB, Linh Trung, Thủ Đức",
                            Email = "huongmai@gmail.com",
                            Avartar = Convert.FromBase64String("test"),
                            IdentifyCardNumber = "1122334455",
                            UniversitysutdentId = "20522069",
                            Faculty = "Computer Science",
                            Major = "Software Engineering",
                            SchoolYear = "2020-2024",
                            RelatedPersonName = "Mother",
                            RelatedPersonPhoneNumber = "98765",
                            Status = true,
                            University = dataContext.Universities.Where(u => u.Id == 1).FirstOrDefault(),
                            Account = new Account
                            {
                                UserName = "huongmai@gmail.com",
                                PasswordHash = BCryptNet.HashPassword("password123"),
                                Role = Role.Student
                            }
                        },
                        new Student()
                        {
                            LastName = "Duc",
                            FirstName = "Truong",
                            BirthDate = new DateTime(2000, 8, 20),
                            Gender = true,
                            Ethnic = "Kinh",
                            Nationnality = "Việt Nam",
                            PhoneNumber = "0987654321",
                            HomeAddress = "Quang Nam, Vietnam",
                            MainAddress = "KTXC, Linh Trung, Thủ Đức",
                            Email = "ductruong@gmail.com",
                            Avartar = Convert.FromBase64String("test"),
                            IdentifyCardNumber = "555566667777",
                            UniversitysutdentId = "20522070",
                            Faculty = "Mathematics",
                            Major = "Applied Mathematics",
                            SchoolYear = "2020-2024",
                            RelatedPersonName = "Father",
                            RelatedPersonPhoneNumber = "87654",
                            Status = true,
                            University = dataContext.Universities.Where(u => u.Id == 3).FirstOrDefault(),
                            Account = new Account
                            {
                                UserName = "ductruong@gmail.com",
                                PasswordHash = BCryptNet.HashPassword("password456"),
                                Role = Role.Student
                            }
                        },
                        new Student()
                        {
                            LastName = "Thu",
                            FirstName = "Tran",
                            BirthDate = new DateTime(2001, 3, 10),
                            Gender = false,
                            Ethnic = "Kinh",
                            Nationnality = "Việt Nam",
                            PhoneNumber = "0112233445",
                            HomeAddress = "Ha Noi, Vietnam",
                            MainAddress = "KTXD, Linh Trung, Thủ Đức",
                            Email = "thutran@gmail.com",
                            Avartar = Convert.FromBase64String("test"),
                            IdentifyCardNumber = "9988776655",
                            UniversitysutdentId = "20522071",
                            Faculty = "Chemistry",
                            Major = "Organic Chemistry",
                            SchoolYear = "2020-2024",
                            RelatedPersonName = "Sister",
                            RelatedPersonPhoneNumber = "54321",
                            Status = true,
                            University = dataContext.Universities.Where(u => u.Id == 4).FirstOrDefault(),
                            Account = new Account
                            {
                                UserName = "thutran@gmail.com",
                                PasswordHash = BCryptNet.HashPassword("password789"),
                                Role = Role.Student
                            }
                        },
                        new Student()
                        {
                            LastName = "Minh",
                            FirstName = "Nguyen",
                            BirthDate = new DateTime(2002, 7, 18),
                            Gender = true,
                            Ethnic = "Kinh",
                            Nationnality = "Việt Nam",
                            PhoneNumber = "0369876543",
                            HomeAddress = "Quang Tri, Vietnam",
                            MainAddress = "KTXE, Linh Trung, Thủ Đức",
                            Email = "minhnguyen@gmail.com",
                            Avartar = Convert.FromBase64String("test"),
                            IdentifyCardNumber = "777788889999",
                            UniversitysutdentId = "20522072",
                            Faculty = "Mechanical Engineering",
                            Major = "Thermal Engineering",
                            SchoolYear = "2020-2024",
                            RelatedPersonName = "Brother",
                            RelatedPersonPhoneNumber = "43210",
                            Status = true,
                            University = dataContext.Universities.Where(u => u.Id == 2).FirstOrDefault(),
                            Account = new Account
                            {
                                UserName = "minhnguyen@gmail.com",
                                PasswordHash = BCryptNet.HashPassword("password101"),
                                Role = Role.Student
                            }
                        },
                        new Student()
                        {
                            LastName = "Hoa",
                            FirstName = "Tran",
                            BirthDate = new DateTime(2001, 12, 5),
                            Gender = false,
                            Ethnic = "Kinh",
                            Nationnality = "Việt Nam",
                            PhoneNumber = "0998877665",
                            HomeAddress = "Bac Lieu, Vietnam",
                            MainAddress = "KTXF, Linh Trung, Thủ Đức",
                            Email = "hoatran@gmail.com",
                            Avartar = Convert.FromBase64String("test"),
                            IdentifyCardNumber = "123412341234",
                            UniversitysutdentId = "20522073",
                            Faculty = "Business Administration",
                            Major = "Marketing",
                            SchoolYear = "2020-2024",
                            RelatedPersonName = "Sister",
                            RelatedPersonPhoneNumber = "67890",
                            Status = true,
                            University = dataContext.Universities.Where(u => u.Id == 4).FirstOrDefault(),
                            Account = new Account
                            {
                                UserName = "hoatran@gmail.com",
                                PasswordHash = BCryptNet.HashPassword("password202"),
                                Role = Role.Student
                            }
                        },
                        new Student()
                        {
                            LastName = "Phuc",
                            FirstName = "Tran",
                            BirthDate = new DateTime(2001, 9, 20),
                            Gender = true,
                            Ethnic = "Kinh",
                            Nationnality = "Việt Nam",
                            PhoneNumber = "0888777666",
                            HomeAddress = "Long An, Vietnam",
                            MainAddress = "KTXG, Linh Trung, Thủ Đức",
                            Email = "phuctran@gmail.com",
                            Avartar = Convert.FromBase64String("test"),
                            IdentifyCardNumber = "555566667777",
                            UniversitysutdentId = "20522074",
                            Faculty = "Environmental Science",
                            Major = "Ecology",
                            SchoolYear = "2020-2024",
                            RelatedPersonName = "Uncle",
                            RelatedPersonPhoneNumber = "112233",
                            Status = true,
                            University = dataContext.Universities.Where(u => u.Id == 3).FirstOrDefault(),
                            Account = new Account
                            {
                                UserName = "phuctran@gmail.com",
                                PasswordHash = BCryptNet.HashPassword("password303"),
                                Role = Role.Student
                            }
                        },
                        new Student()
                        {
                            LastName = "Nhung",
                            FirstName = "Le",
                            BirthDate = new DateTime(2002, 3, 15),
                            Gender = false,
                            Ethnic = "Kinh",
                            Nationnality = "Việt Nam",
                            PhoneNumber = "0777666555",
                            HomeAddress = "Quang Ngai, Vietnam",
                            MainAddress = "KTXH, Linh Trung, Thủ Đức",
                            Email = "nhungle@gmail.com",
                            Avartar = Convert.FromBase64String("test"),
                            IdentifyCardNumber = "999988887777",
                            UniversitysutdentId = "20522075",
                            Faculty = "Computer Science",
                            Major = "Software Engineering",
                            SchoolYear = "2020-2024",
                            RelatedPersonName = "Aunt",
                            RelatedPersonPhoneNumber = "554433",
                            Status = true,
                            University = dataContext.Universities.Where(u => u.Id == 1).FirstOrDefault(),
                            Account = new Account
                            {
                                UserName = "nhungle@gmail.com",
                                PasswordHash = BCryptNet.HashPassword("password404"),
                                Role = Role.Student
                            }
                        },
                        new Student()
                        {
                            LastName = "Quyen",
                            FirstName = "Nguyen",
                            BirthDate = new DateTime(2002, 5, 10),
                            Gender = true,
                            Ethnic = "Kinh",
                            Nationnality = "Việt Nam",
                            PhoneNumber = "0666555444",
                            HomeAddress = "Hai Duong, Vietnam",
                            MainAddress = "KTXI, Linh Trung, Thủ Đức",
                            Email = "quyennguyen@gmail.com",
                            Avartar = Convert.FromBase64String("test"),
                            IdentifyCardNumber = "123487654321",
                            UniversitysutdentId = "20522076",
                            Faculty = "Electrical Engineering",
                            Major = "Power Systems",
                            SchoolYear = "2020-2024",
                            RelatedPersonName = "Grandpa",
                            RelatedPersonPhoneNumber = "998877",
                            Status = true,
                            University = dataContext.Universities.Where(u => u.Id == 4).FirstOrDefault(),
                            Account = new Account
                            {
                                UserName = "quyennguyen@gmail.com",
                                PasswordHash = BCryptNet.HashPassword("password505"),
                                Role = Role.Student
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

            // if (!dataContext.RegisterRooms.Any())
            // {
            //     var registerRooms = new List<RegisterRoom>
            //     {
            //         // Room A1-001
            //         new RegisterRoom
            //         {
            //             StudentId = 1,
            //             RoomId = 1,
            //             DateBegin = new DateTime(2023, 1, 1),
            //             DateEnd = new DateTime(2023, 12, 31),
            //             NumberOfMonth = 12,
            //             DomitoryFee = 12000000, // Assuming the fee is 1,000,000 VND per month
            //             DomitoryFeeStatus = true,
            //             Status = true,
            //             Room = dataContext.Rooms.Find(1),
            //             Student = dataContext.Students.Find(1)
            //         },
            //         new RegisterRoom
            //         {
            //             StudentId = 2,
            //             RoomId = 1,
            //             DateBegin = new DateTime(2023, 1, 1),
            //             DateEnd = new DateTime(2023, 12, 31),
            //             NumberOfMonth = 12,
            //             DomitoryFee = 12000000,
            //             DomitoryFeeStatus = true,
            //             Status = true,
            //             Room = dataContext.Rooms.Find(1),
            //             Student = dataContext.Students.Find(2)
            //         },
            //         new RegisterRoom
            //         {
            //             StudentId = 3,
            //             RoomId = 2,
            //             DateBegin = new DateTime(2023, 2, 1),
            //             DateEnd = new DateTime(2023, 11, 30),
            //             NumberOfMonth = 10,
            //             DomitoryFee = 10000000,
            //             DomitoryFeeStatus = true,
            //             Status = true,
            //             Room = dataContext.Rooms.Find(2),
            //             Student = dataContext.Students.Find(3)
            //         },
            //         new RegisterRoom
            //         {
            //             StudentId = 4,
            //             RoomId = 2,
            //             DateBegin = new DateTime(2023, 2, 1),
            //             DateEnd = new DateTime(2023, 11, 30),
            //             NumberOfMonth = 10,
            //             DomitoryFee = 10000000,
            //             DomitoryFeeStatus = true,
            //             Status = true,
            //             Room = dataContext.Rooms.Find(2),
            //             Student = dataContext.Students.Find(4)
            //         },
            //         new RegisterRoom
            //         {
            //             StudentId = 5,
            //             RoomId = 3,
            //             DateBegin = new DateTime(2023, 3, 1),
            //             DateEnd = new DateTime(2023, 10, 31),
            //             NumberOfMonth = 8,
            //             DomitoryFee = 8000000,
            //             DomitoryFeeStatus = true,
            //             Status = true,
            //             Room = dataContext.Rooms.Find(3),
            //             Student = dataContext.Students.Find(5)
            //         },
            //         new RegisterRoom
            //         {
            //             StudentId = 6,
            //             RoomId = 3,
            //             DateBegin = new DateTime(2023, 3, 1),
            //             DateEnd = new DateTime(2023, 10, 31),
            //             NumberOfMonth = 8,
            //             DomitoryFee = 8000000,
            //             DomitoryFeeStatus = true,
            //             Status = true,
            //             Room = dataContext.Rooms.Find(3),
            //             Student = dataContext.Students.Find(6)
            //         },
            //         new RegisterRoom
            //         {
            //             StudentId = 7,
            //             RoomId = 4,
            //             DateBegin = new DateTime(2023, 4, 1),
            //             DateEnd = new DateTime(2023, 9, 30),
            //             NumberOfMonth = 6,
            //             DomitoryFee = 6000000,
            //             DomitoryFeeStatus = true,
            //             Status = true,
            //             Room = dataContext.Rooms.Find(4),
            //             Student = dataContext.Students.Find(7)
            //         },
            //         new RegisterRoom
            //         {
            //             StudentId = 8,
            //             RoomId = 4,
            //             DateBegin = new DateTime(2023, 4, 1),
            //             DateEnd = new DateTime(2023, 9, 30),
            //             NumberOfMonth = 6,
            //             DomitoryFee = 6000000,
            //             DomitoryFeeStatus = true,
            //             Status = true,
            //             Room = dataContext.Rooms.Find(4),
            //             Student = dataContext.Students.Find(8)
            //         },
            //     };
            //     dataContext.RegisterRooms.AddRange(registerRooms);
            //     dataContext.SaveChanges();
            // }

            // if (!dataContext.ElectricWaterlogs.Any())
            // {
            //     var electricWaterlogs = new List<ElectricWaterlog>
            //     {
            //         // Room A1-001
            //         new ElectricWaterlog
            //         {
            //             LogDate = new DateTime(2023, 1, 5),
            //             ElectricNew = 120,
            //             ElectricOld = 100,
            //             WaterOld = 50,
            //             WaterNew = 70,
            //             WaterUse = 20,
            //             ElectricUse = 20,
            //             ElectricFee = 50000,
            //             WaterFee = 30000,
            //             TotalFee = 80000,
            //             FeeStatus = true,
            //             RoomId = 1,
            //             Room = dataContext.Rooms.Find(1)
            //         },
            //         // Room A1-002
            //         new ElectricWaterlog
            //         {
            //             LogDate = new DateTime(2023, 1, 5),
            //             ElectricNew = 110,
            //             ElectricOld = 90,
            //             WaterOld = 40,
            //             WaterNew = 60,
            //             WaterUse = 20,
            //             ElectricUse = 20,
            //             ElectricFee = 45000,
            //             WaterFee = 25000,
            //             TotalFee = 70000,
            //             FeeStatus = true,
            //             RoomId = 2,
            //             Room = dataContext.Rooms.Find(2)
            //         },
            //         // Room A1-003
            //         new ElectricWaterlog
            //         {
            //             LogDate = new DateTime(2023, 1, 5),
            //             ElectricNew = 130,
            //             ElectricOld = 110,
            //             WaterOld = 60,
            //             WaterNew = 80,
            //             WaterUse = 20,
            //             ElectricUse = 20,
            //             ElectricFee = 55000,
            //             WaterFee = 35000,
            //             TotalFee = 90000,
            //             FeeStatus = true,
            //             RoomId = 3,
            //             Room = dataContext.Rooms.Find(3)
            //         },
            //         // Room A1-004
            //         new ElectricWaterlog
            //         {
            //             LogDate = new DateTime(2023, 1, 5),
            //             ElectricNew = 100,
            //             ElectricOld = 80,
            //             WaterOld = 30,
            //             WaterNew = 50,
            //             WaterUse = 20,
            //             ElectricUse = 20,
            //             ElectricFee = 40000,
            //             WaterFee = 20000,
            //             TotalFee = 60000,
            //             FeeStatus = true,
            //             RoomId = 4,
            //             Room = dataContext.Rooms.Find(4)
            //         },
            //         // Add more entries as needed...
            //     };

            //     dataContext.ElectricWaterlogs.AddRange(electricWaterlogs);
            //     dataContext.SaveChanges();
            // }
        }
    }
}

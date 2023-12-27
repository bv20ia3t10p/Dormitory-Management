using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Interface;
using Server.Models;
using System.Text.RegularExpressions;
using BCryptNet = BCrypt.Net.BCrypt;

namespace Server.Repository
{
    public class StudentRepository : IStudent
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public StudentRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public void CreateStudent(CreateStudentDTO model)
        {
            var school = _context.Universities.Find(model.UniversityId);
            if (school == null) {
                throw new KeyNotFoundException("University not exist");
            }
            var account = new Account()
            {
                UserName = model.Email,
                PasswordHash = BCryptNet.HashPassword("123456"),
                Role = Role.Student,
            };
            var student = _mapper.Map<Student>(model);
            student.Account = account;
            student.Status = true;
            student.University = school;

            _context.Students.Add(student);
            _context.SaveChanges();
        }

        public void DeleteStudent(int studentId)
        {
            var student = _context.Students.Where(s => s.Id == studentId).Include(a => a.Account).FirstOrDefault();
            if (student == null)
            {
                throw new KeyNotFoundException("Student not found");
            }
            if (student.Status == false) {
                var account = _context.Accounts.Where(a => a.Id == student.Account.Id).FirstOrDefault();
                if (account != null)
                    _context.Accounts.Remove(account);
                _context.Students.Remove(student);
                _context.SaveChanges();
            }
            else {
                student.Status = false;
                _context.Update(student);
                _context.SaveChanges();
            }
        }

        public IEnumerable<StudentDTO> GetAllStudents()
        {
            var students = _context.Students
                .Include(s => s.University)
                .Include(s => s.RegisterRooms.Where(r => r.Status == true))
                .Include(s => s.RegisterRooms)
                    .ThenInclude(r => r.Room)
                .ToList();

            return _mapper.Map<List<StudentDTO>>(students);
        }

        public StudentDTO GetStudentByAccountId(int accountId)
        {
            if (_context.Accounts.Find(accountId) == null)
                throw new KeyNotFoundException("Account not found");

            var Student = _context.Students.Where(s => s.Account.Id == accountId)
                .Include(s => s.University)
                .Include(s => s.RegisterRooms.Where(r => r.Status == true))
                .Include(s => s.RegisterRooms)
                    .ThenInclude(r => r.Room)
                .FirstOrDefault();

            return _mapper.Map<StudentDTO>(Student);
        }

        //public IEnumerable<Student> GetStudentByBlock(int blockId)
        //{
        //    throw new NotImplementedException();
        //}

        public Student GetStudentById(int id)
        {
            var student = _context.Students.Find(id);
            if (student == null)
                throw new KeyNotFoundException("Student not found");
            return student;
        }

        public IEnumerable<Student> GetStudentByRoom(int roomId)
        {
            var student = _context.RegisterRooms.Where(r => r.RoomId == roomId && r.Status == true)
                .Select(r => r.Student);
            if (student == null)
                throw new KeyNotFoundException("Student not found");
            return student;
        }

        public IEnumerable<StudentDTO> SearchAllFill(string? search)
        {

            
            if (!string.IsNullOrEmpty(search))
            {
                string pattern = "[^a-zA-Z0-9]";
                 search = Regex.Replace(search, pattern, "");
                var studentsFilter = _context.Students.Where(s=>s.Status == true).Include(s => s.University).ToList();
                studentsFilter = studentsFilter.Where(s => 
                            s.Email.Contains(search) ||
                            s.PhoneNumber.Contains(search) ||
                            s.FirstName.Contains(search) || s.LastName.Contains(search) ||
                            s.IdentifyCardNumber.Contains(search) ||
                            s.University.Name.Contains(search)).ToList();
                return _mapper.Map<List<StudentDTO>>(studentsFilter);
            }
            return new List<StudentDTO>();
        }

        public IEnumerable<StudentDTO> SearchStudent(int? id, string? name,string? email, string? university, string? identify, string? phoneNumber, bool? status)
        {
            var studentsFilter = _context.Students.Include(s => s.University).ToList();
            if (id.HasValue)
                studentsFilter = studentsFilter.Where(s => s.Id == id).ToList();
            if (!string.IsNullOrEmpty(name))
                studentsFilter = studentsFilter.Where(s => s.FirstName.Contains(name) || s.LastName.Contains(name)).ToList();
            if (!string.IsNullOrEmpty(phoneNumber))
                studentsFilter = studentsFilter.Where(s => s.PhoneNumber.Contains(phoneNumber)).ToList();
            if (!string.IsNullOrEmpty(identify))
                studentsFilter = studentsFilter.Where(s => s.IdentifyCardNumber.Contains(identify)).ToList();
            if (!string.IsNullOrEmpty(email))
                studentsFilter = studentsFilter.Where(s => s.Email.Contains(email)).ToList();
            if(!string.IsNullOrEmpty(university))
                studentsFilter = studentsFilter.Where(s=>s.University.Name.Contains(university)).ToList();
            if (status.HasValue)
                studentsFilter = studentsFilter.Where(s => s.Status == status).ToList();
            
            return _mapper.Map<List<StudentDTO>>(studentsFilter);
        }

        public void UpdateStudent(int studentId, UpdateStudentDTO model)
        {
            var student = GetStudentById(studentId);
            var school = _context.Universities.Find(model.UniversityId);
            if (school == null)
            {
                throw new KeyNotFoundException("University not exist");
            }


            _mapper.Map(model, student);
            _context.Students.Update(student);
            _context.SaveChanges();

        }
    }
}

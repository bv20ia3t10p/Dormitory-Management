using Server.Models;

namespace Server.Interface
{
    public interface IStudent
    {
        IEnumerable<StudentDTO> GetAllStudents();
        IEnumerable<StudentDTO> SearchStudent(int?id,string? name,string? email,string? university,string? identify,string ?phoneNumber,bool? status);
        Student GetStudentById(int id);
        StudentDTO GetStudentByAccountId(int accountId);
        IEnumerable<Student> GetStudentByRoom(int roomId);
        //IEnumerable<Student> GetStudentByBlock(int blockId);
        void CreateStudent(CreateStudent model);
        void UpdateStudent(int studentId, UpdateStudent model);
        void DeleteStudent(int studentId);
    }
}

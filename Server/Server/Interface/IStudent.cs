using Server.Models;

namespace Server.Interface
{
    public interface IStudent
    {
        IEnumerable<StudentDTO> GetAllStudents();
        IEnumerable<StudentDTO> SearchStudent(int?id,string? name,string? email,string? university,string? identify,string ?phoneNumber,bool? status);
        Student GetStudentById(int id);
        StudentDTO GetStudentByAccountId(int accountId);
        IEnumerable<StudentDTO> SearchAllFill(string? search);
        IEnumerable<Student> GetStudentByRoom(int roomId);
        //IEnumerable<Student> GetStudentByBlock(int blockId);
        void CreateStudent(CreateStudentDTO model);
        void UpdateStudent(int studentId, UpdateStudentDTO model);
        void DeleteStudent(int studentId);
    }
}

using Server.Models;

namespace Server.Interface
{
    public interface IStudent
    {
        IEnumerable<StudentDTO> GetAllStudents();
        Student GetStudentById(int id);
        IEnumerable<Student> GetStudentByRoom(int roomId);
        //IEnumerable<Student> GetStudentByBlock(int blockId);
        void CreateStudent(CreateStudent model);
        void UpdateStudent(int studentId, UpdateStudent model);

    }
}

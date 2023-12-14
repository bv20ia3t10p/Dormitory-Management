using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Server.Interface;
using Server.Models;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StudentController : ControllerBase
    {
        private readonly IStudent _studentRepository;
        private IMapper _mapper;

        public StudentController(IStudent studentRepository, IMapper mapper)
        {
            _studentRepository = studentRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAllStudent() {
            var students = _studentRepository.GetAllStudents();
            return Ok(students);
        }

        [HttpGet("{id}")]
        public IActionResult GetStudentById(int id)
        {
            var students = _studentRepository.GetStudentById(id);
            return Ok(students);
        }
        //[HttpGet("{blockId/Block}")]
        //public IActionResult GetStudentByBlockId(int id)
        //{
        //    var students = _studentRepository.GetStudentByBlock(id);
        //    return Ok(students);
        //}

        [HttpGet("{roomId}/Room")]
        public IActionResult GetStudentByRoomId(int roomId)
        {
            var students = _studentRepository.GetStudentByRoom(roomId);
            return Ok(students);
        }
        [HttpGet("{accountId}/accountId")]
        public IActionResult GetStudentByAccountId(int accountId) {
            var student = _studentRepository.GetStudentByAccountId(accountId);
            return Ok(student);

        }
        [HttpPut("{id}")]
        public IActionResult Update(int id, UpdateStudent model) {
            _studentRepository.UpdateStudent(id, model);
            return Ok();
        }
        [HttpPost]
        public IActionResult Create(CreateStudent model) {
            _studentRepository.CreateStudent(model);
            return Ok();
        }
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            _studentRepository.DeleteStudent(id);
            return NoContent();
        }
        [HttpGet("search")]
        public IActionResult Search(int? id, string? name, string? email, string? university, string? identify, string? phoneNumber, bool? status)
        {
            var student =_studentRepository.SearchStudent(id, name, email, university, identify, phoneNumber, status);
            return Ok(student);
        }
    }
}

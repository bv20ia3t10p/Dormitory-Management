using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Server.Interface;
using Server.Models;

namespace Server.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ElectricWaterLogController : ControllerBase
    {
        private readonly IElectricWaterLog _electricWaterLog;
        public ElectricWaterLogController(IElectricWaterLog electricWaterLog) {
            _electricWaterLog = electricWaterLog;
        }

        [HttpGet]
        public IActionResult GetElectricWaterLog() {
            var EWL = _electricWaterLog.GetElectricWaterLog();
            return Ok(EWL);
        }
        [HttpGet("{RoomId}")]
        public IActionResult GetElctricWaterLogByRoomId(int RoomId) {
            var EWL = _electricWaterLog.GetElectricWaterLogByRoom(RoomId);
            return Ok(EWL);
        }


        [HttpPost]
        public IActionResult Create(CreateElectricWaterLog model) {
            _electricWaterLog.CreateElectricWaterLog(model);
            return Ok();    
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, UpdateElectricWaterLog model) {
            _electricWaterLog.UpdateElectricWaterLog(id, model);
            return Ok(new { message = "Update success" });

        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            _electricWaterLog.DeleteElectricWaterLog(id);
            return NoContent();
        }
    }
}

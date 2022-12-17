using Microsoft.AspNetCore.Mvc;
using Server.Interface;

namespace Server.Controllers
{
    public class RoomTypeController: ControllerBase {

        private readonly IRoomTypes _roomType;

        public RoomTypeController(IRoomTypes roomTypes)
        {
            _roomType = roomTypes;  
        }

        [HttpGet("{roomId}")]
        public IActionResult GetRoomTypeByRoomId(int roomId) {
            var roomType = _roomType.GetRoomType(roomId);
            return Ok(roomType);
        }

    }
}

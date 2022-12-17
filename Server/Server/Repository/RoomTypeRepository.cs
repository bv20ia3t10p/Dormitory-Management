using AutoMapper;
using Server.Data;
using Server.Interface;
using Server.Models;

namespace Server.Repository
{
    public class RoomTypeRepository : IRoomTypes
    {
        private readonly DataContext _context;
        public RoomTypeRepository(DataContext context )
        {
            _context = context;

        }
        public RoomType GetRoomType(int roomId)
        {
            var roomType = _context.Rooms.Where(r => r.Id == roomId).Select(r => r.RoomType).FirstOrDefault();
            return roomType;
        }
    }
}

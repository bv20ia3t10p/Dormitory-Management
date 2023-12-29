using AutoMapper;
using Server.Data;
using Server.Helpers;
using Server.Interface;
using Server.Models;

namespace Server.Repository
{
    public class RoomTypeRepository : IRoomTypes
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public RoomTypeRepository(DataContext context, IMapper mapper
            )
        {
            _context = context;
            _mapper = mapper;
        }

        public IEnumerable<RoomTypeDTO> GetAllRoomTypes()
        {
            var roomTypes = _context.RoomTypes.ToList();
            return _mapper.Map<List<RoomTypeDTO>>(roomTypes);

        }

        public RoomType GetRoomType(int roomId)
        {
            var roomType = _context.Rooms.Where(r => r.Id == roomId).Select(r => r.RoomType).FirstOrDefault();
            return roomType;
        }

        public void UpdateRoomType(int roomTypeId, RoomTypeDTO model)
        {
            var roomType = _context.RoomTypes.Find(roomTypeId);

            var listRoom = _context.Rooms.Where(r => r.RoomType.Id == roomTypeId).ToList();

            if (listRoom == null)
            {
                throw new KeyNotFoundException("List room not found");
            }

            listRoom.ForEach(room =>
            {
                
                room.SlotRemain += model.NumberOfSLot - roomType.NumberOfSLot;
                if(room.SlotRemain<0)
                    throw new AppException("Can not update number of slot");              
              _context.Rooms.Update(room);
            });

            if (roomType == null)
            {
                throw new KeyNotFoundException("room not found");
            }
            _mapper.Map(model, roomType);

            _context.Update(roomType);
            _context.SaveChanges();
        }
    }
}

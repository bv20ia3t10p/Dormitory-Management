using AutoMapper;
using Server.Data;
using Server.Helpers;
using Server.Interface;
using Server.Models;

namespace Server.Repository
{
    public class ElectricWaterLogRepository : IElectricWaterLog
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public ElectricWaterLogRepository(DataContext context, IMapper mapper) {
            _context = context;
            _mapper = mapper;

        }
        public void CreateElectricWaterLog(CreateElectricWaterLog model)
        {
            var room = _context.Rooms.Find(model.RoomId);
            if ( room== null) {
                throw new KeyNotFoundException("room not exist");
            }

            var EWL = model;
            EWL.LogDate = DateTime.Today;

            if ((EWL.ElectricNew - EWL.ElectricOld < 0)
                || (EWL.WaterNew -EWL.WaterOld <0 )) {
                throw new AppException("Input water or electric error");
            }

            EWL.ElectricUse = EWL.ElectricNew - EWL.ElectricOld;
            EWL.WaterUse = EWL.WaterNew - EWL.ElectricOld;
            EWL.ElectricFee = 1200 * EWL.ElectricUse;
            EWL.WaterFee = 800 *EWL.WaterUse;
            EWL.TotalFee = EWL.ElectricFee+EWL.WaterFee;
            EWL.FeeStatus = false;
            EWL.Room = room;

            var EWLMap = _mapper.Map<ElectricWaterlog>(EWL);
            _context.ElectricWaterlogs.Add(EWLMap);
            _context.SaveChanges();


            
        }

        public IEnumerable<ElectricWaterlog> GetElectricWaterLog()
        {
            return _context.ElectricWaterlogs;
        }

        public IEnumerable<ElectricWaterlog> GetElectricWaterLogByRoom(int roomId)
        {
            if (_context.Rooms.Find(roomId) == null) {
                throw new KeyNotFoundException("room not exist");
            }

            var ELW = _context.ElectricWaterlogs.Where(e => e.Room.Id == roomId).ToList();

            return ELW;

        }

        public void UpdateElectricWaterLog(int ElectricwaterLogId, UpdateElectricWaterLog model)
        {
            var EWL = _context.ElectricWaterlogs.Find(ElectricwaterLogId);
            if (EWL == null) {
                throw new KeyNotFoundException("Electric water log not exist");
            }

            var room = _context.Rooms.Find(model.RoomId);
            if (room == null)
            {
                throw new KeyNotFoundException("room not exist");
            }

            EWL.LogDate = DateTime.Today;

            if ((EWL.ElectricNew - EWL.ElectricOld < 0)
                || (EWL.WaterNew - EWL.WaterOld < 0))
            {
                throw new AppException("Input water or electric error");
            }

            EWL.ElectricUse = EWL.ElectricNew - EWL.ElectricOld;
            EWL.WaterUse = EWL.WaterNew - EWL.ElectricOld;
            EWL.ElectricFee = 1200 * EWL.ElectricUse;
            EWL.WaterFee = 800 * EWL.WaterUse;
            EWL.TotalFee = EWL.ElectricFee + EWL.WaterFee;
            EWL.FeeStatus = false;
            EWL.Room = room;

            var EWLMap = _mapper.Map<ElectricWaterlog>(EWL);
            _context.ElectricWaterlogs.Update(EWLMap);
            _context.SaveChanges();

        }

       
    }
}

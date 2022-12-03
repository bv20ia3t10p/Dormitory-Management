using AutoMapper;
using Server.Data;
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
            var EWL = _mapper.Map<ElectricWaterlog>(model);
            
        }

        public IEnumerable<ElectricWaterlog> GetElectricWaterLogByRoom(int roomId)
        {
            throw new NotImplementedException();
        }

        public void UpdateElectricWaterLog(int ElectricwaterLogId)
        {
            throw new NotImplementedException();
        }
    }
}

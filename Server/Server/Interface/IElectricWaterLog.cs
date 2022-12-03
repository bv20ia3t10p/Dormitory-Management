using Server.Models;

namespace Server.Interface
{
    public interface IElectricWaterLog
    {
        IEnumerable<ElectricWaterlog> GetElectricWaterLogByRoom(int roomId);
        void CreateElectricWaterLog(CreateElectricWaterLog model);
        void UpdateElectricWaterLog(int ElectricwaterLogId);


    }
}

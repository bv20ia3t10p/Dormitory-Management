using Server.Models;

namespace Server.Interface
{
    public interface IElectricWaterLog
    {
        IEnumerable<ElectricWaterLogResponse> GetElectricWaterLog();
        IEnumerable<ElectricWaterlog> GetElectricWaterLogByRoom(int roomId);
        void CreateElectricWaterLog(CreateElectricWaterLog model);
        void UpdateElectricWaterLog(int ElectricwaterLogId, UpdateElectricWaterLog model );
        void DeleteElectricWaterLog(int ElectricwaterLogId);
    }
}

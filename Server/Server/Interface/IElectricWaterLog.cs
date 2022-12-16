using Server.Models;

namespace Server.Interface
{
    public interface IElectricWaterLog
    {
        IEnumerable<ElectricWaterlog> GetElectricWaterLog();
        IEnumerable<ElectricWaterlog> GetElectricWaterLogByRoom(int roomId);
        void CreateElectricWaterLog(int roomId,CreateElectricWaterLog model);
        void UpdateElectricWaterLog(int ElectricwaterLogId,int RoomId, UpdateElectricWaterLog model );


    }
}

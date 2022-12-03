using System.Text.Json.Serialization;

namespace Server.Models
{
    public class CreateElectricWaterLog
    {
        [JsonIgnore]
        public int Id { get; set; }
        public int roomId { get; set; }
        public DateTime LogDate { get; set; }
        public int ElectricNew { get; set; }
        public int ElectricOld { get; set; }
        public int WaterOld { get; set; }
        public int WaterNew { get; set; }
        [JsonIgnore]
        public int WaterUse { get; set; }
        [JsonIgnore]
        public int ElectricUse { get; set; }
        [JsonIgnore]
        public int ElectricFee { get; set; }
        [JsonIgnore]
        public int WaterFee { get; set; }
        [JsonIgnore]
        public int TotalFee { get; set; }
        [JsonIgnore]
        public Boolean FeeStatus { get; set; }
        [JsonIgnore]
        public Room Room { get; set; }
    }
}

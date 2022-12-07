namespace Server.Models
{
    public class RegisterRoomDTO
    {
        public int StudentId { get; set; }
        public int RoomId { get; set; }
        public DateTime DateBegin { get; set; }
        public DateTime DateEnd { get; set; }
        public int NumberOfMonth { get; set; }
        public int DomitoryFee { get; set; }
        public bool DomitoryFeeStatus { get; set; }
        public bool Status { get; set; }
        public string RoomName { get; set; }
    }
}

namespace Server.Models
{
    public class Room
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int SlotRemain { get; set; }
        public bool Status { get; set; }
        public Block Block { get; set; }       
        public RoomType RoomType { get; set; }
        public ICollection<RegisterRoom> RegisterRooms { get; set; }
    }
}

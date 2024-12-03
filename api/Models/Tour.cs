using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TravelWeb.Models
{
    public class Tour
    {
        [Key]
        public int Id { get; set; }
        public string Destination { get; set; }
        public string Country { get; set; }
        public string? Description { get; set; }
        public int? TotalSlot { get; set; }
       
        [Column(TypeName = "decimal(10,2)")]
        public decimal Price { get; set; }
        [Column(TypeName = "decimal(2,1)")]
        public decimal? Rate { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? TimeLine { get; set; }
    }
}

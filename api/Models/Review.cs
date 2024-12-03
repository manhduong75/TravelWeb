using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TravelWeb.Models
{
    public class Review
    {
        [Key]
        public int Id { get; set; }
        public string? UserId { get; set; }
        public int? TourId { get; set; }
        [Column(TypeName = "decimal(2,1)")]
        public decimal? Rate { get; set; }
        public string? ReviewText { get; set; }
        public DateTime? ReviewDate { get; set; }
    }
}

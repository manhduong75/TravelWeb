using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace TravelWeb.Models
{
    public class SearchHistory
    {
        [Key]
        public int SearchID { get; set; }
        public string SearchQuery { get; set; }
        public DateTime? SearchDate { get; set; }

    }
}

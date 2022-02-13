using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Todo.Data.Models
{
    public class Item
    {
        [Key]
        public int ItemId { get; set; }

        [Column(TypeName = "nvarchar(1000)")]
        public string Description { get; set; }

        [Column(TypeName = "bit")]
        public bool IsComplete { get; set; }
    }
}

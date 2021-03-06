using System;
using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Models
{
    public class Activitie
    {
        [Key]
        public int Id {get; set;}

        public string NameOfActivitie {get; set;}

        public string Description {get; set;}

        public DateTime DateToRealize {get; set;}

        public DateTime DateAdded {get; set;}

        public User User { get; set; }

        public int UserId {get;set;}

        
    }
}
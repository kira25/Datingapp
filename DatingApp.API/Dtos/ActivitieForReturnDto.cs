using System;
using DatingApp.API.Models;

namespace DatingApp.API.Dtos
{
    public class ActivitieForReturnDto
    {
        public int Id { get; set; }

        public string NameOfActivitie { get; set; }

        public string Description { get; set; }

        public DateTime DateToRealize { get; set; }

        public DateTime DateAdded { get; set; }

        public int UserId { get; set; }

    }
}
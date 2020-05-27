using System;

namespace DatingApp.API.Dtos
{
    public class ActivitiesForListDto
    {
        public int Id { get; set; }

        public string NameOfActivitie { get; set; }

        public string Description { get; set; }

        public DateTime DateToRealize { get; set; }

        public DateTime DateAdded { get; set; }

        public int UserId { get; set; }

    }
}
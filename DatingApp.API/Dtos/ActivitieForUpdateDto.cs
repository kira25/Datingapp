using System;

namespace DatingApp.API.Dtos
{
    public class ActivitieForUpdateDto
    {
        public string NameOfActivitie { get; set; }

        public string Description { get; set; }

        public DateTime DateToRealize { get; set; }

        public DateTime DateAdded { get; set; }

         public ActivitieForUpdateDto()
        {
            DateAdded = DateTime.Now;
        }
    }
}
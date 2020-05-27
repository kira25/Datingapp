namespace DatingApp.API.Helpers
{
    public class UserActivities
    {
        private const int MaxPageSize = 10;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 10;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }

        public int Id { get; set; }
        public int UserId { get; set; }
      
       
    }
}
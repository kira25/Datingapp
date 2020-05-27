using System.Threading.Tasks;
using DatingApp.API.Helpers;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public interface IDatingRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<User> GetUser(int id);
        Task<Photo> GetPhoto(int id);
        Task<Photo> GetMainPhotoForUser(int userId);
        Task<PagedList<User>> GetUsers(UserParams userParams);

        //Activie methods

        Task<Activitie> GetActivitie(int id);

        Task<PagedList<Activitie>> GetActivities ( UserActivities userActivities);



        
    }
}
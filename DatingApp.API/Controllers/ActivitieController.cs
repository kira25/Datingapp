using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/users/{userid}/activitie")]
    [ApiController]
    public class ActivitieController : ControllerBase
    {
        private readonly IDatingRepository _repository;
        private readonly IMapper _mapper;
        public ActivitieController(IDatingRepository repository, IMapper mapper)
        {
            _mapper = mapper;
            _repository = repository;
        }


        [HttpGet("{id}", Name = "Get Activitie")]

        public async Task<IActionResult> GetActivitie(int id)
        {

            var activitieFromRepo = await _repository.GetActivitie(id);

            var activitie = _mapper.Map<ActivitieForReturnDto>(activitieFromRepo);

            return Ok(activitie);
        }

        [HttpGet]

        public async Task<IActionResult> GetActivities([FromQuery] UserActivities userActivities, int userId)
        {


            userActivities.UserId = userId;

            var activities = await _repository.GetActivities(userActivities);

            var activitiesToReturn = _mapper.Map<IEnumerable<ActivitiesForListDto>>(activities);


            Response.AddPagination(activities.CurrentPage, activities.PageSize, activities.TotalCount, activities.TotalPages);

            return Ok(activitiesToReturn);
        }

        [HttpPost]

        public async Task<IActionResult> AddActivitie(int userId, ActivitieForCreationDto activitieForCreationDto)
        {

            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repository.GetUser(userId);

            var activitie = _mapper.Map<Activitie>(activitieForCreationDto);

            userFromRepo.Activities.Add(activitie);

            if (await _repository.SaveAll())
            {

                var activitieToReturn = _mapper.Map<ActivitieForReturnDto>(activitie);
                return CreatedAtRoute("Get Activitie", new { id = activitie.Id }, activitieToReturn);
            }

            return BadRequest("Could not add the activitie");


        }

        [HttpPut("{id}")]

        public async Task<IActionResult> UpdateActivitie(int id, ActivitieForUpdateDto activitieForUpdateDto, int userId)
        {

            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var activitieFromRepo = await _repository.GetActivitie(id);

            var userFromRepo = await _repository.GetUser(userId);

            _mapper.Map(activitieForUpdateDto, activitieFromRepo);

            if (await _repository.SaveAll())
            {

                return NoContent();

            }

            throw new Exception($"Updating activitie {activitieFromRepo.Id} failed on update");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivitie(int userId, int id)
        {

            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var user = await _repository.GetUser(userId);

            if (!user.Activities.Any(p => p.Id == id))
                return Unauthorized();

            var activitieFromRepo = await _repository.GetActivitie(id);

            _repository.Delete(activitieFromRepo);

            if (await _repository.SaveAll())
                return Ok();

            return BadRequest("Failed to delete the activitie");

        }






    }
}
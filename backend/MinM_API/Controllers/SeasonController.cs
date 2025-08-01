﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MinM_API.Dtos;
using MinM_API.Services.Implementations;
using MinM_API.Services.Interfaces;
using MinM_API.Dtos.Season;

namespace MinM_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SeasonController(ISeasonService seasonService) : ControllerBase
    {
        [HttpPost]
        [Route("Create")]
        [Authorize(Roles = "Admin", AuthenticationSchemes = "MyTokenScheme")]
        public async Task<ActionResult<ServiceResponse<int>>> AddSeason(AddSeasonDto seasonDto)
        {
            var response = await seasonService.AddSeason(seasonDto);

            return StatusCode((int)response.StatusCode, response);
        }

        [HttpGet]
        [Route("GetAll")]
        public async Task<ActionResult<List<GetSeasonDto>>> GetAllSeasons()
        {
            var response = await seasonService.GetAllSeasons();

            return StatusCode((int)response.StatusCode, response);
        }

        [HttpGet]
        [Route("GetById")]
        public async Task<ActionResult<GetSeasonDto>> GetSeasonById(string id)
        {
            var response = await seasonService.GetSeasonById(id);

            return StatusCode((int)response.StatusCode, response);
        }

        [HttpGet]
        [Route("{slug}")]
        public async Task<ActionResult<GetSeasonDto>> GetSeasonBySlug(string slug)
        {
            var response = await seasonService.GetSeasonBySlug(slug);

            return StatusCode((int)response.StatusCode, response);
        }

        [HttpPut]
        [Route("Update")]
        public async Task<ActionResult<ServiceResponse<int>>> UpdateSeason(UpdateSeasonDto updateSeasonDto)
        {
            var response = await seasonService.UpdateSeason(updateSeasonDto);

            return StatusCode((int)response.StatusCode, response);
        }
    }
}

﻿namespace MinM_API.Dtos.Category
{
    public record GetCategoryDto
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        public string? ParentCategoryId { get; set; }
        public string? ImageURL { get; set; } = string.Empty;
    }
}

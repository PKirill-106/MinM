﻿using Microsoft.EntityFrameworkCore;

namespace MinM_API.Models
{
    [Index(nameof(Slug), IsUnique = true)]
    public class Category
    {
        public string Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string? Description { get; set; }

        public string? ImageURL { get; set; }

        public string? ParentCategoryId { get; set; }  // Зв'язок із батьківською категорією
        public virtual Category? ParentCategory { get; set; }
        public virtual List<Category>? Subcategories { get; set; }

        public virtual List<Product>? Products { get; set; }
    }

}

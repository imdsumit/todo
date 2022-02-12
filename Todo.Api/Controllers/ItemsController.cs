using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Todo.Data;
using Todo.Data.Models;

namespace Todo.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly TodoDbContext todoDbContext;

        public ItemsController(TodoDbContext todoDbContext)
        {
            this.todoDbContext = todoDbContext;
        }

        // GET: api/Items
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Item>>> GetItems()
        {
            return await todoDbContext.Items.ToListAsync();
        }

        // GET: api/Items/1
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var item = await todoDbContext.Items.FindAsync(id);
            return Ok(item);
        }

        // PUT: api/Items/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateItem(int id, Item item)
        {
            if (id != item.ItemId)
            {
                return BadRequest();
            }

            todoDbContext.Entry(item).State = EntityState.Modified;

            try
            {
                await todoDbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Items
        [HttpPost]
        public async Task<ActionResult<Item>> Create(Item item)
        {
            todoDbContext.Items.Add(item);
            await todoDbContext.SaveChangesAsync();

            return CreatedAtAction("GetById", new { id = item.ItemId }, item);
        }

        // DELETE: api/Item/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Item>> Delete(int id)
        {
            var item = await todoDbContext.Items.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            todoDbContext.Items.Remove(item);
            await todoDbContext.SaveChangesAsync();

            return NoContent();
        }

        private bool ItemExists(int id)
        {
            return todoDbContext.Items.Any(e => e.ItemId == id);
        }
    }
}

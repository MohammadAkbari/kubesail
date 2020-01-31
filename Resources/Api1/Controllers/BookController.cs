using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BookController : ControllerBase
    {
        private readonly LibraryManager _libraryManager;

        public BookController(LibraryManager libraryManager)
        {
            _libraryManager = libraryManager;
        }

        [HttpGet]
        public IEnumerable<Book> Get()
        {
            return User.Identity.IsAuthenticated ? 
                _libraryManager.GetAllBooks() :
                _libraryManager.GetFreeBooks();
        }

        [HttpPost, Authorize]
        public IActionResult Post([FromBody] Book book)
        {
            _libraryManager.Add(book);

            return Ok();
        }
    }

    public class LibraryManager
    {
        private readonly List<Book> _books = new List<Book>
        {
            new Book("C#", false),
            new Book("Java", true),
        };

        public void Add(Book book)
        {
            _books.Add(book);
        }

        public List<Book> GetAllBooks()
        {
            return _books;
        }

        public List<Book> GetFreeBooks()
        {
            return _books.Where(e => e.NeedAuthorize == false).ToList();
        }
    }

    public class Book
    {
	public Book()
        {
        }
        public Book(string name, bool needAuthorize)
        {
            Name = name;
            NeedAuthorize = needAuthorize;
        }

        public string Name { get; set; }
        public bool NeedAuthorize { get; set; }
    }
}

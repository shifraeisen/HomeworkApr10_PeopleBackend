using HomeworkApr10_PeopleBackend.Data;
using HomeworkApr10_PeopleBackend.Web.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HomeworkApr10_PeopleBackend.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly string _conStr;
        public PeopleController(IConfiguration configuration)
        {
            _conStr = configuration.GetConnectionString("ConStr");
        }
        [Route("GetPeople")]
        public List<Person> GetPeople()
        {
            var repo = new PersonRepository(_conStr);
            return repo.GetAllPeople();
        }
        [HttpPost]
        [Route("AddPerson")]
        public void AddPerson(Person p)
        {
            var repo = new PersonRepository(_conStr);
            repo.AddPerson(p);
        }
        [HttpPost]
        [Route("UpdatePerson")]
        public void EditPerson(Person p)
        {
            var repo = new PersonRepository(_conStr);
            repo.EditPerson(p);
        }
        [HttpPost]
        [Route("DeletePerson")]
        public void DeletePerson(DeletePersonModel m)
        {
            var repo = new PersonRepository(_conStr);
            repo.DeletePerson(m.Id);
        }
        [HttpPost]
        [Route("DeleteSelected")]
        public void DeleteSelected(DeleteSelectedModel m)
        {
            var repo = new PersonRepository(_conStr);
            repo.DeleteMultiple(m.Ids);
        }
    }
}

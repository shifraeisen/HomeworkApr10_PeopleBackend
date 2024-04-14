using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeworkApr10_PeopleBackend.Data
{
    public class PersonRepository
    {
        private readonly string _connectionString;
        public PersonRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public List<Person> GetAllPeople()
        {
            using var context = new PeopleDataContext(_connectionString);
            return context.People.ToList();
        }
        public void AddPerson(Person p)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.People.Add(p);
            context.SaveChanges();
        }
        public void EditPerson(Person p)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.Entry(p).State = EntityState.Modified;
            context.SaveChanges();
        }
        public void DeletePerson(int id)
        {
            using var context = new PeopleDataContext(_connectionString);
            var person = context.People.FirstOrDefault(p => p.Id == id);
            context.People.Remove(person);
            context.SaveChanges();
        }
        public void DeleteMultiple(List<int> ids)
        {
            using var context = new PeopleDataContext(_connectionString);
            var ppl = context.People.Where(p => ids.Contains(p.Id));
            context.People.RemoveRange(ppl);
            context.SaveChanges();
        }
    }
}

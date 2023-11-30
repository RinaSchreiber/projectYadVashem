using collections.Models;
using collections.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace collections.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class collectionController : ControllerBase
    {
        private readonly ICollectionRepository _collectionRepository;
        public collectionController(ICollectionRepository collectionRepository)
        {
            _collectionRepository =collectionRepository;
        }
        [HttpGet]
        public async Task<ActionResult<CollectionInfo>> GetCollection(string id)
        {
            CollectionInfo collection = _collectionRepository.GetCollectionBySymbolization(id);
            if (collection == null)
            {
                return NotFound();
            }
            return Ok(collection);
        }

        [HttpPost]
        public async Task<ActionResult<List<CollectionInfo>>> AddCollection(CollectionInfo c)
        {
            var collections = _collectionRepository.AddImagesToCollection(c);
            return Ok(collections);
        }
    }
}

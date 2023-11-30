using collections.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace collections.Repositories
{
    public interface ICollectionRepository
    {
        CollectionInfo[] GetAllCollections();

        CollectionInfo GetCollectionBySymbolization(string symbolization);

        void SaveCollectionDetails(CollectionInfo collectionDetails);

        CollectionInfo AddImagesToCollection(CollectionInfo collection);
    }
    public class CollectionRepository : ICollectionRepository
    {
        private readonly string imageSavePath = Path.Combine(Environment.CurrentDirectory, "collectionImages");

        public CollectionInfo GetCollectionBySymbolization(string symbolization)
        {
            var _collectionList = GetAllCollections();
            var collection = _collectionList.FirstOrDefault(c => c.CollectionSymbolization == symbolization);
            if (collection == null)
                throw new Exception("id not exist");
            return collection;
        }

        public CollectionInfo[] GetAllCollections()
        {
            CollectionInfo[] allCollections = new CollectionInfo[10];
            string jsonFilePath = Path.Combine(Environment.CurrentDirectory, "collections.json");
            string jsonContent = File.ReadAllText(jsonFilePath);
            allCollections = JsonConvert.DeserializeObject<CollectionInfo[]>(jsonContent);
            return allCollections;
        }

        public void SaveCollectionDetails(CollectionInfo collectionDetails)
        {
            string collectionDirPath = Path.Combine(imageSavePath, collectionDetails.CollectionSymbolization.ToString());
            if (!Directory.Exists(collectionDirPath))
            {
                Directory.CreateDirectory(collectionDirPath);
            }

            foreach (ImageDetails imageDetails in collectionDetails.Images)
            {
                try
                {
                    string filePath = Path.Combine(collectionDirPath, imageDetails.ImageNumber + ".txt");
                    using (StreamWriter writer = new StreamWriter(filePath))
                    {
                        writer.WriteLine("Collection Number: " + collectionDetails.CollectionSymbolization);
                        writer.WriteLine("Collection Name: " + collectionDetails.Title);

                        writer.WriteLine("\nImage " + imageDetails.ImageNumber + ":");
                        writer.WriteLine("  Image Path: " + imageDetails.ImagePath);
                        if (imageDetails.ImageBack)
                        {
                            writer.WriteLine("  Image Back: " + imageDetails.ImagePath + "_xx");
                        }
                    }
                    imageDetails.Saved = true;
                }
                catch (Exception ex)
                {
                    imageDetails.Saved = false;

                }

            }
        }

        public CollectionInfo AddImagesToCollection(CollectionInfo collection)
        {
            SaveCollectionDetails(collection);
            return collection;
        }


    }

}

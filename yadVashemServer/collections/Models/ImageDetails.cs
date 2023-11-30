using System;
namespace collections.Models
{
    public class ImageDetails
    {
        public int ImageNumber { get; set; }
        public string ImagePath { get; set; }
        //public byte[] ImageData { get; set; }
        public bool ImageBack { get; set; }
        public bool Saved { get; set; }
    }
}
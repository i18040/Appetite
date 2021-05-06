using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace AppetiteAPI.Helpers
{
    public class PictureHelper
    {
        public List<string> SavePictureList(List<IFormFile> pictures, string mails, string folder)
        {
            var result = new List<string>();
            if (pictures != null)
            {
                int count = 0;
                foreach (var picture in pictures)
                {
                    string saveName = $"{count}_{mails}_{picture.FileName}";
                    count++;
                    SavePicture(picture, saveName, folder);
                    result.Add(saveName);
                }
            }
            return result;
        }

        public async void SavePicture(IFormFile picture, string saveName, string folder)
        {
            if (!Directory.Exists("./Pictures/" + folder))
            {
                Directory.CreateDirectory("./Pictures/" + folder);
            }
            string path = $"{Directory.GetCurrentDirectory()}\\Pictures\\{folder}\\{saveName}";

            using (Stream stream = new FileStream(path, FileMode.Create))
            {
                await picture.CopyToAsync(stream);
            }
        }

        public void DeletePictureList(List<string> pictures, string folder)
        {
            if (pictures != null)
            {
                foreach (var picture in pictures)
                {
                    DeletePicture(picture, folder);
                }
            }
        }

        public async void DeletePicture(string fileName, string folder)
        {
            string path = Path.Combine($"./Pictures/{folder}", fileName);
            if (File.Exists(path))
                File.Delete(path);
        }
    }
}

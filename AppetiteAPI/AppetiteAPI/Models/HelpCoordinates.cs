namespace AppetiteAPI.Models
{
    public class HelpCoordinates
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }

        public HelpCoordinates(double latitude, double longitude)
        {
            Latitude = latitude;
            Longitude = longitude;
        }

        public HelpCoordinates()
        {
            Latitude = 0;
            Longitude = 0;
        }
    }
}
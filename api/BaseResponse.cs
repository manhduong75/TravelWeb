namespace TravelWeb
{
    public class BaseResponse<T>
    {
        public BaseResponse()
        {
            Messages = new List<Message>();
        }

        public string Status { get; set; }
        public List<Message> Messages { get; set; }
        public T Data { get; set; }
    }
}

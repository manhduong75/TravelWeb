using System;
using System.Collections.Generic;
using System.Text;

namespace TravelWeb
{
    public class PharmacyException : Exception
    {
        public PharmacyException()
        {
            Messages = new List<Message>();
        }
        public List<Message> Messages { get; set; }
    }

    public class Message
    {
        public string Code { get; set; }
        public string MessageText { get; set; }
        public string Field { get; set; }

        public static Message CreateErrorMessage(string apiCode, string apiCondition, string messageText, string field)
        {
            return new Message()
            {
                Code = "E." + apiCode + "." + apiCondition,
                MessageText = messageText,
                Field = field
            };
        }

        public static Message CreateWarningMessage(string apiCode, string apiCondition, string messageText, string field)
        {
            return new Message()
            {
                Code = "E." + apiCode + "." + apiCondition,
                MessageText = messageText,
                Field = field
            };
        }

        public static string GetErrorCode(string apiCode, string apiCondition)
        {
            return "E." + apiCode + "." + apiCondition;
        }

        public static string GetWarningCode(string apiCode, string apiCondition)
        {
            return "E." + apiCode + "." + apiCondition;
        }
    }
}

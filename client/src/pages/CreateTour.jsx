import React, { useState, useContext } from "react";
import axios from "axios";
import { ToastContext } from "../contexts/ToastProvider";
import { useNavigate } from "react-router-dom";

const CreateTour = () => {
  const [formData, setFormData] = useState({
    Destination: "",
    Country: "",
    Description: "",
    TotalSlot: "",
    Price: "",
    Rate: "",
    TimeLine: "",
    Images: [],
  });
  const { toast } = useContext(ToastContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      Images: files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();

      // Append text fields
      formDataToSend.append("Destination", formData.Destination);
      formDataToSend.append("Country", formData.Country);
      formDataToSend.append("Description", formData.Description);
      formDataToSend.append("TotalSlot", formData.TotalSlot);
      formDataToSend.append("Price", formData.Price);
      formDataToSend.append("Rate", formData.Rate);
      formDataToSend.append("TimeLine", formData.TimeLine);

      // Append images
      formData.Images.forEach((file) => {
        formDataToSend.append("Images", file);
      });

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://travel.com/api/ITO01",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Tạo địa điểm du lịch thành công!");
        setTimeout(() => {
          navigate("/best-places");
        }, 2000);
        setFormData({
          Destination: "",
          Country: "",
          Description: "",
          TotalSlot: "",
          Price: "",
          Rate: "",
          TimeLine: "",
          Images: [],
        });
      } else {
        toast.warn(response.data.messages[0].messageText);
      }
    } catch (error) {
      console.error("Error creating tour:", error);
      toast.error("Tạo điểm du lịch thất bại!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-4 pt-14 mt-14">
      <div className="rounded-lg p-10 shadow-lg">
        <div className="mb-4">
          <label className="block mb-2">Địa điểm du lịch:</label>
          <input
            type="text"
            name="Destination"
            value={formData.Destination}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Đất nước:</label>
          <input
            type="text"
            name="Country"
            value={formData.Country}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Mô tả:</label>
          <textarea
            name="Description"
            value={formData.Description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Số lượng tối đa:</label>
          <input
            type="number"
            name="TotalSlot"
            value={formData.TotalSlot}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Giá tiền/1 người:</label>
          <input
            type="number"
            name="Price"
            value={formData.Price}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Xếp hạng (tối đa 5.0):</label>
          <input
            type="number"
            name="Rate"
            value={formData.Rate}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Thời gian du lịch:</label>
          <input
            type="text"
            name="TimeLine"
            value={formData.TimeLine}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Ảnh về địa điểm du lịch:</label>
          <input
            type="file"
            multiple
            onChange={handleImageUpload}
            className="w-full p-2 border rounded"
            accept="image/*"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          Tạo địa điểm du lịch
        </button>
      </div>
    </form>
  );
};

export default CreateTour;

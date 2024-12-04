import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import tourService from '../apis/tourService';
import bookingService from '../apis/bookingService';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ToastContext } from "../contexts/ToastProvider";
import { FaStar } from "react-icons/fa";
import { IoIosTimer } from 'react-icons/io';
import { GoLocation, GoPeople } from "react-icons/go";
import { GiMoneyStack } from "react-icons/gi";
import { formatNumber } from '../mixin';

const OrderTour = () => {
  const { id } = useParams();
  const [tourDetail, setTourDetail] = useState(null);
  const [orderer, setOrderer] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [numberOfTravelers, setNumberOfTravelers] = useState(1);
  const [paymentStatus, setPaymentStatus] = useState('');
  const { toast } = useContext(ToastContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTourDetail = async () => {
      try {
        const response = await tourService.getTourDetail(id);
        if (response.status === 200) {
          setTourDetail(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch tour detail:', error);
      }
    };

    fetchTourDetail();
  }, [id]);

  const handleBooking = async () => {
    const bookingData = {
      orderer,
      tourId: id,
      phoneNumber,
      numberOfTravelers,
      paymentStatus,
    };

    try {
      const response = await bookingService.insertBooking(bookingData);
      if (response.status === 200) {
        if(response.data.status === "200")
        {
          toast.success("Đặt tour du lịch đến " + tourDetail.destination + " thành công!");
          setTimeout(() => {
            navigate('/thank-you');
          }, 3000);
        }
        else 
        {
          toast.warn(response.data.messages[0].messageText);
        }
      }
    } catch (error) {
      console.error('Failed to book tour:', error);
      toast.error('Đặt tour thất bại!');
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="pt-32 container mx-auto flex">
      <div className="w-3/5 p-4">
        {tourDetail ? (
          <div>
            <div>
              <Slider {...settings}>
              {Array.isArray(tourDetail.images) && tourDetail.images.map((image, index) => (
                <div key={index}>
                  <img 
                    src={image} 
                    alt={`Slide ${index}`} 
                    className="w-full h-auto object-cover rounded-lg" 
                    style={{ height: '400px', width: '100%' }}
                  />
                </div>
              ))}
            </Slider>
            </div>
            <div className="w-full h-auto object-cover rounded-lg border border-slate-400 mt-10">
              <div className='mx-6 my-6'>
                <h2 className="mt-4 text-3xl font-semibold mb-4">
                  {tourDetail.destination}
                </h2>
                <div className='flex flex-row items-center mb-4'>
                    <FaStar color='#ffe234' size={18} className='mr-1'/>
                    {tourDetail.rate}
                    <IoIosTimer size={19} className='ml-14 mr-1 mt-1/4'/>
                    {tourDetail.timeLine}
                </div>
                <div className='flex flex-row items-center mb-10'>
                    <GoLocation className='mr-1'/>
                    {tourDetail.country}
                    <GiMoneyStack  size={19} className='ml-14 mr-1 mt-1/4'/>
                    {formatNumber(tourDetail.price)} VNĐ /người
                    <GoPeople size={19} className='ml-14 mr-1 mt-1/4'/>
                     Tối đa {tourDetail.totalSlot} người
                </div>
                <h2 className="mt-4 text-3xl font-semibold mb-4">
                  Giới thiệu
                </h2>
                <div>
                  <p>{tourDetail.description}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="w-full object-cover rounded-lg border border-slate-400 mt-4">
        <div className='flex flex-row items-end mb-4 justify-between mx-6 my-6 pb-8 border-b'>
          <div className='flex flex-row'>
            <GiMoneyStack  size={26} className='mr-1 mt-1'/>
            <h2 className="text-2xl font-bold">{tourDetail && formatNumber(tourDetail.price)} VNĐ /người</h2>
          </div>
          <div className='flex flex-row items-center'>
            <FaStar color='#ffe234' size={18} className='mr-1'/>
          {tourDetail && tourDetail.rate}
          </div>
        </div>
        <div className='flex flex-col justify-between mx-6 my-6'>
          <form onSubmit={(e) => { e.preventDefault(); handleBooking(); }}>
          <div className="mb-4">
            <label className="block text-gray-700">Họ tên:</label>
            <input
              type="text"
              value={orderer}
              onChange={(e) => setOrderer(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Số điện thoại:</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Số lượng khách:</label>
            <input
              type="number"
              value={numberOfTravelers}
              onChange={(e) => setNumberOfTravelers(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
              min="1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Trạng thái thanh toán:</label>
            <input
              type="text"
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-300 text-white px-4 py-2 rounded w-full"
          >
            Đặt ngay
          </button>
        </form>
        </div>
        
      </div>
    </div>
  );
};

export default OrderTour;
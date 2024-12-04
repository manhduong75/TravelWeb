import React from 'react';
import camonBg from '../../assets/camon-bg.png';

const Thanks = () => {
  return (
    <div className="text-center p-5 flex flex-col items-center justify-center min-h-screen">
      <img src={camonBg} alt="Cảm ơn" className="w-3/12 h-3/12" />
      <h2 className="mt-4 text-xl">Chuyến du lịch của bạn đã được đặt thành công!</h2>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full" onClick={() => window.location.href = '/'}>
        Quay trở về trang chủ
      </button>
    </div>
  );
};

export default Thanks;
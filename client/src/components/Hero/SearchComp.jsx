import {useState} from 'react'
import { useNavigate } from 'react-router-dom';

export const SearchComp = () => {
    const [destination, setDestination] = useState('');
    const [priceValue, setPriceValue] = useState(5000000);

    const navigate = useNavigate();

    const handleSearchClick = () => {
        navigate(`/best-places?destination=${destination}&maxPrice=${priceValue}`);
    };
  return (
    <div
            data-aos="fade-up"
            data-aos-delay="600"
            className="space-y-4 bg-white rounded-md p-4 relative"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3">
              <div>
                <label htmlFor="destination" className="opacity-70">
                  Tìm địa điểm của bạn
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Việt Nam"
                  className="w-full bg-gray-100 my-2 range accent-primary focus:outline-primary focus:outline outline-1 rounded-full p-2"
                />
              </div>
              {/* <div>
                <label htmlFor="destination" className="opacity-70">
                  Ngày đi
                </label>
                <input
                  type="date"
                  name="destination"
                  id="destination"
                  className="w-full !placeholder-slate-400 bg-gray-100 my-2 rounded-full focus:outline-primary focus:outline outline-1 p-2"
                />
              </div> */}
              <div>
                <label htmlFor="destination" className="opacity-70 block">
                  <div className="w-full flex justify-between items-center">
                    <p>Giá tối đa</p>
                    <p className="font-bold text-xl">{priceValue} VNĐ</p>
                  </div>
                </label>
                <div className=" bg-gray-100 rounded-full p-2 flex items-center justify-center ">
                  <input
                    type="range"
                    className="appearance-none w-full bg-gradient-to-r from-primary to-secondary h-2 rounded-full my-2"
                    min="0"
                    max="5000000"
                    value={priceValue}
                    step="100000"
                    onChange={(e) => setPriceValue(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleSearchClick} className="bg-gradient-to-r from-primary to-secondary text-white hover:scale-105 px-4 py-2 rounded-full duration-200 absolute -bottom-5 left-1/2 -translate-x-1/2">
              Tìm kiếm ngay
            </button>
          </div>
  )
}

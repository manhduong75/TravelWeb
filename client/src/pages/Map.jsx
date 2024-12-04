import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { ChevronLeft, ChevronRight, MapPin, Navigation, Search, X } from 'lucide-react';
import polyline from '@mapbox/polyline';
import { ImLocation2 } from "react-icons/im";
import { renderToString } from "react-dom/server"; 
import { 
  FaCar, 
  FaTruck, 
  FaMotorcycle, 
  FaBicycle, 
  FaWalking 
} from 'react-icons/fa';

const Map = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const routeLayerRef = useRef(null);
  const startMarkerRef = useRef(null);
  const endMarkerRef = useRef(null);
  const [startPoint, setStartPoint] = useState('');
  const [endPoint, setEndPoint] = useState('');
  const [profile, setProfile] = useState('car');
  const [routeInfo, setRouteInfo] = useState(null);
  const contextMenuRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const profiles = [
    { value: 'car', label: 'Xe hơi', icon: FaCar },
    { value: 'truck', label: 'Xe tải', icon: FaTruck },
    { value: 'motorcycle', label: 'Xe máy', icon: FaMotorcycle },
    { value: 'bike', label: 'Xe đạp', icon: FaBicycle },
    { value: 'foot', label: 'Đi bộ', icon: FaWalking },
  ];

  const fetchRoute = async () => {
    if (!startPoint?.coords || !endPoint?.coords) return;
  
    try {
      // Gọi API tìm tuyến đường trực tiếp bằng tọa độ
      const routeResponse = await axios.get(`https://tmdt.fimo.edu.vn/route`, {
        params: {
          point: [startPoint.coords, endPoint.coords],
          profile: profile,
        },
        paramsSerializer: (params) => {
          return `point=${params.point[0]}&point=${params.point[1]}&profile=${params.profile}`;
        },
      });
  
      if (routeResponse.data && routeResponse.data.paths[0]) {
        const path = routeResponse.data.paths[0];
        const coordinates = polyline.decode(path.points).map((coord) => [
          coord[0],
          coord[1],
        ]);
  
        if (routeLayerRef.current) {
          mapInstanceRef.current.removeLayer(routeLayerRef.current);
        }
  
        routeLayerRef.current = L.polyline(coordinates, {
          color: "#0F53FF",
          weight: 6,
          opacity: 0.7,
        }).addTo(mapInstanceRef.current);
  
        mapInstanceRef.current.fitBounds(routeLayerRef.current.getBounds(), {
          padding: [50, 50],
        });
  
        setRouteInfo({
          distance: (path.distance / 1000).toFixed(2),
          time: Math.round(path.time / (1000 * 60)),
        });
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };
  
  

  const setMarker = async (latlng, isStart) => {
    const { lat, lng } = latlng;
  
    try {
      const response = await axios.get(`https://tmdt.fimo.edu.vn/nominatim/reverse`, {
        params: {
          lat: lat,
          lon: lng,
          format: 'json',
        },
      });
  
      const address = response.data?.display_name || "Không tìm thấy địa chỉ";
  
      // Tạo HTML icon từ React Icon
      const iconHtml = renderToString(
        <ImLocation2
          className={`w-8 h-8 ${
            isStart ? "text-green-500" : "text-red-500"
          }`}
        />
      );
  
      if (isStart) {
        if (startMarkerRef.current) {
          mapInstanceRef.current.removeLayer(startMarkerRef.current);
        }
        startMarkerRef.current = L.marker([lat, lng], {
          icon: L.divIcon({
            html: iconHtml,
            className: "custom-div-icon",
          }),
        }).addTo(mapInstanceRef.current);
  
        setStartPoint({ coords: `${lat},${lng}`, address });
      } else {
        if (endMarkerRef.current) {
          mapInstanceRef.current.removeLayer(endMarkerRef.current);
        }
        endMarkerRef.current = L.marker([lat, lng], {
          icon: L.divIcon({
            html: iconHtml,
            className: "custom-div-icon",
          }),
        }).addTo(mapInstanceRef.current);
  
        setEndPoint({ coords: `${lat},${lng}`, address });
      }
    } catch (error) {
      console.error("Error fetching reverse geocoding:", error);
    }
  };
  


  const geocode = async (query, isStart) => {
    try {
      const response = await axios.get(`https://tmdt.fimo.edu.vn/nominatim/search`, {
        params: {
          q: query,
          format: 'json',
        },
      });

      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setMarker({ lat, lng: lon }, isStart);
      }
    } catch (error) {
      console.error('Error fetching geocode:', error);
    }
  };

  useEffect(() => {
    if (mapInstanceRef.current) return;

    const map = L.map(mapRef.current).setView([21.02014554822514, 105.784259312448], 13);
    mapInstanceRef.current = map;
    // https://tmdt.fimo.edu.vn/hot/{z}/{x}/{y}.png
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    contextMenuRef.current = L.popup({
      className: 'custom-popup',
      closeButton: false,
    });

    map.on('contextmenu', (e) => {
      const container = document.createElement('div');
      container.className = 'flex flex-col gap-2 p-2';
      const startIconHtml = renderToString(
        <ImLocation2 className="w-5 h-5 text-green-500" />
      );
      
      const endIconHtml = renderToString(
        <ImLocation2 className="w-5 h-5 text-red-500" />
      );

      const startBtn = document.createElement('button');
      startBtn.className = 'px-1 py-1 text-sm text-black rounded hover:bg-gray-200 flex items-center gap-1';
      startBtn.innerHTML = `<span class="flex items-center gap-2">
                              ${startIconHtml}
                              Chọn điểm bắt đầu
                            </span>`;

      const endBtn = document.createElement('button');
      endBtn.className = 'px-1 py-1 text-sm text-black rounded hover:bg-gray-200 flex items-center gap-1';
      endBtn.innerHTML = `<span class="flex items-center gap-2">
                            ${endIconHtml}
                            Chọn điểm kết thúc
                          </span>`;
      startBtn.onclick = () => {
        setMarker(e.latlng, true);
        map.closePopup();
      };

      endBtn.onclick = () => {
        setMarker(e.latlng, false);
        map.closePopup();
      };

      container.appendChild(startBtn);
      container.appendChild(endBtn);

      contextMenuRef.current
        .setLatLng(e.latlng)
        .setContent(container)
        .openOn(map);
    });

    map.on('click', () => {
      if (contextMenuRef.current.isOpen()) {
        map.closePopup();
      }
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.invalidateSize();
    }
  }, [isSidebarOpen]);

  const clearRoute = () => {
    setStartPoint('');
    setEndPoint('');
    setRouteInfo(null);
    
    if (routeLayerRef.current) {
      mapInstanceRef.current.removeLayer(routeLayerRef.current);
      routeLayerRef.current = null;
    }
    
    if (startMarkerRef.current) {
      mapInstanceRef.current.removeLayer(startMarkerRef.current);
      startMarkerRef.current = null;
    }
    
    if (endMarkerRef.current) {
      mapInstanceRef.current.removeLayer(endMarkerRef.current);
      endMarkerRef.current = null;
    }
  };

  return (
    <div className="flex h-screen relative">
      {/* Sidebar */}
      <div 
        className={`relative px-2 bg-white shadow-lg transition-all duration-500 ease-in-out z-10 ${
          isSidebarOpen ? 'w-100' : 'w-0'
        }`}
      >
        {/* Toggle button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-1/2 -right-8 transform -translate-y-1/2 bg-white p-1 rounded-r shadow-md z-20"
        >
          {isSidebarOpen ? <ChevronLeft size={25}/> : <ChevronRight size={25}/>}
        </button>

        {isSidebarOpen && (
          <div className="p-2 h-full overflow-auto m-2">
            <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
              <Search className="w-7 h-7" />
              Tìm kiếm trên Map
            </h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Navigation className="w-4 h-4 text-green-500" />
                  Điểm bắt đầu
                </label>
                <div className="relative">
                <input
                  placeholder="Chọn điểm bắt đầu"
                  value={startPoint?.address || ''}
                  onChange={(e) => setStartPoint({ ...startPoint, address: e.target.value })}
                  onBlur={() => geocode(startPoint.address, true)}
                  className="p-2 pl-6 border rounded w-full"
                />
                  {startPoint && (
                    <button
                      onClick={() => setStartPoint('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <MapPin className="w-4 h-4 text-red-500" />
                  Chọn điểm đến
                </label>
                <div className="relative">
                <input
                  placeholder="Chọn điểm đến"
                  value={endPoint?.address || ''}
                  onChange={(e) => setEndPoint({ ...endPoint, address: e.target.value })}
                  onBlur={() => geocode(endPoint.address, false)}
                  className="p-2 pl-6 border rounded w-full"
                />
                  {endPoint && (
                    <button
                      onClick={() => setEndPoint('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Phương tiện di chuyển</label>
                <div className="relative">
                  <select
                    value={profile}
                    onChange={(e) => setProfile(e.target.value)}
                    className="p-2 pl-10 border rounded w-full appearance-none"
                  >
                    {profiles.map((p) => (
                      <option key={p.value} value={p.value} className="flex items-center">
                        {p.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    {profiles.find(p => p.value === profile)?.icon({ size: 20, className: "text-gray-600" })}
                  </div>
                </div>
              </div>

              {routeInfo && (
                <div className="p-2 bg-gray-100 rounded-lg">
                  <h3 className="font-medium mb-2">Thông tin tuyến đường</h3>
                  <div className="text-sm space-y-1">
                    <div className="flex items-center justify-between">
                      <span>Khoảng cách:</span>
                      <span className="font-medium">{routeInfo.distance} km</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Thời gian ước tính:</span>
                      <span className="font-medium">{routeInfo.time} phút</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <button
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center gap-2"
                  onClick={fetchRoute}
                >
                  <Search className="w-4 h-4" />
                  Tìm đường đi
                </button>

                <button
                  className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center justify-center gap-2"
                  onClick={clearRoute}
                >
                  <X className="w-4 h-4" />
                  Xóa tuyến đường
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Map */}
      <div ref={mapRef} className="flex-1 z-0" />
    </div>
  );
};

export default Map;
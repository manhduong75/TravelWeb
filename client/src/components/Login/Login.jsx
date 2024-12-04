import { useState, useContext } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate} from "react-router-dom";
import { signIn } from "../../apis/userService";
import { useAuth } from '../../hooks/AuthContext';
import { ToastContext } from "../../contexts/ToastProvider";

// import { toast } from "react-toastify";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const { toast } = useContext(ToastContext);
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn({ userName, password });
      if(response.status === 200)
        {   
            const { token, userName, roles } = response.data.data;
            localStorage.setItem('Username', userName);
            localStorage.setItem('Role', roles[0]);
            authLogin(token);
            toast.success("Đăng nhập thành công!");
            setTimeout(() => {
              navigate('/');
            }, 3000); 
          }
      
    } catch (error) {
      toast.error("Đăng nhập thất bại. Kiểm tra lại tài khoản hoặc mật khẩu!");
    }
  };

  return (
    <div className="h-screen flex justify-center ">
      <div
        className="hidden lg:flex w-full lg:w-1/2 bg-cover bg-[url('https://cdn.pixabay.com/photo/2021/08/01/12/58/beach-6514331_640.jpg')]
         justify-around items-center "
      >
        <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
          <h1 className="text-[#38baea] font-bold text-4xl font-sans">Travel App</h1>
          <p className="text-white mt-1">Chào mừng bạn đến với chúng tôi!!!</p>
          <div className="flex justify-center lg:justify-start mt-6">
            <Link
              to="/"
              className="hover:bg-[#0072bc] hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-[#0072bc] mt-4 px-4 py-2 rounded-2xl font-bold mb-2"
            >
              Về trang chủ
            </Link>
          </div>
        </div>
      </div>
      <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
        <div className="w-full px-8 md:px-32 lg:px-24">
          <form
            className="bg-white rounded-md shadow-2xl p-5"
            onSubmit={handleSubmit}
          >
            <h1 className="text-gray-800 font-bold text-2xl mb-1 text-center">
              Đăng nhập
            </h1>
            <p className="text-sm font-normal text-gray-600 mb-8 text-center">
              Hãy đăng nhập bằng tài khoản của bạn!
            </p>
            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl outline-none ring-blue-500 border-blue-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <input
                id="name"
                className=" pl-2 w-full outline-none border-none "
                type="name"
                name="name"
                autoComplete="name"
                required
                placeholder="Tài khoản"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="flex items-center border-2 mb-4 py-2 px-3 relative rounded-2xl outline-none ring-blue-500 border-blue-300 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="pl-2 w-full outline-none border-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                type={visible ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                required
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {visible ? (
                <AiOutlineEye
                  className="absolute right-2 top-2 cursor-pointer"
                  size={25}
                  onClick={() => setVisible(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute right-2 top-2 cursor-pointer"
                  size={25}
                  onClick={() => setVisible(true)}
                />
              )}
            </div>
            <div className={`items-center justify-between `}>
              <div className={`items-center flex ml-1`}>
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded "
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Ghi nhớ
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="block w-full hover:bg-[#38baea] mt-5 py-2 rounded-2xl bg-[#0072bc] hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
            >
              Đăng nhập
            </button>
            <div className="flex justify-between mt-4">
              <Link
                to="/sign-up"
                className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
              >
                Bạn chưa có tài khoản? Đăng ký ngay
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

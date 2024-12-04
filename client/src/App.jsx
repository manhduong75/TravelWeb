import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import NoPage from "./pages/NoPage";
import PlacesRoute from "./pages/PlacesRoute";
import About from "./pages/About";
import BlogsDetails from "./pages/BlogsDetails";
import AOS from "aos";
import "aos/dist/aos.css";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Map from "./pages/Map";
import OrderTour from "./pages/OrderTour";
import { AuthProvider } from "./hooks/AuthContext";
import { ToastProvider } from "./contexts/ToastProvider";
import { AfterBooked } from "./pages/AfterBooked";

const App = () => {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 900,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);
  return (
    <>
     <AuthProvider> 
      <ToastProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="blogs" element={<Blogs />} />
                <Route path="blogs/:id" element={<BlogsDetails />} />
                <Route path="best-places" element={<PlacesRoute />} />
                <Route path="tour/:id" element={<OrderTour />} />
                <Route path="about" element={<About />} />
                <Route path="thank-you" element={<AfterBooked />} />
                <Route path="*" element={<NoPage />} />
              </Route>
              <Route path="map" element={<Map />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="sign-up" element={<SignupPage />} />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
     
    </>
  );
};

export default App;

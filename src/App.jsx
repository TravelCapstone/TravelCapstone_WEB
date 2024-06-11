import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { StateProvider } from "./context/StateProvider";
import Routers from "./routes/Routers";
import { ToastContainer } from "react-toastify";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";

import AOS from "aos";
import { AuthProvider } from "./context/AuthContext";
import { useEffect } from "react";
AOS.init({
  duration: 1000,
});
import moment from "moment-timezone";

// Đặt múi giờ thành GMT+7 (Việt Nam)
moment.tz.setDefault("Asia/Ho_Chi_Minh");
function App() {
  useEffect(() => {
    const handleScroll = () => {
      const menuItems = document.querySelectorAll(".menuItem");
      if (window.scrollY >= 50) {
        menuItems.forEach((item) => {
          item.classList.add("hover-white");
          item.classList.remove("hover-black");
        });
      } else {
        menuItems.forEach((item) => {
          item.classList.add("hover-black");
          item.classList.remove("hover-white");
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StateProvider>
            <BrowserRouter>
              <AuthProvider>
                <Routers />
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
                {/* Same as */}
                <ToastContainer />
              </AuthProvider>
            </BrowserRouter>
          </StateProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;

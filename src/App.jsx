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
AOS.init({
  duration: 1000,
});

function App() {
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

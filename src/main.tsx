import { Suspense } from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// // static import
import App from "./App.tsx";
import Loader from "./components/loader/Loader.tsx";
import Store from "./store/index.ts";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={Store}>
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <App />
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
          theme="colored"
        />
      </BrowserRouter>
    </Suspense>
  </Provider>
);

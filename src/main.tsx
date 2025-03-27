// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { Toaster } from "sonner";
import { BrowserRouter } from "react-router-dom";
import { RegisterProvider } from "./context/RegisterContext.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RegisterProvider>
      <BrowserRouter>
        <App />
        <Toaster
          position="top-right"
          richColors
          expand={false}
          duration={1500}
        />
      </BrowserRouter>
    </RegisterProvider>
  </Provider>
);

import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <div>
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        success: {
          style: {
            background: "white",
            color: "green",
          },
        },
        error: {
          style: {
            background: "white",
            color: "red",
          },
        },
      }}
    />
    <App />
  </div>,
);

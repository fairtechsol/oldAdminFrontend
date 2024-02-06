import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/index.tsx";
import { Provider } from "react-redux";
import store from "./store/store.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </ThemeProvider>
);

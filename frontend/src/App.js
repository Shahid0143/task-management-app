import logo from "./logo.svg";
import "./App.css";
import MainRoutes from "./pages/MainRoutes";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <MainRoutes />
    </div>
  );
}

export default App;

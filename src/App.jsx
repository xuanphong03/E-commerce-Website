import { Route, Routes } from "react-router-dom";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </>
  );
}

export default App;

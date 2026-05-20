import { Routes, Route } from "react-router-dom";
import {
  Navbar,
  Homepage,
  Exchanges,
  Currencies,
  CryptoDetails,
  News,
} from "./components";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/exchanges" element={<Exchanges />} />
          <Route path="/currencies" element={<Currencies />} />
          <Route path="/currency/:coinId" element={<CryptoDetails />} />
          <Route path="/news" element={<News />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;

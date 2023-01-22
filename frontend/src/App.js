import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import MyNotes from "./pages/MyNotes/MyNotes";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import CreatePage from "./pages/CreatePage/CreatePage";
import UpdatePage from "./pages/UpdatePage/UpdatePage";
import { useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <Routes>
        <Route path="/" exact element={<LandingPage />} />
        <Route path="/mynotes" element={<MyNotes search={search} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<UpdatePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

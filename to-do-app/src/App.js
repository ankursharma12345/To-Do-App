import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./MainLayout";
import Login from "./Modules/Login";
import SignupPage from "./Modules/SignupPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/To-Do-App" element={<SignupPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/todo" element={<MainLayout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

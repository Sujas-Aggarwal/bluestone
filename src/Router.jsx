import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TermsConditions from "./pages/TermsConditions";
import Home from "./pages/Home";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/policy" element={<TermsConditions />} />
        <Route path="/dashboard" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

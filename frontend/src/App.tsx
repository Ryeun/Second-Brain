import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import Signin from "./pages/signin";
import SharePage from "./pages/sharepage";

export default function App() {
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<Signup/>}/>
    <Route path="/signin" element={<Signin/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/share/:sharelink" element={<SharePage/>}/>
  </Routes>
  </BrowserRouter>
}

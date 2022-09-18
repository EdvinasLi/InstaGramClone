import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/regular/homepage";
import AdminDashboard from "./pages/admin/dashboard";
import Firstview from "./pages/regular/firstview";
import Header from "./components/header/header";


function App() {
 
  return (
    <BrowserRouter>
 
      <Header />
      
        <div className="container">
          
          <Routes>
          <Route path="/" element={<Firstview />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="admin">
              <Route index element={<AdminDashboard />} />
              <Route path="new" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </div>
     
    </BrowserRouter>
  );
}

export default App;

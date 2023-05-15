import { Routes, Route } from "react-router-dom";
import Test from "./pages/test";
import Login from "./pages/Login";

function Router() {
  return (
    //Providers

    <div className="flex min-h-screen w-full">
      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default Router;

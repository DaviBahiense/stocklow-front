import "./assets/css/style.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./pages/Header";
import Home from "./pages/Home";
import NewOrder from "./pages/NewOrder";
import NewProduct from "./pages/NewProduct";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={"/login"} element={<SignIn />} />
          <Route path={"/cadastro"} element={<SignUp />} />
          <Route path={"/"} element={<Home />}>
            <Route path={"/pedido"} element={<NewOrder />} />
            <Route path={"/adicionar"} element={<NewProduct />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

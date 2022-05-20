import { useNavigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../services/api";
import useAuth from "../hooks/useAuth";
import "../assets/css/home.css";
import ReactDOM from "react-dom/client";

export default function Home(params) {
  const { token, signOut } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    handleLoadPage();
  }, [token]);

  async function handleLoadPage() {
    try {
      /*       const responseUser = await api.getData(token);
       */
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      alert("Erro!");
    }
  }
  if (isLoading) {
    return <h1>Carregando...</h1>;
  }
  function handleSignOut() {
    navigate("/login");
    signOut();
  }

  function firstTab(e) {
    document.querySelectorAll(".switch").forEach((i) => {
      i.classList.remove("activeTab");
    });

    e.target.classList.add("activeTab");
    setShow(true);
    navigate("/pedido");

    e.preventDefault();
  }

  function secondTab(e) {
    document.querySelectorAll(".switch").forEach((i) => {
      i.classList.remove("activeTab");
    });

    e.target.classList.add("activeTab");

    setShow(false);
    navigate("/adicionar");

    e.preventDefault();
  }

  return (
    <div class="wrapper">
      <ul class="tabs group">
        <li onClick={firstTab}>
          <a class="tabOne switch activeTab">Criar Pedido</a>
        </li>
        <li onClick={secondTab}>
          <a class="tabTwo switch">Adicionar Produto</a>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}

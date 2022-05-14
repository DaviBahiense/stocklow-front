import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../services/api";
import useAuth from "../hooks/useAuth";

export default function Home(params) {
  const { token, signOut } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    handleLoadPage();
  }, []);

  async function handleLoadPage() {
    try {
      const responseUser = await api.getData(token);

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

  return <></>;
}

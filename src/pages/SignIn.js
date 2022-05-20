import { Box, Button, Link, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import api from "../services/api";
import Form from "../components/Form";
import Toast from "../components/Toast";
import { ToastContainer } from "react-toastify";
import useAuth from "../hooks/useAuth";

const styles = {
  container: {
    width: "460px",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
  input: {
    marginBottom: "16px",

    backgroundColor: "white",
  },
  actionsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

export default function SignIn(params) {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData?.name || !formData?.password) {
      Toast("error", "Todos os campos devem ser preenchidos.");
      return;
    }

    try {
      const {
        data: { token },
      } = await api.signIn(formData);
      signIn(token);
      navigate("/pedido");
    } catch (error) {
      if (error.response) {
        Toast("error", error.response.data);
        return;
      }
      Toast("error", "Erro, tente novamente.");
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Typography color={"#A6B0CF"} fontSize={"30px"} marginBottom={"30px"}>
        Entre e Stock!
      </Typography>
      <Box sx={styles.container}>
        <TextField
          name="name"
          sx={styles.input}
          label="Nome da Empresa"
          type="text"
          variant="outlined"
          onChange={handleInputChange}
          value={formData.name}
        />
        <TextField
          name="password"
          type={"password"}
          sx={styles.input}
          label="Senha"
          onChange={handleInputChange}
          value={formData.password}
        />

        <Box sx={styles.actionsContainer}>
          <Link component={RouterLink} to="/cadastro">
            <Typography>Não possuo cadastro</Typography>
          </Link>
          <Button variant="contained" type="submit">
            Entrar
          </Button>
        </Box>
      </Box>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Form>
  );
}

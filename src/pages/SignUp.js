import { Box, Button, Link, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import api from "../services/api";
import Form from "../components/Form";
import Toast from "../components/Toast";
import { ToastContainer } from "react-toastify";

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

export default function SignUp(params) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    password: "",
    passwordConfirmation: "",
  });

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData?.name ||
      !formData?.password ||
      !formData?.passwordConfirmation
    ) {
      Toast("error", "Todos os campos devem ser preenchidos.");
      return;
    }

    if (formData.password !== formData.passwordConfirmation) {
      Toast("error", "As senhas devem ser iguais!");
      return;
    }

    try {
      await api.signUp(formData.name, formData.password);
      Toast("success", "Cadastro efetuado com sucesso!").then(setTimeout(5000));

      navigate("/login");
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
        Novo por aqui?
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
        <TextField
          name="passwordConfirmation"
          type={"password"}
          sx={styles.input}
          label="Confrme sua senha"
          onChange={handleInputChange}
          value={formData.passwordConfirmation}
        />
        <Box sx={styles.actionsContainer}>
          <Link component={RouterLink} to="/login">
            <Typography>Já possuo cadastro</Typography>
          </Link>
          <Button variant="contained" type="submit">
            Cadastrar
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

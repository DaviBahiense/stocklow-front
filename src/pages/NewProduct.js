import "../assets/css/home.css";
import {
  Box,
  Button,
  Divider,
  TextField,
  Autocomplete,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import Form from "../components/Form";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function List() {
  const [formData, setFormData] = useState({
    category: "",
    product: "",
    unity: "",
  });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  function handleSubmit() {}
  const styles = {
    container: {
      width: "697px",
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
    },
    title: { marginBottom: "30px" },

    input: { marginBottom: "16px" },
    actionsContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    typo: {
      width: "100%",
      color: "#72655F",
      textAlign: "center",
      fontSize: "25px",
      fontFamily: "'PT Sans', sans-serif",
    },
  };
  const list = [
    { category: "verdura" },
    { category: "fruta" },
    { category: "outros" },
  ];

  function handleAutoInput(name, value) {
    setFormData({ ...formData, [name]: value });
  }
  function handleInput(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  return (
    <div class="content">
      <Typography sx={styles.typo}>Inserir novo produto</Typography>
      <Form onSubmit={handleSubmit}>
        <Box sx={styles.container}>
          <Autocomplete
            className="category"
            sx={styles.input}
            autoComplete={true}
            options={list.map((e) => e.category)}
            isOptionEqualToValue={(option, value) => option === value}
            renderInput={(e) => (
              <TextField {...e} label="Categoria" size="medium" />
            )}
            onInputChange={(e, value) => handleAutoInput("category", value)}
          />
          <TextField
            name="product"
            sx={styles.input}
            label="Nome do Produto"
            type="text"
            variant="outlined"
            onChange={handleInput}
            value={formData.product}
          />
          <TextField
            name="unity"
            sx={styles.input}
            label="Unidade do produto Ex: Kg, Unidade, caixa..."
            type="text"
            variant="outlined"
            onChange={handleInput}
            value={formData.unity}
          />
        </Box>
        <Box sx={styles.actionsContainer}>
          <Button
            variant="contained"
            type="submit"
            sx={{ width: "697px", height: "46px", backgroundColor: "#a6a0ce" }}
            endIcon={<SendIcon />}
            onClick={() => navigate("/listar")}
          >
            {loading ? "Carregando" : "Enviar"}
          </Button>
        </Box>
      </Form>
    </div>
  );
}

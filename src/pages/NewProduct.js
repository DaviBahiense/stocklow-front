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
import Toast from "../components/Toast";
import { ToastContainer } from "react-toastify";
import Form from "../components/Form";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import useAuth from "../hooks/useAuth";

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

export default function List() {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    categoryId: "",
    product: "",
    unity: "",
  });
  const [categories, setCategories] = useState([{ category: "" }]);

  useEffect(() => {
    async function loadPage() {
      const data = await api.getCategories();
      setCategories(data.data);
    }
    loadPage();
  }, []);

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.categoryId || !formData.product || !formData.unity) {
      Toast("error", "Todos os campos são obrigatórios!");
      return;
    }

    try {
      await api.createProduct(formData, token);
      Toast("success", "Produto inserido no banco de dados");
    } catch (error) {
      Toast("error", "Ocorreu algum erro no servidor...");
    }
  }

  function handleAutoInput(value) {
    const { id } = categories.find((e) => e.category === value);

    setFormData({ ...formData, categoryId: id });
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
            options={categories.map((e) => e.category)}
            isOptionEqualToValue={(option, value) => option === value}
            renderInput={(e) => (
              <TextField {...e} label="Categoria" size="medium" />
            )}
            onInputChange={(e, value) => handleAutoInput(value)}
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
          >
            {loading ? "Carregando" : "Enviar"}
          </Button>
        </Box>
      </Form>
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
    </div>
  );
}

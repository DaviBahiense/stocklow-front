import "../assets/css/home.css";
import "../assets/css/home.css";
import {
  Box,
  Button,
  TextField,
  Autocomplete,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Form from "../components/Form";
import React, { useEffect, useState, useReducer } from "react";

import api from "../services/api";
import useAuth from "../hooks/useAuth";
import Category from "../components/Category";

const styles = {
  boxInput: {
    width: "700px",
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
  },
  title: { marginBottom: "30px" },

  input: { marginBottom: "16px", width: "630px" },
  actionsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  typo: {
    width: "100%",
    color: "#72655F",
    textAlign: "start",
    fontSize: "25px",
    fontFamily: "'PT Sans', sans-serif",
    marginBottom: "16px",
  },
  boxCategory: {
    width: "700px",
    marginTop: "30px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    padding: "0px",
    width: "40px",
    height: "50px",
    backgroundColor: "#a6a0ce",
  },
};

export default function NewOrder() {
  const { token } = useAuth();

  const [productsByCategory, setProductsByCategory] = useState([
    {
      category: "",
      product: [{ product: "", unity: "", quantity: "" }],
    },
  ]);

  /*   const [selectedProductByCategory, setSelectedProductByCategory] = useState([
    {
      category: "",
      product: [],
    },
  ]); */

  const [loadingSending, setLoadingSending] = useState(false);

  useEffect(() => {
    async function loadPage() {
      const result = await api.getProducts(token);

      result.data.forEach((category) => (category.selectedProducts = []));
      setProductsByCategory(result.data);
    }
    loadPage();
  }, []);

  if (productsByCategory.category === "") {
    return <h1>Carregando...</h1>;
  }

  function handleSubmit() {}

  return (
    <div className="content">
      <Form onSubmit={handleSubmit}>
        {productsByCategory.map((category, index) => (
          <Category
            key={index}
            category={category}
            categoryIndex={index}
            setProductsByCategory={setProductsByCategory}
            productsByCategory={productsByCategory}
          />
        ))}

        <Box sx={styles.actionsContainer}>
          <Button
            variant="contained"
            type="submit"
            sx={{ width: "697px", height: "46px", backgroundColor: "#a6a0ce" }}
            endIcon={<SendIcon />}
          >
            {loadingSending ? "Carregando" : "Enviar"}
          </Button>
        </Box>
      </Form>
    </div>
  );
}

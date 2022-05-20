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
import AddIcon from "@mui/icons-material/Add";
import Form from "../components/Form";
import React, { useEffect, useState } from "react";

import api from "../services/api";
import useAuth from "../hooks/useAuth";

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
  const [products, setProducts] = useState({
    category: "",
    product: [{ product: "", unity: "", quantity: "" }],
  });
  const [formData, setFormData] = useState({
    category: "",
    product: "",
    quantity: "",
    unity: "",
  });
  const [loading, setLoading] = useState(false);
  const [newInput, setNewInput] = useState([{ input: "" }]);

  useEffect(() => {
    async function loadPage() {
      const data = await api.getProducts(token);

      setProducts(data.data);
    }
    loadPage();
  }, []);

  if (products.category === "") {
    return <h1>Carregando...</h1>;
  }

  function handleSubmit() {}
  let listar = {};

  function handleAutoInput(value, listProduct) {
    const { unity } = listProduct.product.find((e) => e.product === value);

    setFormData({
      ...formData,
      ["product"]: value,
      ["category"]: listProduct.category,
      ["unity"]: unity,
    });
  }
  console.log(formData);
  function handleInput(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function addInput() {
    setNewInput([...newInput, { input: "" }]);
  }

  return (
    <div class="content">
      <Form onSubmit={handleSubmit}>
        {products.map((listProduct, index) => (
          <>
            <Box sx={styles.boxCategory} key={index}>
              <Typography sx={styles.typo}>{listProduct.category}</Typography>
              <Button
                variant="contained"
                sx={styles.button}
                endIcon={<AddIcon />}
                onClick={addInput}
              />
            </Box>
            {newInput.map((e, index) => (
              <Box key={index} sx={styles.boxInput}>
                <Autocomplete
                  className="product"
                  sx={styles.input}
                  autoComplete={true}
                  options={listProduct.product.map((e) => e.product)}
                  isOptionEqualToValue={(option, value) => option === value}
                  renderInput={(e) => (
                    <TextField {...e} label="Produto" size="medium" />
                  )}
                  onInputChange={(e, value) =>
                    handleAutoInput(value, listProduct)
                  }
                />
                <TextField
                  name="quantity"
                  sx={(styles.input, { width: "80px" })}
                  label={listProduct.product[0].unity} //
                  type="number"
                  variant="outlined"
                  onChange={handleInput}
                  value={formData.quantity}
                />
              </Box>
            ))}
          </>
        ))}

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
    </div>
  );
}

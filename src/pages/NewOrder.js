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
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { width } from "@mui/system";

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
const list = [
  { category: "verdura" },
  { category: "fruta" },
  { category: "outros" },
  { category: "joj" },
];

export default function NewOrder() {
  const [formData, setFormData] = useState({
    category: "",
    product: "",
    quantity: "",
    unity: "",
  });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [newInput, setNewInput] = useState([{ input: "" }]);

  function handleSubmit() {}
  let listar = {};

  function handleAutoInput(name, value, listCategory) {
    setFormData([
      ...formData,
      { product: value, category: listCategory, unity: 1 },
    ]);
  }

  function addInput() {
    setNewInput([...newInput, { input: "" }]);
  }

  return (
    <div class="content">
      <Form onSubmit={handleSubmit}>
        {list.map((listCategory, index) => (
          <>
            <Box sx={styles.boxCategory} key={index}>
              <Typography sx={styles.typo}>{listCategory.category}</Typography>
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
                  options={list.map((e) => e.category)}
                  isOptionEqualToValue={(option, value) => option === value}
                  renderInput={(e) => (
                    <TextField {...e} label="Produto" size="medium" />
                  )}
                  onInputChange={(e, value) =>
                    handleAutoInput("product", value, listCategory.category)
                  }
                />
                <Autocomplete
                  className="untiy"
                  sx={(styles.input, { width: "80px" })}
                  autoComplete={true}
                  options={list.map((e) => e.category)}
                  renderInput={(e) => (
                    <TextField {...e} label="unid" size="medium" />
                  )}
                  onInputChange={(e, value) => handleAutoInput("untiy", value)}
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
            onClick={() => navigate("/pedido")}
          >
            {loading ? "Carregando" : "Enviar"}
          </Button>
        </Box>
      </Form>
    </div>
  );
}

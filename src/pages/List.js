import "../assets/css/home.css";
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

export default function List() {
  const [formData, setFormData] = useState({
    category: "",
    product: "",
    unity: "",
  });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [section, setSection] = useState([{ category: "" }]);
  const [newInput, setNewInput] = useState([{ input: "" }]);

  useEffect(() => {
    setSection(list);
  }, []);

  function handleSubmit() {}

  function handleAutoInput(name, value) {
    setFormData({ ...formData, [name]: value });
  }

  function handleAddInput(params) {
    setNewInput([...newInput, { input: "" }]);
  }

  return (
    <div class="content">
      <Form onSubmit={handleSubmit}>
        <Box sx={styles.boxCategory}>
          <Typography sx={styles.typo}>Verduras</Typography>
          <Button
            variant="contained"
            sx={styles.button}
            endIcon={<AddIcon />}
            onClick={handleAddInput}
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
              onInputChange={(e, value) => handleAutoInput("product", value)}
            />
            <Autocomplete
              className="untiy"
              sx={(styles.input, { width: "80px" })}
              autoComplete={true}
              options={list.map((e) => e.category)}
              isOptionEqualToValue={(option, value) => option === value}
              renderInput={(e) => (
                <TextField {...e} label="unid" size="medium" />
              )}
              onInputChange={(e, value) => handleAutoInput("untiy", value)}
            />
          </Box>
        ))}

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

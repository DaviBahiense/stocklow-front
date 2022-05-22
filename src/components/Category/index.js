import {
  Box,
  Button,
  TextField,
  Autocomplete,
  Typography,
} from "@mui/material";
import Products from "../Products";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

const styles = {
  boxInput: {
    width: "700px",
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
  },
  typography: {
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

export default function Category({
  categoryIndex,
  category,
  setProductsByCategory,
  productsByCategory,
}) {
  /*   const [categoryData, setCategoryData] = useState([
    {
      category: "",
      product: [{ product: "", unity: "", quantity: "" }],
    },
  ]); */

  function addInput() {
    productsByCategory[categoryIndex].selectedProducts.push({
      ["category"]: "",
      ["product"]: "",
      ["quantity"]: "",
      ["unity"]: "",
    });
    setProductsByCategory([...productsByCategory]);
  }

  /* function func(childIndex, selectedProduct) {
    productsByCategory[index].selectedProducts[childIndex];
  } */

  return (
    <>
      <Box sx={styles.boxCategory} key={categoryIndex}>
        <Typography sx={styles.typography}>{category.category}</Typography>
        <Button
          variant="contained"
          sx={styles.button}
          endIcon={<AddIcon />}
          onClick={() => {
            addInput(category.category);
          }}
        />
      </Box>
      {category.selectedProducts?.map((product, index) => (
        <Box key={index} sx={styles.boxInput}>
          <Products
            productIndex={index}
            product={product}
            productsByCategory={productsByCategory}
            setProductsByCategory={setProductsByCategory}
            categoryIndex={categoryIndex}
          />
        </Box>
      ))}
    </>
  );
}

import {
  Box,
  Button,
  TextField,
  Autocomplete,
  Typography,
} from "@mui/material";
import Amount from "../Amount";
import React, { useState } from "react";

const styles = {
  input: { marginBottom: "16px", width: "630px" },
};

export default function Products({
  productIndex,
  product,
  productsByCategory,
  setProductsByCategory,
  categoryIndex,
}) {
  const [value, setValue] = useState("");

  function handleAutoInput(category, value, productIndex) {
    if (value) {
      productsByCategory[categoryIndex].selectedProducts[productIndex] = {
        product: value,
        quantity: "",
        unity: productsByCategory[categoryIndex]?.product?.find(
          (p) => p.product === value
        )?.unity,
      };

      setProductsByCategory([...productsByCategory]);
    }
  }

  function handleInput(event) {
    productsByCategory[categoryIndex].selectedProducts[productIndex].quantity =
      event.target.value;

    setProductsByCategory([...productsByCategory]);
  }
  console.log(productsByCategory);
  return (
    <>
      <Autocomplete
        key={productIndex}
        className="product"
        sx={styles.input}
        autoComplete={true}
        options={productsByCategory[categoryIndex].product.map(
          (e, index) => e.product
        )}
        isOptionEqualToValue={(option, value) => option === value}
        renderInput={(e) => <TextField {...e} label="Produto" size="medium" />}
        onInputChange={(e, value) => {
          handleAutoInput(
            productsByCategory[categoryIndex].product,
            value,
            productIndex
          );
          setValue(value);
        }}
      />
      <Amount
        productIndex={productIndex}
        product={product}
        handleInput={handleInput}
        productsByCategory={productsByCategory}
        setProductsByCategory={setProductsByCategory}
        categoryIndex={categoryIndex}
      />
    </>
  );
}

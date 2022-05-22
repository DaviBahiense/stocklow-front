import {
  Box,
  Button,
  TextField,
  Autocomplete,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const styles = {
  input: { marginBottom: "16px", width: "630px" },
};

export default function Amount({
  productIndex,
  productsByCategory,
  handleInput,
  categoryIndex,
}) {
  return (
    <TextField
      name="quantity"
      sx={(styles.input, { width: "80px" })}
      label={
        productsByCategory[categoryIndex]?.product?.find(
          (p) =>
            p.product ===
            productsByCategory[categoryIndex].selectedProducts[productIndex]
              ?.product
        )?.unity
      }
      type="number"
      variant="outlined"
      onChange={(e, value) => {
        handleInput(e);
      }}
      value={
        productsByCategory[categoryIndex].selectedProducts[productIndex]
          .quantity
      }
    />
  );
}

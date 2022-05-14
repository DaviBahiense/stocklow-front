import { Box, Avatar, Typography } from "@mui/material";
import Logo from "../static/box.png";

export default function Header() {
  return (
    <Box marginTop={"50px"} display={"flex"}>
      <Avatar
        alt="Logo"
        src={Logo}
        sx={{ width: 200, height: 200 }}
        variant="square"
      />
      <Typography
        color={"#A6A0CE"}
        fontSize={"100px"}
        display={"flex"}
        alignItems={"center"}
        marginLeft={"13%"}
        fontFamily={"monospace"}
      >
        StockLow
      </Typography>
    </Box>
  );
}

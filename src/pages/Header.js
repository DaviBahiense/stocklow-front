import { Box, Avatar, Typography, Grow } from "@mui/material";
import Logo from "../static/box.png";

export default function Header() {
  return (
    <Grow in={true} style={{ transitionDelay: "500ms" }}>
      <Box marginTop={"50px"} display={"flex"} transition={"all ease 2s"}>
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
          marginLeft={"11%"}
          fontFamily={"monospace"}
        >
          StockLow
        </Typography>
      </Box>
    </Grow>
  );
}

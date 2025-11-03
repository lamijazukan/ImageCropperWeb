import { Box, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <Box
      component="header"
      display="flex"
      alignItems="center"
      gap={2}
      p={2}
      borderBottom="1px solid"
      borderColor="divider"
      sx={{ bgcolor: "background.paper" }}
    >
      {/* Logo Image */}
      <Box
        component="img"
        src="/icon/icon.svg"
        alt="Logo"
        sx={{
          width: 32,
          height: 32,
          objectFit: "contain",
        }}
        ml={2}
      />

      {/* App Title */}
      <Typography variant="h6" fontWeight={600}>
        Image Cropper
      </Typography>
    </Box>
  );
};

export default Navbar;

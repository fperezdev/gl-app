import useStore from "../store";
import { Avatar, Paper, Tooltip, Typography } from "@mui/material";
import { Person as PersonIcon } from "@mui/icons-material";
import logo from "../assets/logo.png";
import { pink } from "@mui/material/colors";

const Header = () => {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("user");
  };
  return (
    <Paper
      elevation={1}
      sx={{
        height: 70,
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        columnGap: "25px",
      }}
    >
      <img src={logo} width={50} height={50} alt="logo" />
      <Typography variant="h4" sx={{}}>
        GL App
      </Typography>
      <div style={{ marginLeft: "auto" }}>
        {user ? (
          <Tooltip title="Cerrar sesión" arrow>
            <Avatar
              onClick={handleLogout}
              sx={{ bgcolor: pink[500], cursor: "pointer" }}
            >
              {user[0].toUpperCase()}
            </Avatar>
          </Tooltip>
        ) : (
          <Avatar sx={{ bgcolor: pink[500] }}>
            <PersonIcon />
          </Avatar>
        )}
      </div>
    </Paper>
  );
};

export default Header;

import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import useStore from "../../store";

const Login = () => {
  const [user, setUser] = useState("");
  const [error, setError] = useState<string | null>(null);
  const setUserStore = useStore((state) => state.setUser);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
    setError(null);
  };

  const handleLogin = () => {
    if (user === "") {
      setError("El usuario no puede estar vacío");
      return;
    }

    window.localStorage.setItem("user", user);
    setUserStore(user);
  };

  return (
    <div
      style={{
        width: 300,
        margin: "150px auto 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4">Login</Typography>
      <div style={{ width: 300, height: 80, marginTop: 60, marginBottom: 10 }}>
        <TextField
          id="login-user"
          label="Nombre usuario"
          helperText={error}
          variant="outlined"
          sx={{ width: "100%" }}
          error={!!error}
          value={user}
          onChange={handleChange}
        />
      </div>

      <Button
        variant="contained"
        color="primary"
        sx={{ width: 150 }}
        onClick={handleLogin}
      >
        Ingresar
      </Button>
    </div>
  );
};

export default Login;

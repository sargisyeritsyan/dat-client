import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

export const PasswordInput = ({ password, handlePassword, passwordRequired, handlePasswordClick }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      type={showPassword ? "text" : "password"}
      label="Password"
      id="outlined-basic-password"
      value={password}
      onChange={handlePassword}
      onClick={handlePasswordClick}
      required={true}
      error={passwordRequired}
      InputLabelProps={{
        sx: {
          fontSize: "14px"
        }
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
              style={{ color: "black" }}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        )
      }}
      fullWidth
    />
  );
};

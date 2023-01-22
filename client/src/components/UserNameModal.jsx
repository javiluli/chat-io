import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const UserNameModal = ({ user, onSetUser }) => {
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    user.name = value;
    onSetUser({ ...user, name: value });
    handleClose();
  };

  return (
    <Box>
      <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Introducir un nombre de usuario.</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nombre"
            variant="standard"
            value={value}
            fullWidth
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserNameModal;

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import { auth, singInWithGoogle, logout } from "../firebase";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user logged in
        setUser(authUser);

        if (authUser.displayName) {
        } else {
          return authUser.updateProfile({
            displayName: authUser.displayName
          });
        }
      } else {
        // user logged out
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography edge="start" variant="h6" component="div">
            Google Login
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {auth.currentUser && auth.currentUser.displayName ? (

              <p>Welcome, {auth.currentUser.displayName}</p>

            ) : (
              <p></p>
            )}
          </Typography>
 	  <Stack direction="row" spacing={2}>

           <Button
            variant="outlined"
            onClick={user ? logout : singInWithGoogle}
            color="inherit"
           >
            {auth.currentUser && auth.currentUser.displayName ? (
              <p>Logout</p>
            ) : (
              <p>Login with Google</p>
            )}
          </Button>
	 </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

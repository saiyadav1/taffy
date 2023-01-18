import React, { useContext } from "react";
import {
  Grid,
  Typography,
  Hidden,
  Box,
  TextField,
  Button,
} from "@mui/material";
import SuperuserBg from "../../assets/images/SuperuserBg.jpg";
import resoluteailogo from "../../assets/images/resoluteailogo.png";
import { makeStyles } from "@mui/styles";
import { auth } from "../../firebase/Firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Link from "@mui/material/Link";
import { AuthContext } from "../../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${SuperuserBg})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  formHolder: {
    maxWidth: "390px",
    textAlign: "center",
  },
  heading: {
    // padding: theme.spacing(2, 0, 2, 0),
  },
  marginTop3: {
    // marginTop: theme.spacing(4),
    // marginTop:''
  },
}));

export default function LoginPage() {
  const classes = useStyles();
  const { login } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    login(email, password);
  };

  return (
    <div>
      <Grid container className={classes.root}>
        <Hidden smDown>
          <Grid item md={7} className={classes.image}></Grid>
        </Hidden>
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          container
          direction="column"
          justifyContent="center"
        >
          <Box className={classes.formHolder} mx="auto">
            <Box textAlign="center" className={classes.marginTop3}>
              <Typography variant="h2" className={classes.heading}>
                Enter your details to login
              </Typography>

              <Box
                component="form"
                //  noValidate
                //   onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              ></Box>
              <form onSubmit={handleSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, mb: 2 }}
                >
                  Log In
                </Button>
              </form>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    <Typography> Forgot password?</Typography>
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    <Typography variant="body1">
                      "Don't have an account? Sign Up"
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

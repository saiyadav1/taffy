import { Grid, Typography } from "@mui/material";
import React from "react";
import "./home.css";
const NewFooter = () => {
  return (
    <Grid container className="footer-container">
      <Grid
        item
        xs={3}
        style={{ display: "flex", flexDirection: "column", padding: "10px" }}
      >
        <Grid style={{ display: "flex" }}>
          <Typography variant="h6">Company</Typography>
        </Grid>
        <Grid style={{ display: "flex" }}>
          <Typography variant="h6">Career</Typography>
        </Grid>
        <Grid style={{ display: "flex" }}>
          <Typography variant="h6">Privacy Policy</Typography>
        </Grid>
      </Grid>
      <Grid>
        <Grid item xs={3} style={{ display: "flex", padding: "10px" }}>
          <Typography variant="h6">Tools</Typography>
        </Grid>
        <Grid style={{ display: "flex" }}>
          <Typography variant="h6">Search Tools</Typography>
        </Grid>
        <Grid style={{ display: "flex" }}>
          <Typography variant="h6">facebook tools</Typography>
        </Grid>
        <Grid style={{ display: "flex" }}>
          <Typography variant="h6">Linkdein tools</Typography>
        </Grid>
        <Grid style={{ display: "flex" }}>
          <Typography variant="h6">Instagram tools</Typography>
        </Grid>
      </Grid>
      <Grid item xs={6} style={{ display: "flex",justifyContent:'end', padding: "10px" }}>
        <Grid >
          <Typography variant="h3">Taffy Admin</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NewFooter;

// import React,{Children, useState} from "react";
// import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
// import MuiDrawer from "@mui/material/Drawer";
// import Box from "@mui/material/Box";
// import MuiAppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import Badge from "@mui/material/Badge";
// import Container from "@mui/material/Container";
// import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
// import Link from "@mui/material/Link";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// // import { mainListItems } from "./ListItems";
// import  MainListItems  from "./ListItems";
// import Resoluteailogo from '../assets/images/resoluteailogo.png'
// import { AuthContext } from "../context/AuthContext";
// import Order from './Order.js'
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ExpandLessIcon from '@mui/icons-material/ExpandLess';

// const drawerWidth = 240;

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   "& .MuiDrawer-paper": {
//     position: "relative",
//     whiteSpace: "nowrap",
//     width: drawerWidth,
//     transition: theme.transitions.create("width", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     boxSizing: "border-box",
//     ...(!open && {
//       overflowX: "hidden",
//       transition: theme.transitions.create("width", {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//       }),
//       width: theme.spacing(7),
//       [theme.breakpoints.up("sm")]: {
//         width: theme.spacing(9),
//       },
//     }),
//   },
// }));

// const mdTheme = createTheme();

// function HeaderContent({children}) {
//   const [open, setOpen] = React.useState(true);
//   const toggleDrawer = () => {
//     setOpen(!open);
//   };
//   const [moretoolopen,setMoretoolopen]=useState(false)
  
//   const {Signout}=React.useContext(AuthContext)
  
//   return (
//     <ThemeProvider theme={mdTheme}>
//       <Box sx={{ display: "flex" }}>
//         <CssBaseline />
//         <AppBar position="absolute"  open={open} >
//           <Toolbar
//             sx={{
//               pr: "24px", // keep right padding when drawer closed
//             backgroundColor:'white',
//             color:'black'
//             }}
//             >
//             <IconButton
//               edge="start"
//               color="inherit"
//               aria-label="open drawer"
//               onClick={toggleDrawer}
//               sx={{
//                 marginRight: "36px",
//                 ...(open && { display: "none" }),
//               }}
//             >
//               <MenuIcon style={{color:'#FA2609'}} />
//             </IconButton>
//             <Typography
//               component="h1"
//               variant="h6"
//               color="inherit"
//               noWrap
//               sx={{ flexGrow: 1 }}
//             >
//               Dashboard
//             </Typography>
//             <IconButton >
//             {/* onClick={Signout} */}
//               <Badge badgeContent={4} color="secondary">
//                 <NotificationsIcon  />
//               </Badge>
//             </IconButton>
//             <IconButton onClick={()=>{setMoretoolopen(!moretoolopen)}} >
//               { moretoolopen?(<ExpandLessIcon/>):(<ExpandMoreIcon />)}
//             </IconButton>
//           </Toolbar>
//         </AppBar>
//         <Drawer variant="permanent" open={open}>
//           <Toolbar
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "flex-end",
//               px: [1],
//             }}
//           >
//             <IconButton onClick={toggleDrawer}>
//             {/* <img src={Resoluteailogo} style={{width:'180px'}}/> */}
//               <ChevronLeftIcon />
//             </IconButton>
//           </Toolbar>
//           <Divider />
//           <List  component="nav">
//             {/* {mainListItems} */}
//             <MainListItems/>
//           </List>
//         </Drawer>
//         <Box
//           component="main"
//           sx={{
//             backgroundColor: (theme) =>
//               theme.palette.mode === "light"
//                 ? theme.palette.grey[100]
//                 : theme.palette.grey[900],
//             flexGrow: 1,
//             height: "100vh",
//             overflow: "auto",
//           }}
//         >
//           <Toolbar />
//           <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
//                   {children}
//                 </Paper>
//               </Grid>
//             </Grid>
//           </Container>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// }

// export default function Header({children}) {
//   return (
//     <div>
//   <HeaderContent children={children}>
   
//   </HeaderContent>
//     </div>
  
//   )
// }






















import React,{Children, useState} from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
// import { mainListItems } from "./ListItems";
import  MainListItems  from "./ListItems";
import Resoluteailogo from '../assets/images/resoluteailogo.png'
import { AuthContext } from "../context/AuthContext";
import Order from './Order.js'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function HeaderContent({children}) {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [moretoolopen,setMoretoolopen]=useState(false)
  
  const {Signout}=React.useContext(AuthContext)
  
  return (
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
            <Grid container >
              <Grid item xs={12}>
                <Paper sx={{  display: "flex", flexDirection: "column" }}>
                  {children}
                </Paper>
              </Grid>
            </Grid>
        </Box>
  );
}

export default function Header({children}) {
  return (
    <div>
  <HeaderContent children={children}>
   
  </HeaderContent>
    </div>
  
  )
}

import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NovostiCard from "./NovostiCard.js";
import Grid from "@mui/material/Grid";
import firebase from "../Firebase";
import { useState, useEffect } from "react";
import "../index.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import UserCard from "./UserList";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
export function createDoc(newDataObject, id) {
  const ref = firebase.firestore().collection("Ucenik").doc(id);
  ref.set(newDataObject);
}
export function createDoc2(newDataObject, id) {
  const ref = firebase.firestore().collection("Ucitelj").doc(id);
  ref.set(newDataObject);
}
export function deleteUcitelj(docx, id) {
  const ref = firebase.firestore().collection("Ucitelj").doc(id);
  ref.delete().catch((err) => {
    alert(err);
  });
}
export function deleteUcenik(id) {
  const ref = firebase.firestore().collection("Ucenik").doc(id);
  ref.delete().catch((err) => {
    alert(err);
  });
}
export default function PersistentDrawerLeft() {
  let location = useLocation();

  React.useEffect(() => {}, [location]);

  const ref = firebase.firestore().collection("Notebook");

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);

  function getData() {
    ref.onSnapshot((QuerySnapshot) => {
      const items = [];
      QuerySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setData(items);
      setLoader(false);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  const ucenik = firebase.firestore().collection("Ucenik");

  const [dataUcenik, setDataUcenik] = useState([]);

  function getDataUcenik() {
    ucenik.onSnapshot((QuerySnapshot) => {
      const items = [];
      QuerySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setDataUcenik(items);
      setLoader(false);
    });
  }

  useEffect(() => {
    getDataUcenik();
  }, []);

  const ucitelj = firebase.firestore().collection("Ucitelj");

  const [dataUcitelj, setDataUcitelj] = useState([]);

  function getDataUcitelj() {
    ucitelj.onSnapshot((QuerySnapshot) => {
      const items = [];
      QuerySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setDataUcitelj(items);
      setLoader(false);
    });
  }

  useEffect(() => {
    getDataUcitelj();
  }, []);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            E-Platform
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List className="sidebarItems">
          <Link to={"/admin"} className="center">
            Novosti
          </Link>

          <Link to={"/admin/createUser"} className="center">
            Kreiraj Novog Ucenika
          </Link>
          <Link to={"/admin/createTeacher"} className="center">
            Kreiraj Novog Ucitelja
          </Link>
          <Link to={"/admin/userList"} className="center">
            Lista svih učenika
          </Link>

          <Link to={"/admin/teacherList"} className="center">
            Lista svih učitelja
          </Link>
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Grid container spacing={2} rowSpacing={1} columnSpacing={1}>
          {location.pathname === "/admin" &&
            data.map((novosti) => {
              return (
                <NovostiCard className="margin10" item xs={6} props={novosti} />
              );
            })}
          {location.pathname === "/admin/userList" &&
            dataUcenik.map((user) => {
              return <UserCard props={user} />;
            })}
          {location.pathname === "/admin/teacherList" &&
            dataUcitelj.map((user) => {
              return <UserCard props={user} />;
            })}
        </Grid>
      </Main>
    </Box>
  );
}

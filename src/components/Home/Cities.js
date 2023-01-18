import {
  Button,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
  Box,
  Dialog
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./home.css";
import AddIcon from "@mui/icons-material/Add";
import { ref, set, push, update, remove } from "firebase/database";
import { database } from "../../firebase/Firebase";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import DialogContent from "@mui/material/DialogContent";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Cities = ({ cities, setCities, setSelectedCity }) => {
  const [options, setOptions] = useState([...cities]);
  const [newCityName, setNewCityName] = useState("");

  useEffect(() => {
    setOptions([...cities]);
  }, [cities.length]);

  //const handle Add city
  const handleNewCityName = (e) => {
    setNewCityName(e.target.value);
  };

  const handleAddcity = () => {
    let new_copy_arr=[...options];
    new_copy_arr.sort((a, b) => {
      b.count - a.count;
    });
   let count=0;
   if(new_copy_arr.length!=0)
   count=new_copy_arr[0].count;
    set(ref(database, "City/" + `/City${count + 1}`), {
      count: options[0].count + 1,
      name: newCityName.split(' ').join()
    });
    setNewCityName("");
    setopenModalAddNewCity(false);
  };

  //const delete city Name
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteCityIndex, setDeleteCityIndex] = useState(0);
  const [deleteData, setDeleteData] = useState({});

  const handleDeleteModalClose = () => {
    setOpenDeleteModal(false);
  };

  const handleDeleteCityModalOpen = (e, data) => {
    setOpenDeleteModal(true);
    // setDeleteCityIndex(index);
    setDeleteData(data);
  };

  const handleDeleteCity = () => {
    remove(ref(database, "City/" + `/City${deleteData.count}`))
      .then(() => {
        remove(ref(database, "Brands" + `/${deleteData.name}`)).then(() => {
          remove(ref(database, "BrandsExplorer" + `/${deleteData.name}`)).then(
            () => {
              remove(ref(database, "Offers" + `/${deleteData.name}`)).then(
                () => {
                  console.log("deleted all data successfully");
                }
              );
            }
          );
        });
      })
      .catch((err) => console.log("got an error while deleting city adta"));
    setOpenDeleteModal(false);
  };

  //update city Name
  const [updateCityName, setUpdateCityName] = useState("");
  const [updateCityModalIndex, setUpdateCityModalIndex] = useState(0);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const handleUpdateModalClose = () => {
    setOpenUpdateModal(false);
  };
  const handleUpdateCityName = (e) => {
    setUpdateCityName(e.target.value);
  };
  const handleUpdateCityModalOpen = (e, index) => {
    setUpdateCityModalIndex(index);
    setOpenUpdateModal(true);
  };
  const handleUpdateCity = () => {
    update(ref(database, "City/" + `/City${updateCityModalIndex}`), {
      count: updateCityModalIndex,
      name: updateCityName,
    })
      .then((res) => {
        update(ref(database, "Brands" + `/City${updateCityModalIndex}`), {
          count: updateCityModalIndex,
          name: updateCityName,
        }).then(() => {});
      })
      .catch((err) => console.log("error message is :", err.message));
    setOpenUpdateModal(false);
  };

  const handleSelectedCity = (city) => {
    setSelectedCity(city);
  };
  //handle add New City
  const [openModalAddNewCity, setopenModalAddNewCity] = useState(false);
  const handleCloseModalAddCity = () => {
    setopenModalAddNewCity(false);
  };

  return (
    <div style={{padding:'0 5%'}}>
      <Grid className="cities-heading" style={{ marginTop: "20px" }}>
        <Grid>
          <Typography variant="h4" bold>
            Explore Our Cities
          </Typography>
        </Grid>
        <Grid>

          <Button
            onClick={() => {
              setopenModalAddNewCity(true);
            }}
            className="btn"
          >
            Add City <AddIcon />
          </Button>
        </Grid>
      </Grid>
      <Grid className="cities-para" style={{ marginBottom: "50px" }}>
        <Typography variant="h6">
          Only thing you need to select your city....
        </Typography>
      </Grid>
      <Grid className="city-card-container">
        {options.map((city, index) => {
          return (
            <Grid
              key={index}
              className="city-card"
              style={{
                height: "250px",
                width: "32%",
                backgroundImage: `url('https://images.indianexpress.com/2022/10/Hydracity-jpg-1.jpg')`,
                backgroundSize: "cover",
                color: "white",
                padding: "10px",
                margin:'10px'
              }}
            >
              <Grid style={{ width: "100%", height: "100%" }}>
                <Grid
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    height: "20%",
                  }}
                >
                  <IconButton
                    className="btn-icon"
                    onClick={(e) => handleDeleteCityModalOpen(e, city)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
                <Grid
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    height: "80%",
                    width: "100%",
                  }}
                >
                  <Button
                    className="btn"
                    onClick={() => {
                      handleSelectedCity(city);
                    }}
                  >
                    {city.name}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          );
        })}

      </Grid>
      <Modal
        open={openUpdateModal}
        onClose={handleUpdateModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New City Name
          </Typography>
          <Button onClick={handleUpdateCity}>Update</Button>
        </Box>
      </Modal>
      <Modal
        open={openDeleteModal}
        onClose={handleDeleteModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid mb={2}>
            <Typography id="modal-modal-title" variant="body1">
              <b>Once Clicked on Ok,Data would be deleted Permanentaly.</b>
            </Typography>
          </Grid>
          <Grid
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button className="btn" onClick={handleDeleteModalClose}>
              Cancel
            </Button>
            <Button className="btn" onClick={handleDeleteCity}>
              Ok
            </Button>
          </Grid>
        </Box>
      </Modal>

      <Modal
        open={openModalAddNewCity}
        onClose={handleCloseModalAddCity}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid
            className="city-card-add"
            style={{
              height: "250px",
              width: "100%",
              padding: "10px",
              border: "5px solid grey",
            }}
          >
            <Typography variant="h6">Add City</Typography>
            <Grid>
              <TextField
                variant="standard"
                name="newCityName"
                value={newCityName}
                onChange={handleNewCityName}
                placeholder="Enter City Name"
              />
            </Grid>
            <Grid>
              <IconButton className="btn" onClick={handleAddcity}>
                <AddIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default Cities;

import React, { useEffect, useState } from "react";
import "./home.css";
import {
  Button,
  Grid,
  IconButton,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import { database, storage } from "../../firebase/Firebase";
import { ref, onValue, set, update,remove } from "firebase/database";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import {
  getStorage,
  ref as storageRefs,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const style = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AllDemartStores = ({
  selectedcity,
  selectedBrand,
  setSelectedbrand,
  slectedMart,
  setSelectedMart,
}) => {
  const [allStoreOption, setallStoreOption] = useState([]);
 
  useEffect(() => {
    if (Object.keys(selectedcity).length != 0 &&Object.keys(selectedBrand).length != 0) {
      const AllStoreRef = ref(
        database,
        "BrandsExplorer" + `/${selectedcity.id}` + `/${selectedBrand.id}`
      );
      onValue(AllStoreRef, (snapshot) => {
        const brands = snapshot.val();
        let brandsArr = [];
        for (let brand in brands) {
          brandsArr.push({ ...brands[brand], mart_id: brand });
        }
        setallStoreOption([...brandsArr]);
      });
    }
  }, [selectedcity, selectedBrand]);

  //add new Mart
  const [AddnewFormData, setAddNewFormData] = useState({
    address: "",
    closeAt: "",
    contact: "",
    count: 0,
    id: "",
    opensAt: "",
    rating: "",
    totalRating: "",
    url: "",
    backUrl: "",
    urlFile: {},
  });
  const [newimageFile, setNewimageFile] = useState({});
  const [newimageFileName, setNewimageFileName] = useState("");
  const handleNewImageFile = (e) => {
    setNewimageFile(e.target.files[0]);
    setNewimageFileName(e.target.value);
  };
  const handleAddNewFormData = (e) => {
    setAddNewFormData({ ...AddnewFormData, [e.target.name]: e.target.value });
  };
  const handleAddNewFormDataFile = (e) => {
    setAddNewFormData({ ...AddnewFormData, [e.target.name]: e.target.value });
    setAddNewFormData({ ...AddnewFormData, urlFile: e.target.files[0] });
  };
  const [openAddNewMart, setOpenAddNewMart] = useState(false);
  const handleOpenAddNewMart = () => {
    setOpenAddNewMart(false);
  };

  const handleNewMart = () => {
    console.log('AddnewFormData',AddnewFormData)
    const storageRef = storageRefs(
      storage,
      `Brands Explorer Images/${newimageFileName}`
    );
    uploadBytes(storageRef, newimageFile).then((snapshot) => {
      getDownloadURL(
        storageRefs(storage, `Brands Explorer Images/${newimageFileName}`)
      ).then((url) => {
        let new_copy_arr = [...allStoreOption];
        new_copy_arr.sort((a, b) => {
          b.count - a.count;
        });
        let new_count = new_copy_arr.length == 0 ? 0 : new_copy_arr[0].count;
        let currentDate = new Date();
        let newbrandKey = `Mart${currentDate.getFullYear()}${
          currentDate.getMonth() + 1
        }${currentDate.getDate()}${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getSeconds()}`;
        set(
          ref(
            database,
            "BrandsExplorer/" +
              `/${selectedcity.id}` +
              `/${selectedBrand.id}` +
              `/${newbrandKey}`
          ),
          {
            address: AddnewFormData.address,
            closeAt: AddnewFormData.closeAt,
            contact: AddnewFormData.contact,
            count: new_count + 1,
            id: AddnewFormData.id.split(' ').join('').toLowerCase(),
            name:AddnewFormData.id,
            opensAt: AddnewFormData.opensAt,
            rating: "",
            totalRating: "",
            url: url,
            backUrl: url,
          }
        ).then(() => {
          setAddNewFormData({
            address: "",
            closeAt: "",
            contact: "",
            count: 0,
            id: "",
            opensAt: "",
            rating: "",
            totalRating: "",
            url: "",
            backUrl: "",
            urlFile: {},
          });
          setNewimageFile({});
          setNewimageFileName("");
          setOpenAddNewMart(false)
        });
      });
    });
  };
  const handleViewStore = (store) => {
    setSelectedMart(store);
  };

  //edit mart Details
  const [selectedupdatemartData, setSelectedUpdateMartData] = useState({});
  const [openupdateMart, setOpenUpdateMart] = useState(false);
  const handleCloseUpdateMart = () => {
    setOpenUpdateMart(false);
  };
  const handleEditMart = (store) => {
    setSelectedUpdateMartData(store);
    setOpenUpdateMart(true);
    setSelectedUpdateMartData({
      address: store.address,
      backUrl: store.backUrl,
      closeAt: store.closeAt,
      contact: store.contact,
      count: store.count,
      id: store.id,
      mart: store.mart,
      opensAt: store.opensAt,
      rating: store.rating,
      totalRating: store.totalRating,
      url: store.url,
      martName: store.martName,
    });
  };
  const handleUpdateMartDetails = (e) => {
    setSelectedUpdateMartData({
      ...selectedupdatemartData,
      [e.target.name]: e.target.value,
    });
  };
  const handleUpdateMart = () => {
    
    update(
      ref(
        database,
        "BrandsExplorer" +
          `/${selectedcity.name}` +
          `/${selectedBrand.id}` +
          `/${selectedupdatemartData.martName}`
      ),
      {
        address: selectedupdatemartData.address,
        backUrl: selectedupdatemartData.backUrl,
        closeAt: selectedupdatemartData.closeAt,
        contact: selectedupdatemartData.contact,
        count: selectedupdatemartData.count,
        id: selectedupdatemartData.id,
        martName: selectedupdatemartData.martName,
        opensAt: selectedupdatemartData.opensAt,
        rating: 0.0,
        totalRating: 0,
        url: selectedupdatemartData.url,
      }
    )
      .then((res) =>{ console.log("Mart data updated successfully")})
      .catch((err) =>{ console.log("error message is :", err.message)});
      setOpenUpdateMart(false);
  };

  //deleting mart
  const [deleteeModalData, setDeleteModalData] = useState({});
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };
  const handleDeleteMart = (store) => {
    setDeleteModalData(store);
    setDeleteModalOpen(true);
  };
  const handleDeleteMartData = () => {
    remove(ref(database, "BrandsExplorer" + `/${selectedcity.id}`+`/${selectedBrand.id}`
    +`/${deleteeModalData.mart_id}`))
      .then(() =>{ 
        remove(ref(database, "Offers" + `/${selectedcity.id}`+`/${selectedBrand.id}`+`/${deleteeModalData.id}`))
        .then(()=>{
          console.log("Brand Data deleted successfully");
        })
        .catch((err)=>{console.log('error message',err.message)})
      })
      .catch((err) => {console.log("got an error while deleting city adta")});
      setDeleteModalOpen(false);
  };

  return (
    <Grid style={{padding:'5% 5%'}}>
      <Grid className="all-store-header-section">
        <Grid className="all-store-header-section-text">
          <Typography variant="h5">All  {selectedBrand.id}  Stores</Typography>
        </Grid>
        <Grid className="all-store-header-section-text">
          Selected Brand:
          {selectedBrand.id}
        </Grid>
      </Grid>
      <Grid style={{ display: "flex", marginBottom: "15px" }}>
        <IconButton
          className="back-btn"
          onClick={() => {
            setSelectedbrand({});
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Grid>
      <Grid className="all-store-container">
        {allStoreOption.map((store) => {
          return (
            <Grid className="all-store-item">
              <Grid
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <IconButton
                  onClick={() => {
                    handleEditMart(store);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton onClick={()=>{handleDeleteMart(store)}}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
              <Grid className="all-store-item-img">
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={store.url}
                  alt="store-image"
                />
              </Grid>
              <Grid className="all-store-item-name">{store.name}</Grid>
              <Grid className="all-store-item-phoneNo">{store.contact}</Grid>
              <Grid className="all-store-item-phoneNo">{store.address}</Grid>
              <Grid className="all-store-item-phoneNo">
                <Rating name="read-only" value={3} readOnly />
                (3)
              </Grid>
              <Grid className="all-store-item-phoneNo">{store.opensAt}</Grid>
              <Grid className="all-store-item-phoneNo">{store.closeAt}</Grid>
              <Grid className="all-store-item-phoneNo">
                <Button
                  className="all-store-btn"
                  onClick={() => {
                    handleViewStore(store);
                  }}
                >
                  View Store
                </Button>
              </Grid>
            </Grid>
          );
        })}
        <Grid className="city-card-add">
          <Typography variant="h6">Add New Mart</Typography>
          <Grid>
            <IconButton
              onClick={() => {
                setOpenAddNewMart(true);
              }}
            >
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      
      <Modal
        open={openAddNewMart}
        onClose={handleOpenAddNewMart}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid style={{display:'flex',justifyContent:'center'}}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <b>Add Details</b>
          </Typography>
          </Grid>
          <TextField
            type="string"
            name="address"
            value={AddnewFormData.address}
            onChange={handleAddNewFormData}
            placeholder="Address"
            label='Address'
            className="modalInputfield"
          />
          <TextField
            type="time"
            name="opensAt"
            value={AddnewFormData.opensAt}
            onChange={handleAddNewFormData}
            placeholder="Opens At"
            className="modalInputfield"
            helperText="Opens At"
          />
          <TextField
            type="time"
            name="closeAt"
            value={AddnewFormData.closeAt}
            onChange={handleAddNewFormData}
            className="modalInputfield"
            helperText="Close At"
          />
          <TextField
            type="number"
            name="contact"
            value={AddnewFormData.contact}
            onChange={handleAddNewFormData}
            placeholder="Contact Number"
            label='Contact Number'
            className="modalInputfield"
          />

          <TextField
            type="string"
            name="id"
            value={AddnewFormData.id}
            onChange={handleAddNewFormData}
            placeholder="Mart Name"
            label='Mart Name'
            className="modalInputfield"
          />

          <TextField
            type="file"
            name="newimageFileName"
            value={newimageFileName}
            onChange={handleNewImageFile}
            placeholder="Image Url"
            className="modalInputfield"
          />
          <Grid style={{ display: "flex", justifyContent: "space-between" }}>
            <Button className="btn" onClick={handleOpenAddNewMart}>Cancel</Button>
            <Button className="btn" onClick={handleNewMart}>Ok</Button>
          </Grid>
        </Box>
      </Modal>
  
      <Modal
        open={openupdateMart}
        onClose={handleCloseUpdateMart}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Details
          </Typography>
          <TextField
            type="string"
            label="Address"
            name="address"
            value={selectedupdatemartData.address}
            onChange={handleUpdateMartDetails}
            placeholder="Address"
            className="modalInputfield"
          />
          <TextField
            type="time"
            label="Opens At"
            name="opensAt"
            value={selectedupdatemartData.opensAt}
            onChange={handleUpdateMartDetails}
            placeholder="Opens At"
            className="modalInputfield"
            helperText="Opens At"
          />
          <TextField
            type="time"
            name="closeAt"
            label="Close At"
            value={selectedupdatemartData.closeAt}
            onChange={handleUpdateMartDetails}
            className="modalInputfield"
            helperText="Close At"
          />
          <TextField
            type="number"
            name="contact"
            label="Contact"
            value={selectedupdatemartData.contact}
            onChange={handleUpdateMartDetails}
            placeholder="Contact Number"
            className="modalInputfield"
          />

          <TextField
            type="string"
            name="id"
            label="Mart Name"
            value={selectedupdatemartData.id}
            onChange={handleUpdateMartDetails}
            placeholder="Mart Name"
            className="modalInputfield"
          />
          <Grid style={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={handleCloseUpdateMart}>Cancel</Button>
            <Button onClick={handleUpdateMart}>Ok</Button>
          </Grid>
        </Box>
      </Modal>


     

      <Modal
        open={deleteModalOpen}
        onClose={handleDeleteModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete Store Data
          </Typography>
          <Grid style={{display:'flex',justifyContent:'space-between',marginTop:'10px'}}>
          <Button onClick={handleDeleteModalClose} className='btn'>Cancel</Button>
          <Button onClick={handleDeleteMartData} className='btn'>Ok</Button>
          </Grid>
          </Grid>
        </Box>
      </Modal>


    </Grid>
  );
};

export default AllDemartStores;

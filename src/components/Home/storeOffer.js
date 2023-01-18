import React, { useEffect, useState } from "react";
import "./storeOffer.css";
import {
  Grid,
  IconButton,
  TextField,
  Typography,
  Box,
  Button,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AddIcon from "@mui/icons-material/Add";
import Rating from "@mui/material/Rating";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { database, storage } from "../../firebase/Firebase";
import { ref, onValue, set, remove } from "firebase/database";
import {
  getStorage,
  ref as storageRefs,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import Modal from "@mui/material/Modal";

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

const StoreOffer = ({
  selectedcity,
  selectedBrand,
  selectedMart,
  setSelectedMart,
}) => {
  useEffect(() => {
    const OffersRef = ref(
      database,
      "Offers" +
        `/${selectedcity.name}` +
        `/${selectedBrand.id}` +
        `/${selectedMart.martName}`
    );
    onValue(OffersRef, (snapshot) => {
      const offers = snapshot.val();
      let offerArr = [];
      for (let key in offers) {
        offerArr.push({ ...offers[key], id: key });
      }
      setStoreOfferOption([...offerArr]);
    });
  }, [selectedcity, selectedBrand, selectedMart]);
  const [storeOfferOption, setStoreOfferOption] = useState([]);

  //Add new offer
  const [formData, setFormData] = useState({
    filename: "",
    fileData: {},
  });
  const [openAddNewOfferModal, setopenAddNewOfferModal] = useState(false);
  const handleOpenAddNewOfferModal = () => {
    setopenAddNewOfferModal(false);
  };
  const handleFileUpload = (e) => {
    setFormData({
      ...formData,
      ["filename"]: e.target.value,
      ["fileData"]: e.target.files[0],
    });
  };
  const AddNewOffer = () => {
    let currentDate = new Date();
    let imageName = `Image${currentDate.getFullYear()}${
      currentDate.getMonth() + 1
    }${currentDate.getDate()}${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getSeconds()}`;
    const storageRef = storageRefs(storage, `OfferImage/${imageName}`);
    uploadBytes(storageRef, formData.fileData).then((snapshot) => {
      getDownloadURL(storageRefs(storage, `OfferImage/${imageName}`)).then(
        (url) => {
          let max = 0;
          storeOfferOption.map((obj) => {
            if (parseInt(obj.count) >= parseInt(max)) max = obj.count;
          });
          let newbrandKey = `Offer${currentDate.getFullYear()}${
            currentDate.getMonth() + 1
          }${currentDate.getDate()}${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getSeconds()}`;
          set(
            ref(
              database,
              "Offers/" +
                `/${selectedcity.name}` +
                `/${selectedBrand.id}` +
                `/${selectedMart.martName}` +
                `/${newbrandKey}`
            ),
            {
              count: parseInt(max) + 1,
              url: url,
            }
          ).then(() => {
            setopenAddNewOfferModal(false);
            setFormData({
              filename: "",
              fileData: {},
            });
          });
        }
      );
    });
  };

  //handle Delete Offer
  const handleDeleteOffer = (offer) => {
    remove(
      ref(
        database,
        "Offers" +
          `/${selectedcity.name}` +
          `/${selectedBrand.id}` +
          `/${selectedMart.martName}` +
          `/${offer.id}`
      )
    )
      .then(() => console.log("City Data deleted successfully"))
      .catch((err) => console.log("got an error while deleting city adta"));
  };

  return (
    <Grid container style={{ padding: "5% 5%" }}>
      <Grid className="back-btn-container">
        <IconButton
          className="back-btn"
          onClick={() => {
            setSelectedMart({});
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Grid>
      <Grid className="store-image-container">
        <div
          style={{
            display: "flex",
            backgroundImage: `url('https://images.idgesg.net/images/article/2020/10/left-side-100861571-orig.jpg')`,
            width: "58%",
            height: "80vh",
            backgroundSize: "cover",
          }}
        ></div>
        <Grid className="side-image-container">
          <Grid
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundImage: `url('https://images.idgesg.net/images/article/2020/10/left-side-100861571-orig.jpg')`,
              width: "100%",
              height: "49%",
              backgroundSize: "cover",
            }}
          >
            <Grid
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "3rem",
                border: "4px dashed white",
                color: "white",
                borderRadius: "1rem",
              }}
            >
              <EditIcon />
              Edit
            </Grid>
          </Grid>
          <Grid
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundImage: `url('https://images.idgesg.net/images/article/2020/10/left-side-100861571-orig.jpg')`,
              width: "100%",
              height: "49%",
              backgroundSize: "cover",
            }}
          >
            <Grid
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "3rem",
                border: "4px dashed white",
                color: "white",
                borderRadius: "1rem",
              }}
            >
              <DeleteIcon />
              Delete
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid className="divider-container">
        <Grid
          style={{
            display: "flex",
            width: "20%",
          }}
        >
          <Typography variant="h5" style={{ color: "red" }}>
            Store Active Offers
          </Typography>
        </Grid>
        <Grid style={{ width: "78%", margin: "auto" }}>
          <hr></hr>
        </Grid>
      </Grid>
      <Grid className="image-container">
        {storeOfferOption.map((offer) => {
          return (
            <Grid
              style={{
                width: "24%",
                height: "40vh",
                border: "1px solid grey",
                position: "relative",
                margin: "10px",
                borderRadius: "1rem",
              }}
            >
              <IconButton
                style={{
                  position: "absolute",
                  top: 0,
                  backgroundColor: "white",
                  zIndex: 1,
                }}
                onClick={() => {
                  handleDeleteOffer(offer);
                }}
              >
                <DeleteIcon />
              </IconButton>
              <img
                src={offer.url}
                style={{ width: "100%", height: "100%", borderRadius: "1rem" }}
              />
            </Grid>
          );
        })}
        <Grid
          style={{
            width: "24%",
            height: "40vh",
            padding: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "2px solid grey",
            borderRadius: "1rem",
          }}
        >
          <Grid>
            <IconButton
              style={{ width: "2rem", height: "2rem" }}
              onClick={() => {
                setopenAddNewOfferModal(true);
              }}
              className='btn'
            >
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid className="divider-container">
        <Grid
          style={{
            display: "flex",
            width: "20%",
          }}
        >
          <Typography variant="h5" style={{ color: "red" }}>
            Rating and Reviews
          </Typography>
        </Grid>
        <Grid style={{ width: "78%", margin: "auto" }}>
          <hr></hr>
        </Grid>
      </Grid>
      <Grid style={{ width: "100%" }}>
        <Grid
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "1rem",
          }}
        >
          <Grid>
            <Typography variant="h2">3</Typography>
          </Grid>
          <Grid>
            <Rating name="disabled" value={"3"} disabled />
          </Grid>
        </Grid>
      </Grid>

      <Modal
        open={openAddNewOfferModal}
        onClose={handleOpenAddNewOfferModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid>Attach a image of Offers</Grid>
          <TextField
            type="file"
            name="fileData"
            value={formData.filename}
            onChange={handleFileUpload}
          />
          <Button onClick={AddNewOffer}>Add</Button>
        </Box>
      </Modal>
    </Grid>
  );
};

export default StoreOffer;

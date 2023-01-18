import {
  Divider,
  Grid,
  Typography,
  TextField,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./home.css";
import { ref, onValue, set, remove } from "firebase/database";
import { database, storage } from "../../firebase/Firebase";
import AddIcon from "@mui/icons-material/Add";
import {
  getStorage,
  ref as storageRefs,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";

const style = {
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
const style1 = {
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

const PopularBrands = ({ selectedcity, setSelectedbrand }) => {
  const [popularBrandOptions, setPopularBrandOptions] = useState([]);

  useEffect(() => {
    if (Object.keys(selectedcity).length != 0) {
      const BrandRef = ref(database, "Brands" + `/${selectedcity.name}`);
      onValue(BrandRef, (snapshot) => {
        const brands = snapshot.val();
        let brandsArr = [];
        for (let brand in brands) {
          brandsArr.push({ ...brands[brand], brand_name: brand });
        }
        setPopularBrandOptions([...brandsArr]);
      });
    }
  }, [selectedcity]);

  //Adding new Brands
  const [newbrandName, setNewbrandName] = useState("");
  const [newimageFile, setNewimageFile] = useState({});
  const [newimageFileName, setNewimageFileName] = useState("");
  const handleNewbrandName = (e) => {
    setNewbrandName(e.target.value);
  };
  const handleNewImageFile = (e) => {
    setNewimageFile(e.target.files[0]);
    setNewimageFileName(e.target.value);
  };
  const handleAddNewBrand = () => {
    let currentDate = new Date();
    let newbrandKey = `Brand${currentDate.getFullYear()}${
      currentDate.getMonth() + 1
    }${currentDate.getDate()}${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getSeconds()}`;
    const storageRef = storageRefs(storage, `Brands Logo/${newimageFileName}`);
    uploadBytes(storageRef, newimageFile).then((snapshot) => {
      getDownloadURL(
        storageRefs(storage, `Brands Logo/${newimageFileName}`)
      ).then((url) => {
        let new_copy_arr = [...popularBrandOptions];
        new_copy_arr.sort((a, b) => {
          b.count - a.count;
        });
        let new_count = new_copy_arr.length == 0 ? 0 : new_copy_arr[0].count;
        set(
          ref(
            database,
            "Brands/" + `/${selectedcity.name}` + `/${newbrandKey}`
          ),
          {
            count: new_count + 1,
            id: newbrandName.split(' ').join(''),
            url: url,
          }
        ).then(() => {
          setNewbrandName("");
          setNewimageFile({});
          setNewimageFileName("");
          setAddNewModalOpen(false);
        });
      });
    });
  };

  //selected brand
  const handleSelectedBrand = (brand) => {
    setSelectedbrand(brand);
  };

  //delete mart
  const [openDeleteModal, setopenDeleteModal] = useState(false);
  const [deleteFormData, setDeleteFormData] = useState({});
  const handleDeleteModalClose = () => {
    setopenDeleteModal(false);
  };
  const handleDeleteModalOpen = (mart) => {
    setDeleteFormData(mart);
    setopenDeleteModal(true);
  };
  const handleDeletemart = () => {
    remove(
      ref(
        database,
        "Brands/" + `/${selectedcity.name}` + `/${deleteFormData.brand_name}`
      )
    ).then(() => {
      remove(
        ref(
          database,
          "BrandsExplorer/" + `/${selectedcity.name}` + `/${deleteFormData.id}`
        )
      ).then(() => {
        remove(
          ref(
            database,
            "Offers/" + `/${selectedcity.name}` + `/${deleteFormData.id}`
          )
        );
        setopenDeleteModal(false);
      });
    });
  };
  
  //Add New Brand Modal
  const [AddNewModalOpen,setAddNewModalOpen]=useState(false)
  const handleAddNewModalOpen=()=>{
    setAddNewModalOpen(false)
  }


  return (
    <div style={{padding:'0 5%'}}>
      <Divider className="popularBrands-divider" />
      <Grid className="popularBrand-heading-div">
        <Grid className="popularBrand-heading">
        Popular Brands in {selectedcity.name}
        </Grid>
        <Grid >
          <Button onClick={()=>{setAddNewModalOpen(true)}} className="btn">
            Add Brand <AddIcon />
          </Button>
        </Grid>
      </Grid>
      <Grid className="Brands-container">
        {popularBrandOptions.map((brand) => {
          return (
            <Grid className="brands-item">
              <Grid
                className="brand-item-img"
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${brand.url})`,
                  backgroundSize: "cover",
                }}
              ></Grid>
              <Grid className="brand-item-text">
                <Grid>
                <IconButton
                  style={{ backgroundColor: "white" }}
                  onClick={() => {
                    handleDeleteModalOpen(brand);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
                </Grid>
                <Grid>
                <Button
                  className="btn"
                  onClick={() => handleSelectedBrand(brand)}
                >
                  {brand.id}
                </Button>
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
      <Modal
        open={openDeleteModal}
        onClose={handleDeleteModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style1}>
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
            <Button className="btn" onClick={handleDeletemart}>
              Ok
            </Button>
          </Grid>
        </Box>
      </Modal>

      <Modal
        open={AddNewModalOpen}
        onClose={handleAddNewModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Grid className="brands-item-add">
          <Grid style={{ height: "10%" }}>
            <Typography variant="h6">Add New Brand</Typography>
          </Grid>
          <Grid style={{ height: "10%", marginTop: "20%" }}>
            <TextField
              variant="standard"
              name="newbrandName"
              value={newbrandName}
              onChange={handleNewbrandName}
              placeholder="New Brand Name"
            />
          </Grid>
          <Grid style={{ height: "10%" }}>
            <TextField
              variant="standard"
              name="newimageFile"
              type="file"
              value={newimageFileName}
              onChange={handleNewImageFile}
              placeholder="Add Image"
            />
          </Grid>
          <Grid style={{ height: "10%", marginTop: "20%" }}>
            <IconButton className="btn" onClick={handleAddNewBrand}>
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default PopularBrands;

import { Grid, Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import AllDemartStores from "../components/Home/AllDemartStores";
import Cities from "../components/Home/Cities";
import NewFooter from "../components/Home/NewFooter";
import PopularBrands from "../components/Home/PopularBrands";
import Slider from "../components/Home/Slider";
import { database } from "../firebase/Firebase";
import { ref, onValue } from "firebase/database";
import StoreOffer from "../components/Home/storeOffer";
import CircularProgress from "@mui/material/CircularProgress";
import DialogContent from "@mui/material/DialogContent";

const Home = () => {
  const [cities, setCities] = useState([]);
  const [selectedcity, setSelectedCity] = useState({});
  const [selectedBrand, setSelectedbrand] = useState({});
  const [selectedMart, setSelectedMart] = useState({});

  useEffect(() => {
    setProgressLoading(true)
    const CityRef = ref(database, "City");
    onValue(CityRef, (snapshot) => {
      const data = snapshot.val();
      let cityArr = [];
      for (let city in data) {
        cityArr.push(data[city]);
      }
      cityArr.sort((a, b) => {
        return b.count - a.count;
      });
      setCities([...cityArr]);
      setSelectedCity(cityArr[0]);
      setProgressLoading(false);
    });
    setTimeout(()=>{
      setProgressLoading(false);
    },[15000])
  }, []);


  const [progressLoading, setProgressLoading] = useState(false);

  return (
    <div>
      <Dialog open={progressLoading}>
        <DialogContent>
          <CircularProgress />
        </DialogContent>
      </Dialog>
      <Grid
        style={
          Object.keys(selectedBrand).length == 0 ? {} : { display: "none" }
        }
      >
        <Slider />
        <Cities
          cities={cities}
          setCities={setCities}
          setSelectedCity={setSelectedCity}
        />
        <PopularBrands
          cities={cities}
          setCities={setCities}
          setSelectedCity={setSelectedCity}
          selectedcity={selectedcity}
          setSelectedbrand={setSelectedbrand}
        />
      </Grid>
      <Grid
        style={
          Object.keys(selectedBrand).length != 0 &&
          Object.keys(selectedMart).length == 0
            ? {}
            : { display: "none" }
        }
      >
        <AllDemartStores
          cities={cities}
          setCities={setCities}
          setSelectedCity={setSelectedCity}
          selectedcity={selectedcity}
          setSelectedbrand={setSelectedbrand}
          selectedBrand={selectedBrand}
          setSelectedMart={setSelectedMart}
          selectedMart={selectedMart}
        />
      </Grid>
      <Grid
        style={Object.keys(selectedMart).length != 0 ? {} : { display: "none" }}
      >
        <StoreOffer
          selectedcity={selectedcity}
          selectedBrand={selectedBrand}
          selectedMart={selectedMart}
          setSelectedMart={setSelectedMart}
        />
      </Grid>
      <NewFooter />
    </div>
  );
};

export default Home;

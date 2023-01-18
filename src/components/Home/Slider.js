import React, { useEffect, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "./home.css";
import { database } from "../../firebase/Firebase";
import { ref, onValue, set } from "firebase/database";
import { IconButton } from "@mui/material";

const Slider = () => {
  const [sliderOption, setSliderOption] = useState([]);
  const [sliderindex, setSliderIndex] = useState(0);
  useEffect(() => {
    const SliderRef = ref(database, "SliderImages");
    onValue(SliderRef, (snapshot) => {
      const data = snapshot.val();
      let sliderArr = [];
      for (let key in data) {
        sliderArr.push(data[key]);
      }
      setSliderOption([...sliderArr]);
    });
  }, []);
  const handleDecrementIndex = () => {
    let index=sliderindex==0?sliderOption.length:sliderindex - 1
    setSliderIndex(index);
  };
  const handleIncrementIndex = () => {
    setSliderIndex((sliderindex + 1)%sliderOption.length);
  };
  return (
    <div className="slider-container">
      <div className="slider-left">
        <IconButton
          style={{
            backgroundColor: "grey",
            color: "white",
          }}
          onClick={handleDecrementIndex}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
      </div>
      <div className="slider-right">
        <IconButton
          style={{
            backgroundColor: "grey",
            color: "white",
          }}
          onClick={handleIncrementIndex}
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      </div>
      <div
        style={{
          width: "90%",
          height: "90%",
        }}
      >
        <img src={sliderOption[sliderindex]} style={{maxWidth: '100%',maxHeight:'100%'}}/>
      </div>
    </div>
  );
};

export default Slider;

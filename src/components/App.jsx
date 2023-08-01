import React from "react";
import "../styles/App.css"
import WeatherFire from "./WeatherFire";
import Header from "./Header";
import Maps from "./Maps";



function  App(){
        return(
            <>
            <Header/>
            <WeatherFire/>
            <Maps/>
            </>
            );
}

export default App;
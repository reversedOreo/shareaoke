import React from 'react';
import axios from 'axios';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import FusionCharts from 'fusioncharts/core';
import PowerCharts from 'fusioncharts/fusioncharts.powercharts';
import Bar2d from 'fusioncharts/viz/bar2d';
import FusionTheme from 'fusioncharts/themes/es/fusioncharts.theme.fusion';
import ReactFC from "react-fusioncharts";
ReactFC.fcRoot(FusionCharts, Bar2d, FusionTheme, PowerCharts);

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topSongs: ""
    }
  }
   componentDidMount() {
     this.ArtistsInfo().then((data) => {
       this.setState({
        topSongs: data
        })
      }
    )
   }
   
  //gets all the artist information from the api and formats it for use in FusionChart
   ArtistsInfo () {
     return axios.get("/chart/Music")
       .then((artistInfo) => {
         //put data(nestedObjects) inside an array
         let artist = artistInfo.data
         let arr = []
         let keys = Object.keys(artist);
         for (var i = 0; i <= keys.length - 1; i++) {
           var key = keys[i];
           arr[key] = artist[key];
         }
         return arr;
       }).then((data) => {
         //access each artist specific info in the array of objects 
         //and push it in a new array
         let newArr = []
          data.forEach(function (character) {
              let obj = {
              "label": `${character.artist}` + ":" + " " + `${character.title}`,
              "value": `${character["weeks on chart"]}`
                }
           newArr.push(obj)
          });
         return newArr;
        })
      }
  
chartConfigs(){
   let configs = {
    renderAt: "chart-container",
    type: "bar2d",
    width: "100%",
    height: 400,
    dataFormat: "json",
    dataSource: {
      "chart": {
        "caption": "Top 10 iOS Apps - July 2017",
        "subCaption": "Downloads (In Millions)",
        "canvasBgAlpha": "0",
        "bgColor": "#ffffff",
        "bgAlpha": "70",
        "baseFont": "Roboto",
        "baseFontSize": "14",
        "showAlternateVGridColor": "1",
        "alternateVGridAlpha": "5",
        "labelFontSize": "15",
        "captionFontSize": "20",
        "subCaptionFontSize": "16",
        "toolTipColor": "#000000",
        "toolTipBgColor": "#ffffff",
        "toolTipAlpha": "90",
        "captionFontBold": "0",
        "subCaptionFontBold": "0",
        "paletteColors": "#8E24AA",
        "valueFontSize": "13",
        "valueFontBold": "0",
        "animation": "0",
        "divLineAlpha": "15",
        "divLineDashed": "0",
        "plotFillAlpha": "90",
        "theme": "ocean"
      },
      "data": this.state.topSongs
    }
  }
  return configs
}

  render() {
  return (
    <div>
      <ReactFC {...this.chartConfigs()} />
    </div>
        )
  }
}
export default Chart;
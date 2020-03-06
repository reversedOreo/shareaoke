import React from 'react';
import axios from 'axios';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import FusionCharts from 'fusioncharts/core';
import PowerCharts from 'fusioncharts/fusioncharts.powercharts';
import Bar3d from 'fusioncharts/viz/bar3d';
import Pie3d from 'fusioncharts/viz/pie3d';
import FusionTheme from 'fusioncharts/themes/es/fusioncharts.theme.fusion';
import ReactFC from "react-fusioncharts";
ReactFC.fcRoot(FusionCharts, Bar3d, Pie3d, FusionTheme, PowerCharts);

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topSongs: "",
    }
  }
  componentDidMount() {
    this.ArtistsInfo().then((data) => {
      this.setState({
        topSongs: data
      })
    })   
    this.ArtistsInfoFromDatabase().then((data) => {
      this.setState({
        songsFromDataBase: data
      })
    })
  }

  //gets all the artist information from the api and formats it for use in FusionChart
  ArtistsInfo() {
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
            "label": `${character.rank}` + "." + " " + `${character.artist}` + ":" + " " + `${character.title}`,
            "value": `${character["weeks on chart"]}`
          }
          newArr.push(obj)
        });
        return newArr;
      })
  }

  ArtistsInfoFromDatabase() {
    return axios.get("/chart/sqlMusic")
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
            "value": `${character.songCountNumber}`
          }
          newArr.push(obj)
        });
        return newArr;
      })
  }


  chartConfigs() {
    let configs = {
      renderAt: "chart-container",
      type: "bar3d",
      width: "100%",
      height: 400,
      dataFormat: "json",
      dataSource: {
        "chart": {
          "caption": "Billboard's Top 10 Songs - 2020",
          "subCaption": "(Weeks On Chart)",
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
          "theme": "gammel"
        },
        "data": this.state.topSongs
      }
    }
    return configs
  }


  pieChartConfigs() {
    let pieConfigs = {
      renderAt: "chart-container",
      type: "pie3d",
      width: "100%",
      height: 400,
      dataFormat: "json",
      dataSource: {
        "chart": {
          "caption": "Shareaoke Top Songs - 2020",
          "subCaption": "(% Of Downloads in Playlist)",
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
          "theme": "gammel"
        },
        "data": this.state.songsFromDataBase
      }
    }
    return pieConfigs
  }

  render() {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/main">
              Home
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={{
              pathname: '/createplaylist',             
            }}
            >
              Create playlist
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={{
              pathname: '/search',      
            }}
            >
              Search
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={{
              pathname: '/playlists',          
            }}
            >
              Playlists
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={{
              pathname: '/friends',
            }}
            >
              Friends
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      <div>
        <ReactFC {...this.chartConfigs()} />
      </div>
      <div>
          <ReactFC {...this.pieChartConfigs()} />
      </div>
      </div>
    )
  }
}
export default Chart;
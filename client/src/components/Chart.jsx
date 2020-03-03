import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import FusionCharts from 'fusioncharts/core';
import PowerCharts from 'fusioncharts/fusioncharts.powercharts';
import Bar2D from 'fusioncharts/viz/bar2d';
import FusionTheme from 'fusioncharts/themes/es/fusioncharts.theme.fusion';
import ReactFC from "react-fusioncharts";
ReactFC.fcRoot(FusionCharts, Bar2D, FusionTheme, PowerCharts);

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistName: '',
      description: '',
    };
  }

  chartData = 
      [{
      "label": "Sarahah",
      "value": "3880000"
    }, {
      "label": "Messenger",
      "value": "2570000"
    }, {
      "label": "Snake vs Block",
      "value": "2420000"
    }, {
      "label": "Facebook",
      "value": "2140000"
    }, {
      "label": "Amazon",
      "value": "1830000"
    }, {
      "label": "Spotify Music",
      "value": "1540000"
    }, {
      "label": "Netflix",
      "value": "1530000"
    }, {
      "label": "Word Connect",
      "value": "1440000"
    }, {
      "label": "Pandora",
      "value": "1300000"
    }, {
      "label": "WhatsApp Messenger",
      "value": "1210000"
    }]
  
  chartConfigs = {
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
      "data": this.chartData
    }

  }

render(){
  return (
    <div>
      <ReactFC {...this.chartConfigs} />
    </div>
        )
    }
  }

export default Chart;
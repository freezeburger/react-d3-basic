"use strict";

import {
  default as React,
  Component,
  PropTypes,
} from 'react';

import {
  Chart,
  Xaxis,
  Yaxis,
  Grid
} from 'react-d3-core';

import {
  default as xyChart
} from './inherit/xyPlot';

import {
  default as Bar,
} from './components/bar';

import {
  default as CommonProps,
} from './commonProps';

export default class BarChart extends xyChart {

  static defaultProps = Object.assign(CommonProps, {
    onMouseOver: () => {},
    onMouseOut: () => {}
  })

  render() {

    const {
      chartSeries,
      showXGrid,
      showYGrid,
    } = this.props;

    const xDomain = this.mkXDomain();
    const yDomain = this.mkYDomain();

    const xScaleSet = this.mkXScale();
    const yScaleSet = this.mkYScale();
    const chartSeriesData = this.mkSeries();

    if(showXGrid) {
      var xgrid = <Grid type="x" key="xgrid" xDomain={xDomain} {...this.props} />
    }

    if(showYGrid) {
      var ygrid = <Grid type="y" key="ygrid" yDomain={yDomain} {...this.props} />
    }

    if(chartSeries) {
      var bars = chartSeriesData.map((d, i) => {
        return <Bar dataset={d} key={i} {...this.props} xScaleSet= {xScaleSet} yScaleSet= {yScaleSet} chartSeriesData= {chartSeriesData} onMouseOver={this.props.onMouseOver} onMouseOut={this.props.onMouseOut}/>
      })
    }

    return (
      <g>
        {xgrid}
        {ygrid}
        <g ref= "plotGroup">
          {bars}
        </g>
        <Xaxis xDomain={xDomain} {...this.props} />
        <Yaxis yDomain={yDomain} {...this.props} />
      </g>
    )
  }
}

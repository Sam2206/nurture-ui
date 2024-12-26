import SoftBox from 'components/SoftBox';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import Grid from "@mui/material/Grid";

function Charts() {
  const cwcData = {
    labels: ['Reviewed', 'Pending', 'Not Reviewed'],
    datasets: [
      {
        data: [45, 30, 25],
        backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
      },
    ],
  };

  const ocsData = {
    labels: ['0-3 Months', '3-6 Months', '6-12 Months', '1 Year+'],
    datasets: [
      {
        data: [35, 20, 25, 20],
        backgroundColor: ['#2196F3', '#FFC107', '#4CAF50', '#F44336'],
      },
    ],
  };

  return (
      <Grid container spacing={3}>
        <Grid item xs={12} lg={3}>
          <div className="chart" padding="15px !important">
            <h3>Last Review of Child Cases (CWC)</h3>
            <Doughnut data={cwcData} />
          </div>
        </Grid>
        <Grid item xs={12} lg={3}>
          <div className="chart" padding="15px !important">
            <h3>Length of Stay in Child Care (OCS)</h3>
            <Doughnut data={ocsData} />
          </div>
        </Grid>
    </Grid>

  );
}

export default Charts;

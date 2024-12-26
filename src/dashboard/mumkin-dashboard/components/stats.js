import React from 'react';
import Grid from "@mui/material/Grid";

function Stats() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={4}>
        <div className="stat-card" padding="15px">
          <h3>Total Children</h3>
          <p>1200</p>
        </div>
    </Grid>
    <Grid item xs={12} md={6} lg={4}>
        <div className="stat-card" padding="15px">
          <h3>Children Category</h3>
          <p>10</p>
        </div>
    </Grid>
    <Grid item xs={12} md={6} lg={4}>
        <div className="stat-card" padding="15px">
          <h3>Children Engaged</h3>
          <p>750</p>
        </div>
    </Grid>
    </Grid>
  );
}

export default Stats;

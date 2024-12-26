import React, { useEffect, useState, useRef } from 'react';

// @mui material components
import Grid from "@mui/material/Grid";

// BalAsha - Nurture components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DataTable from "examples/Tables/DataTable";

// BalAsha - Nurture example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Charts from "./components/charts";

import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import SalesTable from "examples/Tables/SalesTable";
import Globe from "examples/Globe";

// BalAsha - Nurture base styles
import typography from "assets/theme/base/typography";
import breakpoints from "assets/theme/base/breakpoints";

// Data
import reportsBarChartData from "layouts/dashboards/default/data/reportsBarChartData";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import ProductCell from "layouts/ecommerce/overview/components/ProductCell";
import DefaultCell from "layouts/ecommerce/overview/components/DefaultCell";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import SoftButton from 'components/SoftButton';
import { useNavigate } from "react-router-dom";

const MumkinDashboard = () => {
  const { values } = breakpoints;
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const gridRef = useRef(null);
  const navigate = useNavigate();

  const tableTitles = [
    {Header: "name", accessor: "user", width: "30%"},
    {Header: "category", accessor: "type"},
    {Header: "id", accessor: "status", align: "center"},
    {Header: "action", accessor: "action", align: "center"},
];
async function findAllowedUsers() {
}
const tableDefaultRow = [{
    user: <ProductCell image={team1} name="John Gill"/>,
    type: <DefaultCell>Abondoned</DefaultCell>,
    status: <DefaultCell>21</DefaultCell>,
    action: (
        <><SoftButton variant="gradient" color="info" onClick={() => navigate(`/child/child-workflow/1`)}>
        Open
      </SoftButton>
        </>

    ),
},
{
  user: <ProductCell image={team2} name="Aston"/>,
  type: <DefaultCell>Surrendered</DefaultCell>,
  status: <DefaultCell>22</DefaultCell>,
  action: (
      <>
      <SoftButton variant="gradient" color="info">
        Open
      </SoftButton>
      </>

  ),
},];

const defaultTableData = {
    columns: [...tableTitles],
    rows: [...tableDefaultRow],
};
const [tableContent] = useState(defaultTableData);

useEffect(() => {
    findAllowedUsers()
}, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Grid container>
          <Grid item xs={12} lg={7}>
            <SoftBox mb={3} p={1}>
              <SoftTypography
                variant={"h4"}
                textTransform="capitalize"
                fontWeight="bold"
              >
                general statistics
              </SoftTypography>
            </SoftBox>
          <Grid container>
              <Grid item xs={12}>
                <Globe
                  display={{ xs: "none", md: "block" }}
                  position="absolute"
                  top="10%"
                  right={0}
                  mt={{ xs: -12, lg: 1 }}
                  mr={{ xs: 0, lg: 10 }}
                  canvasStyle={{ marginTop: "3rem" }}
                />
              </Grid>
            </Grid>
          <SoftBox mb={3}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={4}>
                    <MiniStatisticsCard
                      title={{ text: "Total Cases", fontWeight: "medium" }}
                      count="800"
                      percentage={{ color: "success", text: "+5%" }}
                      icon={{ color: "info", component: "public" }}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                <MiniStatisticsCard
                      title={{ text: "Abondoned", fontWeight: "medium" }}
                      count="100"
                      percentage={{ color: "success", text: "+3%" }}
                      icon={{ color: "info", component: "public" }}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                        <MiniStatisticsCard
                          title={{ text: "Surrendered", fontWeight: "medium" }}
                          count="80"
                          percentage={{ color: "error", text: "-2%" }}
                          icon={{ color: "info", component: "public" }}
                        />
                </Grid>
                
              </Grid>
            </SoftBox>
            </Grid>
            <Grid item xs={12} md={10} lg={7}>
            <Grid item xs={12} lg={12}>
            <SoftBox mb={3} p={1}>
              <SoftTypography
                variant={"h4"}
                textTransform="capitalize"
                fontWeight="bold"
              >
                recent cases
              </SoftTypography>
            </SoftBox>
              <SoftBox mb={3} position="relative">
                {/* <SalesTable title="Sales by Country" rows={salesTableData} /> */}
                <DataTable
                    table={tableContent}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    isSorted={false}
                    noEndBorder
                />
              </SoftBox>
            </Grid>
          </Grid>
          <Charts/>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
    
  );
};

export default MumkinDashboard;

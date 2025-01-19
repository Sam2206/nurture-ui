/**
=========================================================
* BalAsha - Nurture - v4.0.2
=========================================================

* Product Page: https://balasha-nurture.web.app/product/soft-ui-dashboard-react
* Copyright 2024 BalAsha - Nurture (https://balasha-nurture.web.app)

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// BalAsha - Nurture components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftSelect from "components/SoftSelect";

// BalAsha - Nurture base styles
import breakpoints from "assets/theme/base/breakpoints";

// BalAsha - Nurture example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function BaseLayout({ stickyNavbar, children }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    window.addEventListener("resize", handleTabsOrientation);

    handleTabsOrientation();

    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  return (
    <SoftBox mt={stickyNavbar ? 3 : 10}>
      <Grid container>
        <Grid item xs={12} sm={6} lg={6}>
          <SoftBox p={3}>
            <SoftTypography variant="h5">Child Registration</SoftTypography>
          </SoftBox>
        </Grid>
        <Grid item xs={12} sm={6} lg={6}>
          <SoftBox display="flex" justifyContent="flex-end">
            <SoftButton variant="gradient" color="info" type="submit">
              Register
            </SoftButton>
          </SoftBox>
          {/* <AppBar position="static">
              <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                <Tab label="Stage1" />
                {/* <Tab label="Social" />
                <Tab label="Notifications" />
                <Tab label="Backup" /> 
              </Tabs>  
            </AppBar> */}
        </Grid>
      </Grid>
      {children}
    </SoftBox>
  );
}

BaseLayout.defaultProps = {
  stickyNavbar: false,
};

BaseLayout.propTypes = {
  stickyNavbar: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default BaseLayout;

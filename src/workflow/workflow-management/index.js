// /**
// =========================================================
// * BalAsha - Nurture - v4.0.2
// =========================================================

// * Product Page: https://balasha-nurture.web.app/product/soft-ui-dashboard-react
// * Copyright 2024 BalAsha - Nurture (https://balasha-nurture.web.app)

// =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// */

//import { useState } from "react";

// @asseinfo/react-kanban components
import Board from "@asseinfo/react-kanban";
import React, { useEffect, useState } from "react";
// @mui material components
import Grid from "@mui/material/Grid";
// html-react-parser components
import parse from "html-react-parser";
// uuid is a library for generating unique id
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";

// @mui material components
import Icon from "@mui/material/Icon";

// BalAsha - Nurture components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftSelect from "components/SoftSelect";
import Card from "@mui/material/Card";

// BalAsha - Nurture example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Data
import { boards } from "workflow/workflow-management/data";
import Step from "workflow/workflow-management/step-creation";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Tooltip from "@mui/material/Tooltip";
import colors from "assets/theme/base/colors";
import DataTable from "examples/Tables/DataTable";

import axiosInstance from "platform/axiosConfig";
// @mui material components
import Checkbox from "@mui/material/Checkbox";
import Workflow from "./workflow-creation";

// Use BoardComponent as you normally would

function WorkFlowMangement() {
  // const [steps, setSteps] = useState([
  //   { id: "1", content: "Police Verification", order: 1, x: 1 },
  //   { id: "2", content: "TV Telecasting", order: 2, x: 2 },
  //   { id: "3", content: "Step 3", order: 3, x: 3 },
  //   { id: "4", content: "Step 4", order: 4, x: 4 },
  // ]);

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <SoftBox py={3}>
        <Grid container spacing={2}>
          <Grid item xs={6} lg={6}>
            <Step />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Workflow />
          </Grid>
        </Grid>
      </SoftBox>

      <Footer />
    </DashboardLayout>
  );
}

export default WorkFlowMangement;

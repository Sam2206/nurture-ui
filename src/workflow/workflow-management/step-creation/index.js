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

// @mui material components
import Icon from "@mui/material/Icon";

// BalAsha - Nurture components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftSelect from "components/SoftSelect";

// BalAsha - Nurture example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import axiosInstance from "platform/axiosConfig";

// Kanban application components
import Header from "workflow/workflow-management/components/Header";

// Data
import { board2 } from "workflow/workflow-management/data";
import step from "assets/theme/components/stepper/step";

function Step() {
  const [formValue, setFormValue] = useState(null);
  const [stepName, setStepName] = useState("");
  const [stepDescription, setStepDescription] = useState("");
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const response = await axios.get("/api/steps");
        setSteps(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSteps();
  }, []);

  const handelStepValue = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    const newStep = {
      stepName,
      stepDescription,
    };

    alert(JSON.stringify(newStep, null, 2));

    const locationsUri = "/api/step";
    axiosInstance
      .post(locationsUri, newStep)
      .then((data) => {
        setMessage(`Step created successfully: ${JSON.stringify(response.data)}`);
        // Reset form fields
        setStepName("");
        setStepDescription("");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <SoftBox py={3}>
        <SoftBox
          position="relative"
          my={4}
          sx={({ palette: { light }, functions: { pxToRem }, borders: { borderRadius } }) => ({
            "& .react-kanban-column": {
              backgroundColor: light.main,
              width: pxToRem(450),
              margin: `0 ${pxToRem(10)}`,
              padding: pxToRem(20),
              borderRadius: borderRadius.lg,
            },
          })}
        >
          <Board
            initialBoard={board2}
            allowAddCard
            allowAddColumn
            renderColumnHeader={({ id, title }, { addCard }) => (
              <>
                <SoftBox display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                  <SoftTypography variant="h6">{title}</SoftTypography>
                  <SoftButton
                    size="small"
                    variant="gradient"
                    color="dark"
                    onClick={handelStepValue}
                  >
                    create
                  </SoftButton>
                </SoftBox>

                <SoftBox
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-end"
                  height="100%"
                  component="form"
                  role="form"
                >
                  <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Step Name
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    type="text"
                    value={stepName}
                    placeholder="Enter Name"
                    onChange={(e) => {
                      setStepName(e.target.value);
                    }}
                  />

                  <SoftBox mb={1} mt={2.5} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Step Description
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    type="text"
                    value={stepDescription}
                    onChange={({ currentTarget }) => {
                      setStepDescription(currentTarget.value);
                    }}
                    multiline
                    inputProps={{ rows: 2 }}
                    placeholder="Enter Description"
                  />
                </SoftBox>
              </>
            )}
          />
        </SoftBox>
      </SoftBox>
    </>
  );
}

export default Step;

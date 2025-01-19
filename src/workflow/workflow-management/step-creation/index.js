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

import { Formik, Form, Field, ErrorMessage } from "formik";

import axiosInstance from "platform/axiosConfig";

function Step() {
  const [formValue, setFormValue] = useState(null);
  const [stepName, setStepName] = useState("");
  const [stepDescription, setStepDescription] = useState("");
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const initialValues = {
    stepName: stepName,
    stepDescription: stepDescription,
  };
  const validationSchema = Yup.object({
    stepName: Yup.string().required("Step name is required."),
    stepDescription: Yup.string().required("Step description is required."),
  });

  const createStep = async (event, { resetForm }) => {
    let newStep = {
      stepName: event.stepName,
      stepDescription: event.stepDescription,
    };

    alert(JSON.stringify(newStep, null, 2));

    const locationsUri = "/api/v1/steps";
    axiosInstance
      .post(locationsUri, newStep)
      .then((data) => {
        alert(JSON.stringify("Step created successfully"));
        resetForm();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={createStep}>
      {({ isSubmitting }) => (
        <Form>
          <SoftBox
            margin={2}
            position="relative"
            my={4}
            sx={{
              backgroundColor: "#f0f0f0",
              borderRadius: 3,
              padding: 3,
            }}
          >
            <>
              <SoftBox display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <SoftTypography variant="h6">{"Create Steps"}</SoftTypography>
                <SoftButton size="small" variant="gradient" color="dark" type="submit">
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
                <Field name="stepName" as={SoftInput} placeholder="Enter step name" />
                <ErrorMessage
                  name="stepName"
                  component={SoftTypography}
                  color="error"
                  variant="caption"
                />

                <SoftBox mb={1} mt={2.5} ml={0.5} lineHeight={0} display="inline-block">
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Step Description
                  </SoftTypography>
                </SoftBox>
                <Field
                  name="stepDescription"
                  as={SoftInput}
                  placeholder="Enter Step description"
                  multiline
                  rows={2}
                />
                <ErrorMessage
                  name="stepDescription"
                  component={SoftTypography}
                  color="error"
                  variant="caption"
                />
              </SoftBox>
            </>
          </SoftBox>
        </Form>
      )}
    </Formik>
  );
}

export default Step;

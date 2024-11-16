/**
=========================================================
* BalAsha - Nurture - v4.0.2
=========================================================

* Product Page: https://balasha-nurture.web.app/product/soft-ui-dashboard-react
* Copyright 2024 BalAsha - Nurture (https://balasha-nurture.web.app)

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// formik components
import { Formik, Form } from "formik";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

// BalAsha - Nurture components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";

// BalAsha - Nurture example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// NewUser page components
import ChildInfo from "user/new-user/components/UserInfo";
import Address from "layouts/pages/users/new-user/components/Address";
import Socials from "layouts/pages/users/new-user/components/Socials";
import Profile from "layouts/pages/users/new-user/components/Profile";

// NewUser layout schemas for form and form feilds
import form from "user/new-user/schemas/form";
import initialValues from "user/new-user/schemas/initialValues";


function EmployeeRegistration() {
  const { formId, formField } = form;

  const submitForm = async (values, actions) => {
    // Simulate a submission delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Display the form values in an alert
    alert(JSON.stringify(values, null, 2));

    // Reset the form after submission
    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3} mb={20}>
        <Grid container justifyContent="center" sx={{ height: "100%" }}>
          <Grid item xs={12} lg={8}>
            <Formik
              initialValues={initialValues}
              onSubmit={submitForm}
            >
              {({ values, errors, touched, isSubmitting }) => (
                <Form id={formId} autoComplete="off">
                  <Card sx={{ height: "100%" }}>
                    <SoftBox p={2}>
                      <SoftBox>
                        <ChildInfo formData={{ values, touched, formField, errors }} />
                        <SoftBox mt={2} width="100%" display="flex" justifyContent="flex-end">
                          <SoftButton
                            disabled={isSubmitting}
                            type="submit"
                            variant="gradient"
                            color="dark"
                          >
                            Submit
                          </SoftButton>
                        </SoftBox>
                      </SoftBox>
                    </SoftBox>
                  </Card>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}


export default EmployeeRegistration;

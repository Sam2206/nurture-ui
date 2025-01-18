/**
=========================================================
* BalAsha - Nurture - v4.0.2
=========================================================

* Product Page: https://balasha-nurture.web.app/product/soft-ui-dashboard-react
* Copyright 2024 BalAsha - Nurture (https://balasha-nurture.web.app)

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useContext } from "react";

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
// import UserInfo from "layouts/pages/users/new-user/components/UserInfo";
import UserInfo from "layouts/pages/profile/my-profile/edit-user/components/UserInfo";
import Address from "layouts/pages/profile/my-profile/edit-user/components/Address";
import Socials from "layouts/pages/profile/my-profile/edit-user/components/Socials";
import Profile from "layouts/pages/profile/my-profile/edit-user/components/Profile";
import Header from "layouts/pages/profile/components/Header";

// NewUser layout schemas for form and form feilds
import validations from "layouts/pages/profile/my-profile/edit-user/schemas/validations";
import form from "layouts/pages/profile/my-profile/edit-user/schemas/form";
import initialValues from "layouts/pages/profile/my-profile/edit-user/schemas/initialValues";
import { UserContext } from "custom/UserContext";

import axiosInstance from "platform/axiosConfig.js";

function getSteps() {
  return ["User Info", "Address"];
}

function getStepContent(stepIndex, formData, updateUserInfoDetail, updateAdressDetail) {
  switch (stepIndex) {
    case 0:
      return <UserInfo formData={formData} updateUserInfoDetail={updateUserInfoDetail} />;
    case 1:
      return <Address formData={formData} updateAdressDetail={updateAdressDetail} />;
    default:
      return null;
  }
}

function NewUser() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const { formId, formField } = form;
  const currentValidation = validations[activeStep];
  const isLastStep = activeStep === steps.length - 1;
  const [data, setData] = useState("");
  const [user, setUser] = useState("");
  const [idProofType, setIdProofType] = useState("Adhar");
  const [state, setState] = useState(null);
  const userSessionDetail = useContext(UserContext);

  const updateUserInfoDetail = (idProofType_) => {
    setIdProofType(idProofType_);
  };
  const updateAdressDetail = (state_) => {
    setState(state_);
  };

  const sleep = (ms) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  const handleBack = () => setActiveStep(activeStep - 1);

  const submitForm = async (values, actions) => {
    await sleep(1000);

    let userDetail = values;
    userDetail = {
      ...userDetail, // Spread the previous state
      idProofType: idProofType, // Add or update properties
      userEmail: userSessionDetail.userEmail,
    };
    let userDetaill = {
      userName: userDetail.userName,
      mobileNo: userDetail.mobileNo,
      idDtls: userDetail.idDtls,
      address: {
        address1: userDetail.address1,
        address2: userDetail.address2,
        city: userDetail.city,
        zip: userDetail.zip,
      },
      idProofType: idProofType, // Add or update properties
      userEmail: userSessionDetail.userEmail,
    };
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(userDetaill, null, 2));

    const locationsUri = "/update-user";
    axiosInstance
      .put(locationsUri, userDetaill)
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSubmit = (values, actions) => {
    if (isLastStep) {
      submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <Header />
      <SoftBox py={3} mb={20}>
        <Grid container justifyContent="center" sx={{ height: "100%" }}>
          <Grid item xs={12} lg={8}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Formik
              initialValues={initialValues}
              validationSchema={currentValidation}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, isSubmitting }) => (
                <Form id={formId} autoComplete="off">
                  <Card sx={{ height: "100%" }}>
                    <SoftBox p={2}>
                      <SoftBox>
                        {getStepContent(
                          activeStep,
                          {
                            values,
                            touched,
                            formField,
                            errors,
                          },
                          updateUserInfoDetail,
                          updateAdressDetail
                        )}
                        <SoftBox mt={2} width="100%" display="flex" justifyContent="space-between">
                          {activeStep === 0 ? (
                            <SoftBox />
                          ) : (
                            <SoftButton variant="gradient" color="light" onClick={handleBack}>
                              back
                            </SoftButton>
                          )}
                          <SoftButton
                            // disabled={isSubmitting}
                            type="submit"
                            variant="gradient"
                            color="dark"
                          >
                            {isLastStep ? "send" : "next"}
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

export default NewUser;

import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import CollapsibleCard from "components/CollapsibleCard";
import BasicInfo from "child/child-registration/components/BasicInfo";
import BaseLayout from "child/child-registration/components/BaseLayout";
import initialValues from "./components/Schema/initialValues";
import form from "./components/Schema/form";
import axiosInstance from "platform/axiosConfig.js";
import { format } from "date-fns";

const currentValidation = {};

const ChildRegistration = () => {
  const [expandedbasic, setExpandedBasic] = useState(true);
  const [expandedother, setExpandedOther] = useState(false);

  const handleExpandBasicClick = () => setExpandedBasic(!expandedbasic);
  const handleExpandOtherClick = () => setExpandedOther(!expandedother);

  const handleSubmit = (values) => {
    alert(JSON.stringify(values, null, 2));

    let chidInfo = {
      name: values.fullName,
      genderId: values.gender,
      dateOfBirth: values.dob ? format(new Date(values.dob), "yyyy-MM-dd") : "",
      cwcCaseNumber: values.cwcCaseNumber,
      caseHistory: values.caseHistory,
      category: {
        categoryId: values.childClassification,
      },
      cciAdmissionNumber: values.cciAdmissionNumber,
      shelterHomeId: values.shelterHome,
    };

    const locationsUri = "/api/v1/children";
    axiosInstance
      .post(locationsUri, chidInfo)
      .then((data) => {})
      .catch((err) => {
        console.error(err);
      });
  };
  const { formId, formFields } = form;

  return (
    <Formik
      initialValues={initialValues}
      //   validationSchema={currentValidation}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched }) => (
        <Form id={formId} autoComplete="off">
          <BaseLayout>
            <SoftBox mt={4}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <SoftBox mb={3}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <CollapsibleCard
                          title="Basic Info"
                          expanded={expandedbasic}
                          onExpandClick={handleExpandBasicClick}
                        >
                          <BasicInfo
                            formData={{
                              formFields,
                              values,
                              errors,
                              touched,
                            }}
                          />
                        </CollapsibleCard>
                      </Grid>
                      <Grid item xs={12}>
                        <CollapsibleCard
                          title="Other Info"
                          expanded={expandedother}
                          onExpandClick={handleExpandOtherClick}
                        >
                          {/* <BasicInfo />{" "} */}
                        </CollapsibleCard>
                      </Grid>
                    </Grid>
                  </SoftBox>
                </Grid>
              </Grid>
            </SoftBox>
          </BaseLayout>
        </Form>
      )}
    </Formik>
  );
};

export default ChildRegistration;

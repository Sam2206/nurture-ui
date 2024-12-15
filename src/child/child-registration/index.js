import React, { useEffect, useState } from "react";
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
import { useLocation } from "react-router-dom";

const currentValidation = {};

const ChildRegistration = () => {
  const location = useLocation();
  const [childId, setChildId] = useState(null);
  let [childDetails, setChildDetails] = useState(null);

  const [expandedbasic, setExpandedBasic] = useState(true);
  const [expandedother, setExpandedOther] = useState(false);

  const handleExpandBasicClick = () => setExpandedBasic(!expandedbasic);
  const handleExpandOtherClick = () => setExpandedOther(!expandedother);

  useEffect(() => {
    setChildId(location.state?.childId);
    console.log("hiii 1");
  }, [location.state]);

  useEffect(() => {
    const getChildById = async () => {
      try {
        const locationsUri = "/api/v1/children/";
        const data = await axiosInstance.get(locationsUri + childId);
        const values = data.data;

        if (values) {
          let childInfo = {
            fullName: values.name,
            gender: values.genderId,
            dob: values.dateOfBirth ? format(new Date(values.dateOfBirth), "yyyy-MM-dd") : "",
            cwcCaseNumber: values.cwcCaseNumber,
            caseHistory: values.caseHistory,
            childClassification: values.category?.categoryId,
            cciAdmissionNumber: values.cciAdmissionNumber,
            shelterHome: values.shelterHomeId,
          };

          setChildDetails(childInfo);
          console.log(childInfo);
        }
      } catch (err) {
        console.log("unable to fetch");
        console.error(err);
      }
    };

    if (childId) {
      getChildById();
      console.log("hiii 2 " + childId);
    }
  }, [childId]);

  const handleSubmit = (values) => {
    let chidInfo = {
      childId: childId ? childId : undefined,
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
    alert(JSON.stringify(chidInfo, null, 2));

    const locationsUri = "/api/v1/children";
    axiosInstance
      .post(locationsUri, chidInfo)
      .then((data) => {
        alert(JSON.stringify("Sucessfull", null, 2));
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const { formId, formFields } = form;

  return (
    <Formik
      initialValues={childDetails || initialValues}
      //   validationSchema={currentValidation}
      enableReinitialize={true}
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

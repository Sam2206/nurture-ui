import { useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import SoftDatePicker from "components/SoftDatePicker";
import SoftTypography from "components/SoftTypography";
import SoftSelect from "components/SoftSelect";
import FormField from "child/child-registration/components/FormField";
import stage1Data from "./data/data";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
import { Field } from "formik";
import SoftSelectCustom from "../SoftSelectCustom";
import SoftDatePickerCustom from "../SoftDatePickerCustom";

function BasicInfo({ formData }) {
  const [skills, setSkills] = useState([]);
  const { formFields, values, errors, touched } = formData;
  const {
    fullName,
    dob,
    gender,
    childClassification,
    cwcCaseNumber,
    cciAdmissionNumber,
    aadharNumber,
    reasonForAdmission,
    caseHistory,
    healthStatus,
    shelterHome,
    currentStatus,
    siblings,
    remark,
  } = formFields;
  const {
    fullName: fullNameV,
    dob: dobV,
    gender: genderV,
    childClassification: childClassificationV,
    cwcCaseNumber: cwcCaseNumberV,
    cciAdmissionNumber: cciAdmissionNumberV,
    aadharNumber: aadharNumberV,
    reasonForAdmission: reasonForAdmissionV,
    caseHistory: caseHistoryV,
    healthStatus: healthStatusV,
    shelterHome: shelterHomeV,
    currentStatus: currentStatusV,
    siblings: siblingsV,
    remark: remarkV,
  } = values;
  const setF = (v) => {
    console.log(v.target.value);
    console.log(values);
  };

  return (
    <>
      <SoftBox pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Field
              name={fullName.name}
              label={fullName.label}
              placeholder="Enter child's full name"
              required
              component={FormField}
              value={fullNameV}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              {dob.label}
            </SoftTypography>
            <Field
              name={dob.name}
              label="Date of Birth"
              placeholder="DD/MM/YYYY"
              value={dobV}
              component={SoftDatePickerCustom}
            />
          </Grid>

          {/* File upload commented */}
          {/* 
    <Grid item xs={12} sm={6}>
      <input accept="image/*" id="upload-avatar-pic" type="file" hidden />
      <label htmlFor="upload-avatar-pic">
        <IconButton component="span">
          <Avatar />
        </IconButton>
      </label>
    </Grid>
    */}

          <Grid item xs={12} sm={6}>
            <Field
              name={gender.name}
              label={gender.label}
              placeholder="Select Gender"
              required
              options={stage1Data.gender}
              value={genderV}
              component={SoftSelectCustom}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Field
              name={childClassification.name}
              label={childClassification.label}
              options={stage1Data.childClassification}
              value={childClassificationV}
              required
              component={SoftSelectCustom}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Field
              name={cwcCaseNumber.name}
              label="CWC Case Number"
              placeholder="Enter case number"
              inputProps={{ type: "number" }}
              value={cwcCaseNumberV}
              component={FormField}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Field
              name={cciAdmissionNumber.name}
              label="CCI Admission Number"
              placeholder="Enter admission number"
              value={cciAdmissionNumberV}
              component={FormField}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Field
              name={healthStatus.name}
              label="Health Status"
              options={stage1Data.healthStatus}
              value={healthStatusV}
              component={SoftSelectCustom}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Field
              name={shelterHome.name}
              label="Shelter Home"
              options={stage1Data.shelterHome}
              value={shelterHomeV}
              component={SoftSelectCustom}
            />
          </Grid>

          <Grid item xs={12}>
            <Field
              name={reasonForAdmission.name}
              label="Reason for Admission"
              placeholder="Enter reason (2-3 sentences)"
              value={reasonForAdmissionV}
              component={FormField}
            />
          </Grid>

          <Grid item xs={12}>
            <Field
              name={caseHistory.name}
              label="Case History"
              placeholder="Enter case history"
              value={caseHistoryV}
              component={FormField}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Field
              name={aadharNumber.name}
              label="Aadhar Number"
              placeholder="Enter Aadhar number"
              value={aadharNumberV}
              component={FormField}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Field
              name={siblings.name}
              label="Siblings"
              options={stage1Data.yesNo}
              value={siblingsV}
              component={SoftSelectCustom}
            />
          </Grid>

          <Grid item xs={12}>
            <Field
              name={remark.name}
              label="Remark"
              placeholder="If siblings, provide details"
              value={remarkV}
              component={FormField}
            />
          </Grid>
        </Grid>
      </SoftBox>
    </>
  );
}
BasicInfo.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default BasicInfo;

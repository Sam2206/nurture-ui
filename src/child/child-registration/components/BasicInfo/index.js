import { useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftSelect from "components/SoftSelect";
import FormField from "child/child-registration/components/FormField";
import stage1Data from "./data/data";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

function Stage1Info() {
  const [skills, setSkills] = useState([]);

  return (
    <Card id="child-registration" sx={{ overflow: "visible" }}>
      {/* <SoftBox p={3}>
        <SoftTypography variant="h5">Child Registration</SoftTypography>
      </SoftBox> */}
      <SoftBox component="form" pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField label="Full Name" placeholder="Enter child's full name" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField label="Date of Birth" placeholder="DD/MM/YYYY" />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <input accept="image/*" id="upload-avatar-pic" type="file" hidden />
            <label htmlFor="upload-avatar-pic">
              <IconButton component="span">
                <Avatar />
              </IconButton>
            </label>
          </Grid> */}
          <Grid item xs={12} sm={6}>
            <SoftSelect placeholder="Select Gender" options={stage1Data.gender} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SoftSelect
              placeholder="Choose Child Classification"
              options={stage1Data.childClassification}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label="CWC Case Number"
              placeholder="Enter case number"
              inputProps={{ type: "number" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField label="CCI Admission Number" placeholder="Enter admission number" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label="Aadhar Number"
              placeholder="Enter Aadhar number"
              inputProps={{ type: "number" }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormField label="Reason for Admission" placeholder="Enter reason (2-3 sentences)" />
          </Grid>
          <Grid item xs={12}>
            <FormField label="Case History" placeholder="Enter case history" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SoftSelect placeholder="Health Status" options={stage1Data.healthStatus} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SoftSelect placeholder="Shelter Home" options={stage1Data.shelterHome} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SoftSelect placeholder="Current Status" options={stage1Data.currentStatus} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SoftSelect placeholder="Siblings?" options={stage1Data.yesNo} />
          </Grid>
          <Grid item xs={12}>
            <FormField label="Remark" placeholder="If siblings, provide details" />
          </Grid>
        </Grid>
      </SoftBox>
    </Card>
  );
}

export default Stage1Info;

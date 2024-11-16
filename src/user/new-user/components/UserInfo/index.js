/**
=========================================================
* BalAsha - Nurture - v4.0.2
=========================================================

* Product Page: https://balasha-nurture.web.app/product/soft-ui-dashboard-react
* Copyright 2024 BalAsha - Nurture (https://balasha-nurture.web.app)

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// BalAsha - Nurture components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// NewUser page components
import FormField from "layouts/pages/users/new-user/components/FormField";

function ChildInfo({ formData }) {
  const { formField, values, errors, touched } = formData;
  const { employeeName,
          employeeType,
          email,
          address,
          city,
          state,
          pinCode,
          dob,
          contactNumber,
          emergencyContact,
          idProof
  } = formField;
  const {
    employeeName: employeeNameV,
    employeeType: employeeTypeV,
    email: emailV,
    address: addressV,
    city: cityV,
    state: stateV,
    pinCode: pinCodeV,
    dob: dobV,
    contactNumber: contactNumberV,
    emergencyContact: emergencyContactV,
    idProof: idProofV
  } = values;

  return (
    <SoftBox>
      <SoftBox lineHeight={0}>
        <SoftTypography variant="h5" fontWeight="bold">
          Profile
        </SoftTypography>
      </SoftBox>
      <SoftBox mt={1.625}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={employeeType.type}
              label={employeeType.label}
              name={employeeType.name}
              value={employeeTypeV}
              placeholder={employeeType.placeholder}
              error={errors.employeeType && touched.employeeType}
              success={employeeType.length > 0 && !errors.employeeType}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={employeeName.type}
              label={employeeName.label}
              name={employeeName.name}
              value={employeeNameV}
              placeholder={employeeName.placeholder}
              error={errors.employeeName && touched.employeeName}
              success={employeeName.length > 0 && !errors.employeeName}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={email.type}
              label={email.label}
              name={email.name}
              value={emailV}
              placeholder={email.placeholder}
              error={errors.email && touched.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={dob.type}
              label={dob.label}
              name={dob.name}
              value={dobV}
              placeholder={dob.placeholder}
              error={errors.dob && touched.dob}
              success={dob.length > 0 && !touched.dob}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={address.type}
              label={address.label}
              name={address.name}
              value={addressV}
              placeholder={address.placeholder}
              error={errors.address && touched.address}
              success={address.length > 0 && !errors.address}
              inputProps={{ autoComplete: "" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={city.type}
              label={city.label}
              name={city.name}
              value={cityV}
              placeholder={city.placeholder}
              error={errors.city && touched.city}
              success={city.length > 0 && !errors.city}
              inputProps={{ autoComplete: "" }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={state.type}
              label={state.label}
              name={state.name}
              value={stateV}
              placeholder={state.placeholder}
              error={errors.state && touched.state}
              success={state.length > 0 && !errors.state}
              inputProps={{ autoComplete: "" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={pinCode.type}
              label={pinCode.label}
              name={pinCode.name}
              value={pinCodeV}
              placeholder={pinCode.placeholder}
              error={errors.pinCode && touched.pinCode}
              success={pinCode.length > 0 && !errors.pinCode}
              inputProps={{ autoComplete: "" }}
            />
          </Grid>
       </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={contactNumber.type}
              label={contactNumber.label}
              name={contactNumber.name}
              value={contactNumberV}
              placeholder={contactNumber.placeholder}
              error={errors.contactNumber && touched.contactNumber}
              success={contactNumber.length > 0 && !errors.contactNumber}
              inputProps={{ autoComplete: "" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={emergencyContact.type}
              label={emergencyContact.label}
              name={emergencyContact.name}
              value={emergencyContactV}
              placeholder={emergencyContact.placeholder}
              error={errors.emergencyContact && touched.emergencyContact}
              success={emergencyContact.length > 0 && !errors.emergencyContact}
              inputProps={{ autoComplete: "" }}
            />
          </Grid>
       </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={idProof.type}
              label={idProof.label}
              name={idProof.name}
              value={idProofV}
              placeholder={idProof.placeholder}
              error={errors.idProof && touched.idProof}
              success={idProof.length > 0 && !errors.idProof}
              inputProps={{ autoComplete: "" }}
            />
          </Grid>
       </Grid>
      </SoftBox>
    </SoftBox>
  );
}

// typechecking props for UserInfo
ChildInfo.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default ChildInfo;

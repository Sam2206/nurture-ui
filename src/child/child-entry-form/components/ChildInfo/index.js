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
  const { firstName, lastName, childId, category, age, address1, address2, city, zip, registrationDate, lastParentContact, currentStatus, exitDate, exitReason, lastCWCReviewDate, reviewStatus } = formField;
  const {
    firstName: firstNameV,
    lastName: lastNameV,
    childId: childIdV,
    category: categoryV,
    age: ageV,
    address1: address1V,
    address2: address2V,
    city: cityV,
    zip: zipV,
    registrationDate: registrationDateV,
    lastParentContact: lastParentContactV,
    currentStatus: currentStatusV,
    exitDate: exitDateV,
    exitReason: exitReasonV,
    lastCWCReviewDate: lastCWCReviewDateV,
    reviewStatus: reviewStatusV
  } = values;

  return (
    <SoftBox>
      <SoftBox lineHeight={0}>
        <SoftTypography variant="h5" fontWeight="bold">
          Child Entry Form
        </SoftTypography>
        <SoftTypography variant="button" fontWeight="regular" color="text">
          Mandatory informations
        </SoftTypography>
      </SoftBox>
      <SoftBox mt={1.625}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={firstName.type}
              label={firstName.label}
              name={firstName.name}
              value={firstNameV}
              placeholder={firstName.placeholder}
              error={errors.firstName && touched.firstName}
              success={firstNameV.length > 0 && !errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={lastName.type}
              label={lastName.label}
              name={lastName.name}
              value={lastNameV}
              placeholder={lastName.placeholder}
              error={errors.lastName && touched.lastName}
              success={lastNameV.length > 0 && !errors.lastName}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={childId.type}
              label={childId.label}
              name={childId.name}
              value={childIdV}
              placeholder={childId.placeholder}
              error={errors.childId && touched.childId}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={category.type}
              label={category.label}
              name={category.name}
              value={categoryV}
              placeholder={category.placeholder}
              error={errors.category && touched.category}
              success={categoryV.length > 0 && !category.email}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={age.type}
              label={age.label}
              name={age.name}
              value={ageV}
              placeholder={age.placeholder}
              error={errors.age && touched.age}
              success={age.length > 0 && !errors.age}
              inputProps={{ autoComplete: "" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={registrationDate.type}
              label={registrationDate.label}
              name={registrationDate.name}
              value={registrationDateV}
              placeholder={registrationDate.placeholder}
              error={errors.registrationDate && touched.registrationDate}
              success={registrationDate.length > 0 && !errors.registrationDate}
              inputProps={{ autoComplete: "" }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={address1.type}
              label={address1.label}
              name={address1.name}
              value={address1V}
              placeholder={address1.placeholder}
              error={errors.address1 && touched.address1}
              success={address1.length > 0 && !errors.address1}
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
              type={lastParentContact.type}
              label={lastParentContact.label}
              name={lastParentContact.name}
              value={lastParentContactV}
              placeholder={lastParentContact.placeholder}
              error={errors.lastParentContact && touched.lastParentContact}
              success={lastParentContact.length > 0 && !errors.lastParentContact}
              inputProps={{ autoComplete: "" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={currentStatus.type}
              label={currentStatus.label}
              name={currentStatus.name}
              value={currentStatusV}
              placeholder={currentStatus.placeholder}
              error={errors.currentStatus && touched.currentStatus}
              success={currentStatus.length > 0 && !errors.currentStatus}
              inputProps={{ autoComplete: "" }}
            />
          </Grid>
       </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={exitDate.type}
              label={exitDate.label}
              name={exitDate.name}
              value={exitDateV}
              placeholder={exitDate.placeholder}
              error={errors.exitDate && touched.exitDate}
              success={exitDate.length > 0 && !errors.exitDate}
              inputProps={{ autoComplete: "" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={exitReason.type}
              label={exitReason.label}
              name={exitReason.name}
              value={exitReasonV}
              placeholder={exitReason.placeholder}
              error={errors.exitReason && touched.exitReason}
              success={exitReason.length > 0 && !errors.exitReason}
              inputProps={{ autoComplete: "" }}
            />
          </Grid>
       </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={lastCWCReviewDate.type}
              label={lastCWCReviewDate.label}
              name={lastCWCReviewDate.name}
              value={lastCWCReviewDateV}
              placeholder={lastCWCReviewDate.placeholder}
              error={errors.lastCWCReviewDate && touched.lastCWCReviewDate}
              success={lastCWCReviewDate.length > 0 && !errors.lastCWCReviewDate}
              inputProps={{ autoComplete: "" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={reviewStatus.type}
              label={reviewStatus.label}
              name={reviewStatus.name}
              value={reviewStatusV}
              placeholder={reviewStatus.placeholder}
              error={errors.reviewStatus && touched.reviewStatus}
              success={reviewStatus.length > 0 && !errors.reviewStatus}
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

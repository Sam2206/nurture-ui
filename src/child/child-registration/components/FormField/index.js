import PropTypes from "prop-types";
import SoftBox from "components/SoftBox"; // Make sure SoftBox is imported from the correct path
import SoftTypography from "components/SoftTypography"; // Import SoftTypography
import SoftInput from "components/SoftInput"; // Import SoftInput

function FormField({ label, field, form, ...rest }) {
  const { touched, errors } = form;
  const error = touched[field.name] && errors[field.name]; // Get error message for this field

  return (
    <SoftBox display="flex" flexDirection="column" justifyContent="flex-end" height="100%">
      <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
        <SoftTypography
          component="label"
          variant="caption"
          fontWeight="bold"
          textTransform="capitalize"
        >
          {label}
        </SoftTypography>
      </SoftBox>

      {/* Input field with Formik's `field` props spread */}
      <SoftInput
        {...field} // Spread Formik's field props (name, value, onChange, onBlur)
        {...rest} // Spread any additional props (like placeholder, type, etc.)
      />

      {/* Display error message if there's any validation error */}
      {error && (
        <SoftBox mt={0.5}>
          <SoftTypography variant="caption" color="error">
            {error}
          </SoftTypography>
        </SoftBox>
      )}
    </SoftBox>
  );
}

// Default props
FormField.defaultProps = {
  label: " ", // Default value for label if not provided
};

// Prop validation for FormField component
FormField.propTypes = {
  label: PropTypes.string,
  field: PropTypes.object.isRequired, // Formik's field props
  form: PropTypes.object.isRequired, // Formik's form props
};

export default FormField;

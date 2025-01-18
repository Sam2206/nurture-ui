import { forwardRef } from "react";
import PropTypes from "prop-types";
import Select from "react-select"; // react-select for custom select component
import colors from "assets/theme/base/colors"; // Custom theme colors
import styles from "components/SoftSelect/styles"; // Custom styles for SoftSelect
import SoftBox from "components/SoftBox"; // Make sure SoftBox is imported from the correct path
import SoftTypography from "components/SoftTypography"; // Import SoftTypography

// SoftSelect component wrapped with forwardRef for ref forwarding
const SoftSelectCustom = forwardRef(
  ({ size, error, success, field, form, label, options, ...rest }, ref) => {
    const { light } = colors;

    // Extract error and touched for this specific field from Formik
    const errorMessage =
      form.errors[field.name] && form.touched[field.name] ? form.errors[field.name] : null;

    return (
      <div>
        {/* Optional Label */}
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

        {/* react-select Component */}
        <Select
          {...field} // Formik field props (name, value, onChange, etc.)
          {...rest} // Any additional props passed to SoftSelect
          ref={ref}
          styles={styles(size, error, success)} // Custom styles based on size, error, success
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary25: light.main, // Background for options when hovered
              primary: light.main, // Border color for select input
            },
          })}
          options={options} // Array of options for the select
          //isClearable // Enable clearing of selection
          value={options.find((option) => option.value === field.value)} // Set the selected value
          onChange={(selectedOption) => {
            form.setFieldValue(field.name, selectedOption ? selectedOption.value : null); // Update Formik field value on select
          }}
        />

        {/* Error Message Display */}
        {errorMessage && (
          <div style={{ color: "red", marginTop: "5px", fontSize: "12px" }}>{errorMessage}</div>
        )}
      </div>
    );
  }
);

// Setting default values for the props of SoftSelect
SoftSelectCustom.defaultProps = {
  size: "medium",
  error: false,
  success: false,
  label: "",
  options: [],
};

// Typechecking props for SoftSelect
SoftSelectCustom.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  error: PropTypes.bool,
  success: PropTypes.bool,
  field: PropTypes.object.isRequired, // Formik's field props
  form: PropTypes.object.isRequired, // Formik's form props
  label: PropTypes.string, // Optional label for the select
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired, // Array of options for the select component
};

export default SoftSelectCustom;

import PropTypes from "prop-types";
import Flatpickr from "react-flatpickr"; // Import Flatpickr
import "flatpickr/dist/flatpickr.css"; // Import Flatpickr styles
import SoftInput from "components/SoftInput"; // Assuming you have this custom input component

function SoftDatePickerCustom({ field, form, placeholder, ...rest }) {
  // When the date changes, update Formik's state using setFieldValue
  const handleDateChange = ([date]) => {
    form.setFieldValue(field.name, date); // Update Formik's value for the field
  };

  return (
    <Flatpickr
      {...rest}
      value={field.value || ""} // Bind the field value to Flatpickr's value
      onChange={handleDateChange} // Handle date changes and update Formik's state
      placeholder={placeholder} // Pass placeholder to Flatpickr
      render={({ defaultValue }, ref) => (
        <SoftInput
          {...field}
          defaultValue={defaultValue}
          inputRef={ref}
          placeholder={placeholder} // Explicitly pass the placeholder to SoftInput
        />
      )}
    />
  );
}

// Default Props for SoftDatePickerCustom
SoftDatePickerCustom.defaultProps = {
  input: {},
  placeholder: "DD/MM/YYYY", // Default placeholder if not provided
};

// Prop validation for SoftDatePickerCustom
SoftDatePickerCustom.propTypes = {
  field: PropTypes.object.isRequired, // Required field prop from Formik
  form: PropTypes.object.isRequired, // Required form prop from Formik
  placeholder: PropTypes.string, // Accept placeholder as a string
};

export default SoftDatePickerCustom;

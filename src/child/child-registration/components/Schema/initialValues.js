import form from "./form"; // Import the form structure

const {
  formFields: {
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
  },
} = form;

const initialValues = {
  [fullName.name]: "", // Set initial values to empty strings or the default values
  [dob.name]: "",
  [gender.name]: "",
  [childClassification.name]: "",
  [cwcCaseNumber.name]: "",
  [cciAdmissionNumber.name]: "",
  [aadharNumber.name]: "",
  [reasonForAdmission.name]: "",
  [caseHistory.name]: "",
  [healthStatus.name]: "",
  [shelterHome.name]: "",
  [currentStatus.name]: "",
  [siblings.name]: "",
  [remark.name]: "",
};

export default initialValues;

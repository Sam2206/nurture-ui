/**
=========================================================
* BalAsha - Nurture - v4.0.2
=========================================================

* Product Page: https://balasha-nurture.web.app/product/soft-ui-dashboard-react
* Copyright 2024 BalAsha - Nurture (https://balasha-nurture.web.app)

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

const form = {
  formId: "new-user-form",
  formField: {
    employeeName: {
      name: "employeeName",
      label: "Employee Name",
      type: "text",
      placeholder: "John Doe",
      errorMsg: "Employee name is required.",
    },
    employeeType: {
      name: "employeeType",
      label: "Employee Type",
      type: "text",
      placeholder: "Superintendent",
      errorMsg: "Employee Type is required.",
    },
    email: {
      name: "email",
      label: "Email Id",
      type: "text",
      placeholder: "email id",
      errorMsg: "email id is required.",
    },
    address: {
      name: "address",
      label: "Address",
      type: "text",
      placeholder: "eg. Street 111",
      errorMsg: "Address is required.",
    },
    city: {
      name: "city",
      label: "City",
      type: "text",
      placeholder: "eg. Tokyo",
      errorMsg: "City is required.",
    },
    state: {
      name: "state",
      label: "State",
      type: "text",
      placeholder: "State",
      errorMsg: "state is required.",
      invalidMsg: "",
    },
    pinCode: {
      name: "pinCode",
      label: "Pin Code",
      type: "text",
      placeholder: "Pin Code",
      errorMsg: "Pin Code is required.",
    },
    dob: {
      name: "dob",
      label: "DOB",
      type: "text",
      placeholder: "DOB",
      errorMsg: "",
    },
    contactNumber: {
      name: "contactNumber",
      label: "Contact Number",
      type: "text",
      placeholder: "Contact Number",
      errorMsg: "Contact Number is required.",
    },
    emergencyContact: {
      name: "emergencyContact",
      label: "Emergency Contact",
      type: "text",
      placeholder: "Emergency Contact",
      errorMsg: "Emergency Contact is required.",
    },
    idProof: {
      name: "idProof",
      label: "ID Proof",
      placeholder: "Adhar",
      errorMsg: "ID Proof is required.",
    },
  },
};

export default form;

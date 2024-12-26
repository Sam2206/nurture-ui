/**
=========================================================
* BalAsha - Nurture - v4.0.2
=========================================================

* Product Page: https://balasha-nurture.web.app/product/soft-ui-dashboard-react
* Copyright 2024 BalAsha - Nurture (https://balasha-nurture.web.app)

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import checkout from "user/new-user/schemas/form";

const {
  formField: {
    employeeName,
    employeeType,
    email,
    address,
    city,
    state,
    pinCode,
    dob,
    contactNumber,
    emergencyContact,
    idProof,
  },
} = checkout;

const initialValues = {
  [employeeName.name]: "",
  [employeeType.name]: "",
  [email.name]: "",
  [address.name]: "",
  [city.name]: "",
  [state.name]: "",
  [pinCode.name]: "",
  [dob.name]: "",
  [contactNumber.name]: "",
  [emergencyContact.name]: "",
  [idProof.name]: "",
};

export default initialValues;

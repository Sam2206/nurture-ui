/**
=========================================================
* BalAsha - Nurture - v4.0.2
=========================================================

* Product Page: https://balasha-nurture.web.app/product/soft-ui-dashboard-react
* Copyright 2024 BalAsha - Nurture (https://balasha-nurture.web.app)

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import checkout from "child/child-entry-form/schemas/form";

const {
  formField: {
    firstName,
    lastName,
    childId,
    category,
    age,
    address1,
    address2,
    city,
    zip,
    registrationDate,
    lastParentContact,
    currentStatus,
    exitDate,
    exitReason,
    lastCWCReviewDate,
    reviewStatus,
  },
} = checkout;

const initialValues = {
  [firstName.name]: "",
  [lastName.name]: "",
  [childId.name]: "",
  [category.name]: "",
  [age.name]: "",
  [address1.name]: "",
  [address2.name]: "",
  [city.name]: "",
  [zip.name]: "",
  [registrationDate.name]: "",
  [lastParentContact.name]: "",
  [currentStatus.name]: "",
  [exitDate.name]: "",
  [exitReason.name]: "",
  [lastCWCReviewDate.name]: "",
  [reviewStatus.name]: "",
};

export default initialValues;

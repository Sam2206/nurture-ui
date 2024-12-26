/**
=========================================================
* BalAsha - Nurture - v4.0.2
=========================================================

* Product Page: https://balasha-nurture.web.app/product/soft-ui-dashboard-react
* Copyright 2024 BalAsha - Nurture (https://balasha-nurture.web.app)

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import * as Yup from "yup";
import checkout from "child/child-entry-form/schemas/form";

const {
  formField: { firstName, lastName, registrationDate, address1, city, zip, childId, category, age, lastParentContact, currentStatus, exitDate, exitReason, lastCWCReviewDate, reviewStatus },
} = checkout;

const validations = [
  Yup.object().shape({
    [firstName.name]: Yup.string().required(firstName.errorMsg),
    [lastName.name]: Yup.string().required(lastName.errorMsg),
    [registrationDate.name]: Yup.string().required(registrationDate.errorMsg),
    [address1.name]: Yup.string().required(address1.errorMsg),
    [city.name]: Yup.string().required(city.errorMsg),
    [zip.name]: Yup.string().required(zip.errorMsg).min(6, zip.invalidMsg),
    [childId.name]: Yup.string().required(childId.errorMsg),
    [category.name]: Yup.string().required(category.errorMsg),
    [age.name]: Yup.string().required(age.errorMsg),
    [lastParentContact.name]: Yup.string().required(lastParentContact.errorMsg),
    [currentStatus.name]: Yup.string().required(currentStatus.errorMsg),
    [exitDate.name]: Yup.string().required(exitDate.errorMsg),
    [exitReason.name]: Yup.string().required(exitDate.errorMsg),
    [lastCWCReviewDate.name]: Yup.string().required(lastCWCReviewDate.errorMsg),
    [reviewStatus.name]: Yup.string().required(reviewStatus.errorMsg),
  }),
];

export default validations;

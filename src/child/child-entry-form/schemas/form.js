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
    firstName: {
      name: "firstName",
      label: "first name",
      type: "text",
      placeholder: "eg. Micheal",
      errorMsg: "First name is required.",
    },
    lastName: {
      name: "lastName",
      label: "last name",
      type: "text",
      placeholder: "eg. Prior",
      errorMsg: "Last name is required.",
    },
    childId: {
      name: "childId",
      label: "child id",
      type: "text",
      placeholder: "child id",
      errorMsg: "child id is required.",
    },
    category: {
      name: "category",
      label: "category",
      type: "text",
      placeholder: "category",
      errorMsg: "category is required.",
    },
    age: {
      name: "age",
      label: "age",
      type: "age",
      placeholder: "age",
      errorMsg: "age is required.",
    },
    address1: {
      name: "address1",
      label: "address 1",
      type: "text",
      placeholder: "eg. Street 111",
      errorMsg: "Address is required.",
    },
    address2: {
      name: "address2",
      label: "address 2",
      type: "text",
      placeholder: "eg. Street 221",
    },
    city: {
      name: "city",
      label: "city",
      type: "text",
      placeholder: "eg. Tokyo",
      errorMsg: "City is required.",
    },
    zip: {
      name: "zip",
      label: "zip",
      type: "number",
      placeholder: "7 letters",
      errorMsg: "Zip is required.",
      invalidMsg: "Zipcode is not valie (e.g. 70000).",
    },
    registrationDate: {
      name: "registrationDate",
      label: "registration date",
      type: "text",
      placeholder: "Registration Date",
      errorMsg: "Registration date is required.",
    },
    lastParentContact: {
      name: "lastParentContact",
      label: "last parent contact",
      type: "text",
      placeholder: "",
      errorMsg: "last parent contact is required.",
    },
    currentStatus: {
      name: "currentStatus",
      label: "current status",
      type: "text",
      placeholder: "",
      errorMsg: "Current Status is required.",
    },
    exitDate: {
      name: "exitDate",
      label: "Exit Date",
      type: "text",
      placeholder: "",
      errorMsg: "exit date is required.",
    },
    exitReason: {
      name: "exitReason",
      label: "exit reason",
      placeholder: "",
      errorMsg: "exit reason is required.",
    },
    lastCWCReviewDate: {
       name: "lastCWCReviewDate",
       label: "last CWC review date",
       placeholder: "",
       errorMsg: "CWC review date is required.",
    },
    reviewStatus: {
        name: "reviewStatus",
        label: "review Status",
        placeholder: "",
        errorMsg: "Review Status is required.",
    },
  },
};

export default form;

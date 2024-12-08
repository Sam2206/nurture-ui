/**
=========================================================
* BalAsha - Nurture - v4.0.2
=========================================================

* Product Page: https://balasha-nurture.web.app/product/soft-ui-dashboard-react
* Copyright 2024 BalAsha - Nurture (https://balasha-nurture.web.app)

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

const gridColumns = [
  { Header: "Child ID", accessor: "childId", width: "10%" },
  { Header: "Name", accessor: "name", width: "20%" },
  {
    Header: "Gender",
    accessor: "gender",
    width: "10%",
  },
  { Header: "Date of Birth", accessor: "dateOfBirth", width: "15%" },
  {
    Header: "Category",
    accessor: "category",
    width: "20%",
  },
  {
    Header: "CWC Case Number",
    accessor: "cwcCaseNumber",
    width: "15%",
  },
  {
    Header: "Shelter Home",
    accessor: "shelterHome",
    width: "10%",
  },
  {
    Header: "CCI Admission No.",
    accessor: "cciAdmissionNumber",
    width: "15%",
  },
  {
    Header: "Case History",
    accessor: "caseHistory",
    width: "25%",
  },
];

export default gridColumns;

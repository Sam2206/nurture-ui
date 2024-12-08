import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import stage1Data from "child/child-registration/components/BasicInfo/data/data";
import axiosInstance from "platform/axiosConfig.js";
import { useEffect, useState } from "react";
import gridColumns from "./data/dataTableData";

function ChildrenList() {
  const [dataList, setDataList] = useState(null);

  useEffect(() => {
    const fetchChildrenData = async () => {
      try {
        const response = await axiosInstance.get("/api/v1/children");
        const childrenData = response.data || [];

        const formattedRows = childrenData.map((child) => ({
          childId: child.childId || "N/A",
          name: child.name || "N/A",
          gender: child.genderId === 1 ? "Male" : "Female",
          dateOfBirth: child.dateOfBirth || "N/A",
          cwcCaseNumber: child.cwcCaseNumber || "N/A",
          caseHistory: child.caseHistory || "N/A",
          category:
            stage1Data.childClassification.find((cat) => cat.value === child.category?.categoryId)
              ?.label || "N/A",
          cciAdmissionNumber: child.cciAdmissionNumber || "N/A",
          shelterHome:
            stage1Data.shelterHome?.find((home) => home.value === child.shelterHomeId)?.label ||
            "N/A",
        }));

        setDataList({
          columns: gridColumns,
          rows: formattedRows,
        });
      } catch (err) {
        console.error("Error fetching children data:", err);
      }
    };

    fetchChildrenData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox pt={6} pb={3}>
        <Card>
          <SoftBox p={3} lineHeight={1}>
            <SoftTypography variant="h5" fontWeight="medium">
              All Registered Children
            </SoftTypography>
          </SoftBox>
          {dataList && <DataTable table={dataList} canSearch />}
        </Card>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ChildrenList;

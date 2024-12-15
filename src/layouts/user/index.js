/**
 =========================================================
 * BalAsha - Nurture - v4.0.2
 =========================================================

 * Product Page: https://balasha-nurture.web.app/product/soft-ui-dashboard-react
 * Copyright 2024 BalAsha - Nurture (https://balasha-nurture.web.app)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// BalAsha - Nurture components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// BalAsha - Nurture example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Overview page components
// Data
import dataTableData from "layouts/ecommerce/overview/data/dataTableData";
import nikeV22 from "assets/images/ecommerce/blue-shoe.jpeg";
import AllowedUserCell from "./AllowedUserCell";
import RefundsCell from "layouts/ecommerce/overview/components/RefundsCell";
import DefaultCell from "layouts/ecommerce/overview/components/DefaultCell";
import React, { useEffect, useState } from "react";
import Icon from "@mui/material/Icon";
import axiosInstance from "../../platform/axiosConfig";
import SoftButton from "../../components/SoftButton";
import SoftBadgeDot from "../../components/SoftBadgeDot";
import SoftSelect from "../../components/SoftSelect";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SoftInput from "../../components/SoftInput";
import SoftSnackbar from "../../components/SoftSnackbar";

function AllowedUserOverview() {
  async function findAllowedUsers() {
    try {
      const allowedUserUri = "/api/v1/allowed-users/findAll";

      axiosInstance
        .get(allowedUserUri)
        .then((res) => {
          let data = res.data;
          let transformedValues = data.map((allowedUser) => {
            function isActive() {
              return allowedUser.status === "ACTIVE";
            }

            function dotColor() {
              return isActive() ? "success" : "error";
            }

            function disableUser() {
              const disableUserUri = "/api/v1/allowed-users/disable?userId=" + allowedUser.userid;
              axiosInstance
                .post(disableUserUri)
                .then((res) => {
                  findAllowedUsers();
                })
                .catch((err) => {
                  console.error(err);
                });
            }

            function enableUser() {
              const enableUserUri = "/api/v1/allowed-users/activate?userId=" + allowedUser.userid;
              axiosInstance
                .post(enableUserUri)
                .then((res) => {
                  findAllowedUsers();
                })
                .catch((err) => {
                  console.error(err);
                });
            }

            function getType() {
              const updateUserType = (event) => {
                const updateUserType =
                  "/api/v1/allowed-users/update-type?userId=" +
                  allowedUser.userid +
                  "&type=" +
                  event.value;
                axiosInstance
                  .post(updateUserType)
                  .then((res) => {
                    findAllowedUsers();
                    setLastUpdatedUserDetails({ ...allowedUser, usertype: event.value });
                    setSuccessSB(true);
                  })
                  .catch((err) => {
                    console.error(err);
                  });
              };

              return (
                <SoftSelect
                  placeholder={allowedUser.usertype}
                  options={[
                    { value: "ADMIN", label: "ADMIN" },
                    { value: "SUPERINTENDENT", label: "SUPERINTENDENT" },
                    { value: "WORKER", label: "WORKER" },
                  ]}
                  onChange={updateUserType}
                />
              );
            }

            function profilePicture() {
              if (allowedUser.profilePictureUrl) {
                return allowedUser.profilePictureUrl;
              }
              return nikeV22;
            }

            return {
              user: <AllowedUserCell image={profilePicture()} email={allowedUser.email} />,
              type: getType(),
              status: (
                <DefaultCell>
                  <SoftBadgeDot badgeContent={allowedUser.status} color={dotColor()} />
                </DefaultCell>
              ),
              action: isActive() ? (
                <SoftButton color="error" onClick={disableUser}>
                  DISABLE
                </SoftButton>
              ) : (
                <SoftButton color="success" onClick={enableUser}>
                  ENABLE
                </SoftButton>
              ),
            };
          });
          setTableContent({
            columns: [...tableTitles],
            rows: [...transformedValues],
          });
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const tableTitles = [
    { Header: "user", accessor: "user", width: "30%" },
    { Header: "type", accessor: "type" },
    { Header: "status", accessor: "status", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ];

  const tableDefaultRow = [
    {
      user: <AllowedUserCell image={nikeV22} email="nike@gmail.com" />,
      type: <DefaultCell>ADMIN</DefaultCell>,
      status: <DefaultCell>ACTIVE</DefaultCell>,
      action: (
        <>
          <Icon fontSize="default" sx={{ cursor: "pointer" }} onClick={findAllowedUsers}>
            Click Here
          </Icon>
          <RefundsCell
            value={13}
            icon={{ color: "success", name: "keyboard_arrow_up" }}
            tooltip="Refund rate is lower with 97% than other products"
          />
        </>
      ),
    },
  ];

  const defaultTableData = {
    columns: [...tableTitles],
    rows: [...tableDefaultRow],
  };

  const [tableContent, setTableContent] = useState(defaultTableData);

  useEffect(() => {
    findAllowedUsers();
  }, []);

  const [open, setOpen] = useState(false);
  const [dialogValues, setDialogValues] = useState({
    emailId: "enter email address",
    type: "ADMIN",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    const addAllowedUserUri = "/api/v1/allowed-users/add";

    axiosInstance
      .post(addAllowedUserUri, dialogValues)
      .then((res) => {
        let data = res.data;
        setOpen(false);
        findAllowedUsers();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleEmailChange = (event) => {
    const { name, value } = event.target;
    setDialogValues({ ...dialogValues, [name]: value });
  };

  const handleTypeChange = (event) => {
    setDialogValues({ ...dialogValues, type: event.value });
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const [successSB, setSuccessSB] = useState(false);
  const [lastUpdatedUserDetails, setLastUpdatedUserDetails] = useState({});
  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);

  const successNotification = (
    <SoftSnackbar
      color="success"
      icon="check"
      title="User details updated"
      content={
        "User Type has been updated to " +
        lastUpdatedUserDetails.type +
        " for " +
        lastUpdatedUserDetails.emailId
      }
      dateTime="1 Second ago"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <SoftBox pt={3} px={3}>
                <Grid item container spacing={20} justify="flex-end" alignItems="center">
                  <Grid item xs={4} sm={4}>
                    <SoftTypography variant="h6" fontWeight="medium">
                      Allowed list of Users
                    </SoftTypography>
                  </Grid>
                  <Grid item xs={4} sm={4} />

                  <Grid item xs={4} sm={4} container justify="flex-end" alignItems="center">
                    <Grid item xs={4} sm={4} />
                    <Grid item xs={4} sm={4} />
                    <SoftButton onClick={handleClickOpen} variant="text" color="success">
                      <b>+ </b> Add User
                    </SoftButton>
                    <Dialog
                      fullWidth
                      maxWidth="xs"
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="dialog-title"
                      fullScreen={fullScreen}
                    >
                      <DialogTitle id="dialog-title">Add New User</DialogTitle>
                      <DialogContent>
                        <SoftBox mb={2} minWidth={1}>
                          <SoftInput
                            name="emailId"
                            type="email"
                            placeholder={dialogValues.emailId}
                            onChange={handleEmailChange}
                          />
                        </SoftBox>
                        <SoftBox mb={4}>
                          <SoftSelect
                            placeholder={dialogValues.type}
                            options={[
                              { value: "ADMIN", label: "ADMIN" },
                              { value: "SUPERINTENDENT", label: "SUPERINTENDENT" },
                              { value: "WORKER", label: "WORKER" },
                            ]}
                            onChange={handleTypeChange}
                          />
                        </SoftBox>
                        <SoftBox />
                      </DialogContent>
                      <DialogActions>
                        <SoftButton onClick={handleAdd} color="primary">
                          Add
                        </SoftButton>
                        <SoftButton onClick={handleClose} color="primary">
                          Close
                        </SoftButton>
                      </DialogActions>
                    </Dialog>
                  </Grid>
                </Grid>
              </SoftBox>

              <SoftBox py={1}>
                <DataTable
                  table={tableContent}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  isSorted={false}
                  noEndBorder
                />
              </SoftBox>
            </Card>
          </Grid>
        </Grid>
      </SoftBox>
      {successSB && successNotification}
      <Footer />
    </DashboardLayout>
  );
}

export default AllowedUserOverview;

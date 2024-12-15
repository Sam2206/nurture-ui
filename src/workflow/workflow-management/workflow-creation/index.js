// /**
// =========================================================
// * BalAsha - Nurture - v4.0.2
// =========================================================

// * Product Page: https://balasha-nurture.web.app/product/soft-ui-dashboard-react
// * Copyright 2024 BalAsha - Nurture (https://balasha-nurture.web.app)

// =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// */

//import { useState } from "react";

// @asseinfo/react-kanban components
import Board from "@asseinfo/react-kanban";
import React, { useEffect, useState } from "react";
// @mui material components
import Grid from "@mui/material/Grid";
// html-react-parser components
import parse from "html-react-parser";
// uuid is a library for generating unique id
import { v4 as uuidv4 } from "uuid";

// @mui material components
import Icon from "@mui/material/Icon";

// BalAsha - Nurture components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftSelect from "components/SoftSelect";

// BalAsha - Nurture example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Kanban application components
import Header from "workflow/workflow-management/components/Header";

// Data
import { boards } from "workflow/workflow-management/data";
import Card from "workflow/workflow-management/components/Card";

import axiosInstance from "platform/axiosConfig";

function Workflow() {
  const [newCardForm, setNewCardForm] = useState(false);
  const [formValue, setFormValue] = useState(null);
  const [workflowName, setWorkflowName] = useState("");
  const [workflowDescription, setWorkFlowDescription] = useState("");
  const [workflow, setWorkflow] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    const fetchWorkflow = async () => {
      try {
        const response = await axiosInstance.get("/api/step");
        setWorkflow(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkflow();
  }, [isFormSubmitted]);

  const openNewCardForm = (event, id) => setNewCardForm(id);
  const closeNewCardForm = () => setNewCardForm(false);

  const handleSetFormValue = async (event) => {
    event.preventDefault();

    const newWorkflow = {
      workflowName: StepName,
      workflowDescription: StepDescription,
    };

    alert(JSON.stringify(userDetaill, null, 2));

    const locationsUri = "/api/workflows";
    try {
      const response = await axiosInstance.post(locationsUri, newWorkflow);
      setMessage(`Workflow created successfully: ${JSON.stringify(response.data)}`);
      setStepName("");
      setStepDescription("");

      setIsFormSubmitted(!isFormSubmitted);
    } catch (err) {
      console.error(err);
      setMessage("Failed to create workflow.");
    }
  };

  return (
    <SoftBox py={3}>
      <SoftBox
        position="relative"
        my={4}
        sx={({ palette: { light }, functions: { pxToRem }, borders: { borderRadius } }) => ({
          "& .react-kanban-column": {
            backgroundColor: light.main,
            width: pxToRem(450),
            margin: `0 ${pxToRem(10)}`,
            padding: pxToRem(20),
            borderRadius: borderRadius.lg,
          },
        })}
      >
        <Board
          initialBoard={boards}
          allowAddCard
          allowAddColumn
          renderColumnHeader={({ id, title }, { addCard }) => (
            <>
              <SoftBox display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <SoftTypography variant="h6">{title}</SoftTypography>
                <SoftButton size="small" onClick={(event) => openNewCardForm(event, id)}>
                  <Icon sx={{ fontWeight: "bold", color: ({ palette: { dark } }) => dark.main }}>
                    add
                  </Icon>
                </SoftButton>
                <SoftButton size="small" variant="gradient" color="dark" onClick={handelStepValue}>
                  create
                </SoftButton>
              </SoftBox>

              <SoftBox
                display="flex"
                flexDirection="column"
                justifyContent="flex-end"
                height="100%"
                component="form"
                role="form"
              >
                <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Workflow Name
                  </SoftTypography>
                </SoftBox>
                <SoftInput
                  type="text"
                  value={workflowName}
                  onChange={(e) => setWorkflowName(e.target.value)}
                  required
                  placeholder="Enter Name"
                />

                <SoftBox mb={1} mt={2.5} ml={0.5} lineHeight={0} display="inline-block">
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Workflow Description
                  </SoftTypography>
                </SoftBox>
                <SoftInput
                  value={workflowDescription}
                  onChange={(e) => setWorkFlowDescription(e.target.value)}
                  required
                  multiline
                  inputProps={{ rows: 2 }}
                  placeholder="Enter Description"
                />
              </SoftBox>
              <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Workflow
                </SoftTypography>
              </SoftBox>

              {newCardForm === id ? (
                <SoftBox my={2.5}>
                  {/* <SoftInput
                      value={formValue}
                      inputProps={{ rows: 2 }}
                      onChange={handeSetFormValue}
                      multiline
                    /> */}

                  <SoftSelect
                    placeholder="Select Workflow"
                    options={boards.Workflow}
                    onChange={handeSetFormValue}
                    variant="gradient"
                  />

                  <SoftBox display="flex" mt={2}>
                    <SoftButton
                      variant="gradient"
                      color="success"
                      size="small"
                      onClick={() => {
                        addCard({ id: uuidv4(), template: formValue });
                        setFormValue("");
                      }}
                    >
                      add
                    </SoftButton>
                    <SoftBox ml={1}>
                      <SoftButton
                        variant="gradient"
                        color="light"
                        size="small"
                        onClick={closeNewCardForm}
                      >
                        cancel
                      </SoftButton>
                    </SoftBox>
                  </SoftBox>
                </SoftBox>
              ) : null}
            </>
          )}
          renderCard={({ id, template }, { dragging }) => (
            <>
              <SoftBox
                key={id}
                dragging={dragging.toString() || undefined}
                display="block"
                width="calc(450px - 40px)"
                bgColor="white"
                color="text"
                borderRadius="md"
                mt={2.5}
                py={1.875}
                px={1.875}
                lineHeight={1.5}
                sx={{
                  fontSize: ({ typography: { size } }) => size.md,
                }}
              >
                {typeof template === "string" ? parse(template) : template}
              </SoftBox>
            </>
          )}
          onCardNew={() => null}
        />
      </SoftBox>

      {/* <SoftBox>
        <SoftBox
          position="relative"
          my={4}
          sx={({ palette: { light }, functions: { pxToRem }, borders: { borderRadius } }) => ({
            "& .react-kanban-column": {
              backgroundColor: light.main,
              width: pxToRem(450),
              margin: `0 ${pxToRem(10)}`,
              padding: pxToRem(20),
              borderRadius: borderRadius.lg,
            },
          })}
        >
          <Board
            initialBoard={boards}
            allowAddCard
            allowAddColumn
            renderColumnHeader={({ id, title }, {}) => {
              return (
                <>
                  <SoftBox display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <SoftTypography variant="h6">{title}</SoftTypography>
                  </SoftBox>
                  <SoftBox>
                    {loading ? (
                      <p>Loading Workflow...</p>
                    ) : error ? (
                      <p>Error: {error}</p>
                    ) : Workflow && Workflow.length > 0 ? (
                      Workflow.map(({ stepId, stepName, stepDescription }) => (
                        <SoftBox
                          key={stepId}
                          display="block"
                          width="calc(450px - 40px)"
                          bgColor="white"
                          color="text"
                          borderRadius="md"
                          mt={2.5}
                          py={1.875}
                          px={1.875}
                          lineHeight={1.5}
                          sx={{
                            fontSize: ({ typography: { size } }) => size.md,
                          }}
                        >
                          <h3>{stepName}</h3>
                          <p>{stepDescription}</p>
                        </SoftBox>
                      ))
                    ) : (
                      ""
                    )}
                  </SoftBox>
                </>
              );
            }}
            onCardNew={() => null}
          />
        </SoftBox>
      </SoftBox> */}

      {/* <SoftBox>
        <SoftBox
          position="relative"
          my={4}
          sx={({ palette: { light }, functions: { pxToRem }, borders: { borderRadius } }) => ({
            "& .react-kanban-column": {
              backgroundColor: light.main,
              width: pxToRem(450),
              margin: `0 ${pxToRem(10)}`,
              padding: pxToRem(20),
              borderRadius: borderRadius.lg,
            },
          })}
        >
          <Board
            initialBoard={boards}
            allowAddCard
            allowAddColumn
            renderColumnHeader={({ id, title }, {}) => {
              return (
                <>
                  <SoftBox display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <SoftTypography variant="h6">{title}</SoftTypography>
                  </SoftBox>
                  <SoftBox>
                    {loading ? (
                      <p>Loading Workflow...</p>
                    ) : error ? (
                      <p>Error: {error}</p>
                    ) : Workflow && Workflow.length > 0 ? (
                      Workflow.map(({ stepId, stepName, stepDescription }) => (
                        <SoftBox
                          key={stepId}
                          display="block"
                          width="calc(450px - 40px)"
                          bgColor="white"
                          color="text"
                          borderRadius="md"
                          mt={2.5}
                          py={1.875}
                          px={1.875}
                          lineHeight={1.5}
                          sx={{
                            fontSize: ({ typography: { size } }) => size.md,
                          }}
                        >
                          <h3>{stepName}</h3>
                          <p>{stepDescription}</p>
                        </SoftBox>
                      ))
                    ) : (
                      ""
                    )}
                  </SoftBox>
                </>
              );
            }}
            onCardNew={() => null}
          />
        </SoftBox>
      </SoftBox> */}
    </SoftBox>
  );
}

export default WorkFlow;

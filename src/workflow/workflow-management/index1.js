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

// Data
import { boards } from "workflow/workflow-management/data";
import Step from "workflow/workflow-management/step-creation";
import Card from "workflow/workflow-management/components/Card";

import axiosInstance from "platform/axiosConfig";

// Use BoardComponent as you normally would

function WorkFlow() {
  const [newCardForm, setNewCardForm] = useState(false);
  const [formValue, setFormValue] = useState("");
  const [workflowName, setWorkflowName] = useState("");
  const [workflowDescription, setWorkFlowDescription] = useState("");
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [columns, setColumns] = useState([
    {
      id: "col1",
      title: "New Workflow",
      cards: [
        { id: "card1", template: "Police Verification" },
        { id: "card2", template: "News Paper Publication" },
        { id: "card3", template: "Test3" },
      ],
    },
  ]);

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const response = await axiosInstance.get("/api/step");
        setSteps(response.data);
        console.log(response.data[0] + "hhhh" + steps);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSteps();
  }, [isFormSubmitted]);

  const openNewCardForm = (event, id) => setNewCardForm(id);
  const closeNewCardForm = () => setNewCardForm(false);

  const handeSetFormValue = (currentTarget) => setFormValue(currentTarget.value);

  var currentIndex = 1;
  // const handleCardDragEnd = () => {
  //   currentIndex = 1;
  // };
  // Function to update sequence numbers after cards are rearranged
  const updateSequence = (columnId) => {
    setColumns((prevColumns) => {
      const updatedColumns = prevColumns.map((column) => {
        if (column.id === columnId) {
          const updatedCards = column.cards.map((card, index) => ({
            ...card,
            sequence: index + 1, // Assign sequence from 1 to n
          }));

          return { ...column, cards: updatedCards };
        }
        return column;
      });

      return updatedColumns;
    });
  };

  const handleCardDragEnd = (source, destination) => {
    if (!destination) return;

    // Reorder the cards in the column based on the drag-and-drop action
    const columnId = source.fromColumnId;
    const sourceIndex = source.index;
    const destinationIndex = destination.index;

    setColumns((prevColumns) => {
      const updatedColumns = prevColumns.map((column) => {
        if (column.id === columnId) {
          const updatedCards = [...column.cards];
          const [movedCard] = updatedCards.splice(sourceIndex, 1);
          updatedCards.splice(destinationIndex, 0, movedCard);

          return { ...column, cards: updatedCards };
        }
        return column;
      });

      return updatedColumns;
    });

    // Update the sequence after the drag operation
    updateSequence(columnId);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <SoftBox py={3}>
        <Grid container spacing={2}>
          <Grid item xs={6} lg={6}>
            <Step />
          </Grid>
          <Grid item xs={12} lg={6}>
            <SoftBox>
              <SoftBox
                position="relative"
                my={4}
                sx={({
                  palette: { light },
                  functions: { pxToRem },
                  borders: { borderRadius },
                }) => ({
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
                        <SoftBox
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          mb={3}
                        >
                          <SoftTypography variant="h6">Steps</SoftTypography>
                        </SoftBox>
                        <SoftBox>
                          {loading ? (
                            <p>Loading steps...</p>
                          ) : error ? (
                            <p>Error: {error}</p>
                          ) : steps && steps.length > 0 ? (
                            steps.map(({ stepId, stepName, stepDescription }) => (
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
            </SoftBox>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6} lg={6}>
              <SoftBox
                position="relative"
                my={4}
                sx={({
                  palette: { light },
                  functions: { pxToRem },
                  borders: { borderRadius },
                }) => ({
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
                  initialBoard={columns}
                  allowAddCard
                  allowAddColumn
                  onCardDragEnd={handleCardDragEnd}
                  renderColumnHeader={({ id, title }, { addCard }) => (
                    <>
                      <SoftBox
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={3}
                      >
                        <SoftTypography variant="h6">{title}</SoftTypography>
                        <SoftButton size="small" onClick={(event) => openNewCardForm(event, id)}>
                          <Icon
                            sx={{ fontWeight: "bold", color: ({ palette: { dark } }) => dark.main }}
                          >
                            add
                          </Icon>
                        </SoftButton>
                        <SoftButton size="small" variant="gradient" color="dark">
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
                          Steps
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
                            placeholder="Select Steps"
                            options={boards.steps}
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
                  renderCard={({ id, template, sequence }, { dragging }) => {
                    return (
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
                          {/* {!dragging && currentIndex++} */}
                          {sequence}
                          {typeof template === "string" ? parse(template) : template}
                        </SoftBox>
                      </>
                    );
                  }}
                  onCardNew={() => null}
                />
              </SoftBox>
            </Grid>

            <Grid item xs={12} lg={6}>
              <SoftBox>
                <SoftBox
                  position="relative"
                  my={4}
                  sx={({
                    palette: { light },
                    functions: { pxToRem },
                    borders: { borderRadius },
                  }) => ({
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
                          <SoftBox
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={3}
                          >
                            <SoftTypography variant="h6">Workflows</SoftTypography>
                          </SoftBox>
                          <SoftBox>
                            {loading ? (
                              <p>Loading steps...</p>
                            ) : error ? (
                              <p>Error: {error}</p>
                            ) : steps && steps.length > 0 ? (
                              steps.map(({ stepId, stepName, stepDescription }) => (
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
              </SoftBox>
            </Grid>
          </Grid>
        </Grid>
      </SoftBox>

      {/* <SoftBox
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
      ></SoftBox> */}

      <Footer />
    </DashboardLayout>
  );
}

export default WorkFlow;

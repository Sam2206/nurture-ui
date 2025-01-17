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
import Card from "@mui/material/Card";
import * as Yup from "yup";

import axiosInstance from "platform/axiosConfig";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";

function Workflow() {
  const [newCardForm, setNewCardForm] = useState(false);
  const [formValue, setFormValue] = useState("");
  const [workflowName, setWorkflowName] = useState("");
  const [workflowDescription, setWorkFlowDescription] = useState("");
  const [steps, setSteps] = useState([]);
  const [stepDropDown, setStepDropDown] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const initialValues = {
    workflowName: workflowName,
    workflowDescription: workflowDescription,
    steps: steps,
  };

  const validationSchema = Yup.object({
    workflowName: Yup.string().required("Workflow name is required."),
    workflowDescription: Yup.string().required("Workflow description is required."),
  });

  const [serializedValue, setSerializedValue] = useState("");
  const [deserializedValue, setDeserializedValue] = useState([]);

  const serializeInput = (inputData) => {
    const grouped = inputData.reduce((acc, item) => {
      if (!acc[item.x]) acc[item.x] = [];
      acc[item.x].push(item);
      return acc;
    }, {});

    const serialized = Object.values(grouped).flatMap((group, index) =>
      group.map((item) => ({
        stepId: item.id,
        stepOrder: index + 1,
      }))
    );
    return serialized;
  };

  const deserializeInput = () => {
    const serializedArray = JSON.parse(serializedValue);
    const deserialized = serializedArray.map((item) => {
      const original = inputData.find((input) => input.id === item.id);
      return {
        ...original,
        order: item.stepOrder,
      };
    });
    setDeserializedValue(deserialized);
  };

  const createWorkflow = (values) => {
    const ss = serializeInput(steps);
    console.log(ss);
    const worflowDTO = {
      workflowDesc: values.workflowDescription,
      workflowName: values.workflowName,
      WorkflowStepMapping: ss,
    };
    alert(JSON.stringify(worflowDTO, null, 2));

    const locationsUri = "/api/v1/workflows";
    axiosInstance
      .post(locationsUri, worflowDTO)
      .then((data) => {
        alert(JSON.stringify("Workflow created successfully"));
        resetForm();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const response = await axiosInstance.get("/api/v1/steps");
        const formattedSteps = response.data.map((step) => ({
          label: step.stepName,
          value: step.stepId,
        }));

        setStepDropDown(formattedSteps);
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

  const addNewStepCard = (step) => {
    const lastStep = steps[steps.length - 1];
    const newOrder = lastStep ? lastStep.order + 1 : 1;
    if (steps.some((s) => s.id === step.value + "")) {
      alert(JSON.stringify("Step already added"));
      return;
    }
    step.value;
    const newStep = {
      id: step.value + "",
      content: step.label,
      order: newOrder,
      x: newOrder,
    };

    setSteps((prevSteps) => [...prevSteps, newStep]);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;
    if (source.index === destination.index) return;

    reorderSteps(source.index, destination.index);

    setSteps((prevSteps) => prevSteps.map((step) => ({ ...step, markNextAsParallel: false })));
  };

  const reorderSteps = (sourceIndex, destinationIndex) => {
    const reorderedSteps = Array.from(steps);
    const [movedStep] = reorderedSteps.splice(sourceIndex, 1);
    reorderedSteps.splice(destinationIndex, 0, movedStep);

    let currentX = 1;
    const updatedSteps = reorderedSteps.map((step, index) => {
      if (index > 0 && reorderedSteps[index - 1].x === step.x) {
        return { ...step, order: index + 1 };
      } else {
        return { ...step, order: index + 1, x: currentX++ };
      }
    });

    setSteps(updatedSteps);
  };

  const markNextAsParallel = (stepId) => {
    setSteps((prevSteps) => {
      const updatedSteps = [...prevSteps];
      const stepIndex = updatedSteps.findIndex((step) => step.id === stepId);
      if (stepIndex !== -1 && stepIndex < updatedSteps.length - 1) {
        const currentStep = updatedSteps[stepIndex];
        const nextStep = updatedSteps[stepIndex + 1];
        nextStep.x = currentStep.x;
      }
      return updatedSteps;
    });
  };

  const unmarkNextAsParallel = (stepId) => {
    setSteps((prevSteps) => {
      const updatedSteps = [...prevSteps];
      const stepIndex = updatedSteps.findIndex((step) => step.id === stepId);
      if (stepIndex !== -1) {
        for (let i = stepIndex + 1; i < updatedSteps.length; i++) {
          if (updatedSteps[i].x === i + 1) break;
          updatedSteps[i].x = i + 1;
        }
      }
      return updatedSteps;
    });
  };

  const removeCard = (stepId) => {
    setSteps((prevSteps) => {
      const updatedSteps = prevSteps.filter((step) => step.id !== stepId);
      return updatedSteps.map((step, index) => ({ ...step, order: index + 1, x: index + 1 }));
    });
  };

  const handleParallelChange = (stepId, isChecked) => {
    if (isChecked) {
      markNextAsParallel(stepId);
    } else {
      unmarkNextAsParallel(stepId);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={createWorkflow}
    >
      {({ isSubmitting }) => (
        <Form>
          <SoftBox
            margin={2}
            position="relative"
            my={4}
            sx={{
              backgroundColor: "#f0f0f0",
              borderRadius: 3,
              padding: 3,
            }}
          >
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <SoftTypography variant="h6">{"Create Workflow"}</SoftTypography>

              <SoftButton
                size="small"
                variant="gradient"
                type="submit"
                color="dark"
                // onClick={createWorkflow}
              >
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
              <Field name="workflowName" as={SoftInput} placeholder="Enter workflow name" />
              <ErrorMessage
                name="workflowName"
                component={SoftTypography}
                color="error"
                variant="caption"
              />

              <SoftBox mb={1} mt={2.5} ml={0.5} lineHeight={0} display="inline-block">
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Workflow Description
                </SoftTypography>
              </SoftBox>
              <Field
                name="workflowDescription"
                as={SoftInput}
                placeholder="Enter workflow description"
                multiline
                rows={2}
              />
              <ErrorMessage
                name="workflowDescription"
                component={SoftTypography}
                color="error"
                variant="caption"
              />
              {/* <SoftInput
          value={workflowDescription}
          onChange={(e) => setWorkFlowDescription(e.target.value)}
          required
          multiline
          inputProps={{ rows: 2 }}
          placeholder="Enter Description"
        /> */}
            </SoftBox>

            <SoftBox my={2.5}>
              <SoftSelect
                placeholder="Add Steps"
                options={stepDropDown}
                onChange={addNewStepCard}
                variant="gradient"
              />

              <SoftBox display="flex" mt={2}></SoftBox>
            </SoftBox>

            {/* <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block"> */}
            <SoftBox
              display="flex"
              flexDirection="column"
              justifyContent="flex-end"
              height="100%"
              component="form"
              role="form"
            >
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                <br></br>
                Steps
              </SoftTypography>
              <>
                <ErrorMessage
                  name="steps"
                  component={SoftTypography}
                  color="error"
                  variant="caption"
                />
              </>

              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {steps.map((step, index) => (
                        <Draggable key={step.id} draggableId={step.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <SoftBox
                                display="flex"
                                //width="calc(450px - 40px)"
                                bgColor="white"
                                color="text"
                                borderRadius="md"
                                mt={2.5}
                                py={1.875}
                                px={1.875}
                                justifyContent="space-between"
                                alignItems="center"
                                mb={3}
                                lineHeight={1.5}
                                sx={{
                                  fontSize: ({ typography: { size } }) => size.md,
                                }}
                              >
                                {step.content} (Order: {step.order}, X: {step.x})
                                {index < steps.length - 1 && (
                                  <span
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    marginLeft="auto"
                                  >
                                    <Checkbox
                                      size="small"
                                      checked={steps[index + 1].x === step.x}
                                      onChange={(e) =>
                                        handleParallelChange(step.id, e.target.checked)
                                      }
                                    />
                                  </span>
                                )}
                                {index < steps.length && (
                                  <SoftTypography
                                    variant="body1"
                                    color="secondary"
                                    sx={{ cursor: "pointer", lineHeight: 0 }}
                                  >
                                    <Tooltip title="Remove Step" placement="left">
                                      <Icon onClick={() => removeCard(step.id)}>delete</Icon>
                                    </Tooltip>
                                  </SoftTypography>
                                )}
                              </SoftBox>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              {/* </SoftBox> */}
            </SoftBox>
          </SoftBox>
        </Form>
      )}
    </Formik>
  );
}

export default Workflow;

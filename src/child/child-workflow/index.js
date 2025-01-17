import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import prop-types
import axios from "axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import "./child-workflow.css";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../platform/axiosConfig";
import BaseLayout from "child/child-registration/components/BaseLayout";
import SoftTypography from "components/SoftTypography";

const ChildWorkflow = () => {
  const { registrationId } = useParams(); // Get registration ID from URL
  const [steps, setSteps] = useState([]);
  const [childData, setChildData] = useState({});
  const [caseWorkFlow, setcaseWorkFlow] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const transformSteps = (response) => {
    return response.map((item) => ({
      caseWorkflowStepId: item.caseWorkflowStepId,
      id: item.stepId,
      name: item.stepName,
      description: item.stepDescription,
      status: item.stepStatus,
      approvalStatus: item.approvalStatus,
      updatedBy: item.updatedBy,
      updatedAt: item.updatedAt,
    }));
  };

  const transformChildDetails = (child) => {
    return {
      id: child.childId,
      name: child.name,
      dateOfBirth: child.dateOfBirth,
      categoryDesc: child.category.categoryDesc,
    };
  };

  // Fetch workflow from the backend using the registrationId
  useEffect(() => {
    const fetchWorkflow = async () => {
      try {
        setLoading(true);
        debugger;

        const response = await axiosInstance.get(`/api/v1/caseWorkflow/${registrationId}`);
        setcaseWorkFlow(response.data);
        setChildData(transformChildDetails(response.data.child));
        const stepsResponse = await axiosInstance.get(
          `/api/v1/caseWorkflowStep/summary/${response.data.caseWorkflowId}`
        );
        setSteps(transformSteps(stepsResponse.data));
      } catch (err) {
        setError("Error fetching workflow data");
      } finally {
        setLoading(false);
      }
    };

    if (registrationId) {
      fetchWorkflow();
    }
  }, [registrationId]);

  // Handle reordering of steps
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedSteps = Array.from(steps);
    const [removed] = reorderedSteps.splice(result.source.index, 1);
    reorderedSteps.splice(result.destination.index, 0, removed);

    setSteps(reorderedSteps);

    // Optionally send reordered steps to backend
    axios
      .put(`/api/v1/caseWorkflowStep/reorder/${registrationId}`, reorderedSteps)
      .catch((err) => console.error("Error updating workflow steps order:", err));
  };

  // Handle step deletion
  const handleDelete = async (stepId) => {
    try {
      // Optimistically remove step from UI
      setSteps(steps.filter((step) => step.id !== stepId));

      // Send DELETE request to backend
      await axios.delete(`/api/v1/caseWorkflowStep/${registrationId}/step/${stepId}`);
    } catch (err) {
      console.error("Error deleting step:", err);
      setError("Failed to delete step. Please try again.");
    }
  };

  const handleOpenStep = (caseWorkflowStepId) => {
    navigate(`/child/child-workflow/step/${caseWorkflowStepId}`);
  };

  if (loading) return;
  <BaseLayout>
    <SoftBox>
      <p>Loading...</p>
    </SoftBox>
  </BaseLayout>;
  if (error) return;
  <BaseLayout>
    <SoftBox>
      <p>{error}</p>
    </SoftBox>
  </BaseLayout>;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox>
        <SoftTypography variant={"h4"} fontWeight="bold">
          Workflow for Child: {childData.name} ({childData.id})
        </SoftTypography>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="steps">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="steps-list">
                {steps.map((step, index) => (
                  <Draggable key={step.id} draggableId={`${step.id}`} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <StepCard
                          step={step}
                          onOpen={() => handleOpenStep(step.id)}
                          onDelete={handleDelete}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
};

const StepsList = ({ steps }) => {
  return (
    <div>
      {steps.map((step) => (
        <StepCard key={step.id} step={step} />
      ))}
    </div>
  );
};

StepsList.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      updatedBy: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const StepCard = ({ step, onOpen, onDelete }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "status-completed";
      case "Pending":
        return "status-pending";
      case "Locked":
        return "status-locked";
      default:
        return "";
    }
  };

  return (
    <div className={`step-card ${getStatusClass(step.status)}`}>
      <div className="step-row">
        <SoftTypography variant={"h5"} fontWeight="bold">
          {step.name}
        </SoftTypography>
        <SoftBox display="flex" justifyContent="space-between" alignItems="center">
          <SoftBox display="flex">
            <SoftBox mr={1}>
              <SoftButton
                variant="gradient"
                color="info"
                size="small"
                onClick={() => onOpen(step.id)}
                disabled={step.status === "Locked"}
              >
                open
              </SoftButton>
            </SoftBox>
            <SoftButton
              variant="outlined"
              color="dark"
              size="small"
              onClick={() => onDelete(step.id)}
            >
              remove
            </SoftButton>
          </SoftBox>
        </SoftBox>
      </div>
      <div className="step-row">
        <SoftTypography variant={"h6"}>Updated by: {step.updatedBy}</SoftTypography>
        <p className={`${getStatusClass(step.status)}-text`}>{step.status}</p>
      </div>
      {step.updatedAt && (
        <SoftTypography variant={"h6"}>
          Updated on: {new Date(step.updatedAt).toLocaleString()}
        </SoftTypography>
      )}
    </div>
  );
};

StepCard.propTypes = {
  step: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    updatedBy: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
  onOpen: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ChildWorkflow;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../platform/axiosConfig";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from 'components/SoftButton';
import SoftInput from 'components/SoftInput';
import SoftDropzone from 'components/SoftDropzone';
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

const StepDetailsPage = () => {
  const { stepId } = useParams();
  const [stepDetails, setStepDetails] = useState();
  const [comments, setComments] = useState([]);
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    // Fetch step details from API
    const fetchStepDetails = async () => {
      try {
        const response = await axios.get(`/api/v1/caseWorkflowStep/step/${stepId}`);
        setStepDetails(response.data);
        setUploadedDocs(response.data.documentLinks || ["Link1", "Link2"]);
        setComments([response.data.stepComments] || []);
      } catch (err) {
        console.error("Error fetching step details:", err);
      }
    };

    fetchStepDetails();
  }, [stepId]);

  const handleUploadAll = () => {
    // Implement document upload logic
    console.log("Uploading all documents...");
  };

  const handleAddComment = async () => {
    if (!newComment) return;
    setComments((prev) => [...prev, newComment]);
    setNewComment("");
    // const response = await axios.post(`/api/v1/caseWorkflowStep/step/${stepId}/comments`, { comment: newComment });
    // Optionally send the comment to the backend
  };

  if (!stepDetails) return <p>Loading step details...</p>;

  return (
    <DashboardLayout>
       <DashboardNavbar />
         <SoftBox>
            <Grid container>
              <Grid item xs={12} sm={6} lg={6}>
                <SoftBox p={3}>
                    <SoftTypography variant="h3" fontWeight="bold">
                      {stepDetails.stepName}
                    </SoftTypography>
                </SoftBox>
              </Grid>
              <Grid item xs={12} sm={6} lg={6}>
                <SoftBox p={3} display="flex" justifyContent="flex-end">
                    <SoftButton color="info">Mark Step as Complete</SoftButton>
                </SoftBox>
              </Grid>
          </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={7}>
                <Card sx={{ height: "100%" }}>
                <SoftBox p={3}>
                        <SoftTypography variant="h5" fontWeight="bold">
                        Attach documents
                        </SoftTypography>
                  <SoftDropzone options={{ addRemoveLinks: true }}/>
                  
                        <SoftBox display="flex">
                          <SoftBox p={1}>
                  <SoftButton color="info" onClick={handleUploadAll}>Upload All</SoftButton>
                        </SoftBox>
                </SoftBox>
                </SoftBox>
                </Card>
                </Grid>
              <Grid item xs={12} lg={5}>
                <Card sx={{ height: "100%" }}>
                <SoftBox p={3}>
                <SoftTypography variant={"h5"} fontWeight="bold">
                    Uploaded Documents
                </SoftTypography>
                    {uploadedDocs.map((doc, index) => (
                      <li key={index}>
                        <a href={doc}>{doc}</a>
                      </li>
                    ))}
                </SoftBox>
                </Card>
                </Grid>
              <Grid item xs={12} lg={7}>
                <Card sx={{ height: "100%" }}>
                  <SoftBox p={3}>
                    <SoftTypography variant="h5" fontWeight="bold">
                      Add Comments
                                  </SoftTypography>
                        <SoftInput
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          multiline
                          placeholder="Enter your comment here..."
                        />
                      <SoftBox p={1}>
                        <SoftButton color="info" onClick={handleAddComment}>Add</SoftButton>
                      </SoftBox>
                    </SoftBox>
                </Card>
              </Grid>
              <Grid item xs={12} lg={5}>
                <Card sx={{ height: "100%" }}>
                <SoftBox p={3}>
                  <SoftTypography variant={"h5"} fontWeight="bold">
                      Comments
                  </SoftTypography>
                    {comments.map((comment, index) => (
                      <li key={index}>
                        <span>{comment} - [user1] at [date:time]</span>
                      </li>
                    ))}
                </SoftBox>
                </Card>
                </Grid>
            </Grid>
        </SoftBox>
      <Footer />
    </DashboardLayout>
  );
};

export default StepDetailsPage;

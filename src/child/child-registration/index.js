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
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// BalAsha - Nurture components
import SoftBox from "components/SoftBox";

// ChildRegistration page components
import BaseLayout from "child/child-registration/components/BaseLayout";

import BasicInfo from "child/child-registration/components/BasicInfo";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

function ChildRegistration() {
  const [expandedbasic, setExpandedBasic] = React.useState(true);
  const [expandedother, setExpandedOther] = React.useState(false);

  const handleExpandBasicClick = () => {
    setExpandedBasic(!expandedbasic);
  };
  const handleExpandOtherClick = () => {
    setExpandedOther(!expandedother);
  };

  return (
    <BaseLayout>
      <SoftBox mt={4}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <SoftBox mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Card>
                    <CardActions disableSpacing>
                      <CardHeader title="Basic Info" />
                      <ExpandMore
                        expand={expandedbasic}
                        onClick={handleExpandBasicClick}
                        aria-expanded={expandedbasic}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </ExpandMore>
                    </CardActions>

                    <Collapse in={expandedbasic} timeout="auto" unmountOnExit>
                      <CardContent>
                        <BasicInfo />
                      </CardContent>
                    </Collapse>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card>
                    <CardActions disableSpacing>
                      <CardHeader title="Other Info" />
                      <ExpandMore
                        expand={expandedother}
                        onClick={handleExpandOtherClick}
                        aria-expanded={expandedother}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </ExpandMore>
                    </CardActions>

                    <Collapse in={expandedother} timeout="auto" unmountOnExit>
                      <CardContent>
                        <BasicInfo />
                      </CardContent>
                    </Collapse>
                  </Card>
                </Grid>
              </Grid>
            </SoftBox>
          </Grid>
        </Grid>
      </SoftBox>
    </BaseLayout>
  );
}

export default ChildRegistration;

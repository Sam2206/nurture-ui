import React from "react";
import { Card, CardActions, CardHeader, Collapse, IconButton, CardContent } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

const ExpandMore = styled(IconButton)(({ theme }) => ({
  marginLeft: "auto", // This pushes it to the right side
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  transform: "rotate(0deg)",
  "&.expanded": {
    transform: "rotate(180deg)",
  },
}));

// A reusable collapsible card component
const CollapsibleCard = ({ title, expanded, onExpandClick, children }) => (
  <Card>
    <CardActions disableSpacing>
      <CardHeader title={title} />
      <ExpandMore
        className={expanded ? "expanded" : ""}
        onClick={onExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </ExpandMore>
    </CardActions>

    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>{children}</CardContent>
    </Collapse>
  </Card>
);

CollapsibleCard.propTypes = {
  title: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
  onExpandClick: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default CollapsibleCard;

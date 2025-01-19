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
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

// BalAsha - Nurture components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function ActionCell({ childId }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    console.log("test" + childId);
    navigate("/child/child-registration", { state: { childId: childId } });
  };
  const handleOpen = () => {
    // navigate("/child/child-workflow/16");
    navigate("/child/child-workflow/1");
  };

  return (
    <SoftBox display="flex" alignItems="center">
      <SoftBox mx={2}>
        <SoftTypography variant="body1" color="secondary" sx={{ cursor: "pointer", lineHeight: 0 }}>
          <Tooltip title="Update Child Detail" placement="top">
            <IconButton size="small" aria-label="edit" color="inherit" onClick={handleEdit}>
              <Icon fontSize="small">edit</Icon>
            </IconButton>
          </Tooltip>
        </SoftTypography>
      </SoftBox>
      <SoftTypography variant="body2" color="secondary" sx={{ cursor: "pointer", lineHeight: 0 }}>
        <Tooltip title="Open Child Profile" placement="top">
          <IconButton size="small" aria-label="open" color="inherit" onClick={handleOpen}>
            <Icon fontSize="small">open_in_new</Icon>
          </IconButton>
        </Tooltip>
      </SoftTypography>
    </SoftBox>
  );
}
ActionCell.propTypes = {
  childId: PropTypes.number,
};

export default ActionCell;

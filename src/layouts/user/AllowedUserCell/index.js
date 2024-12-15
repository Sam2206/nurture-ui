/**
=========================================================
* BalAsha - Nurture - v4.0.2
=========================================================

* Product Page: https://balasha-nurture.web.app/product/soft-ui-dashboard-react
* Copyright 2024 BalAsha - Nurture (https://balasha-nurture.web.app)

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// BalAsha - Nurture components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";

function AllowedUserCell({ image, email }) {
  return (
    <SoftBox display="flex" alignItems="center" pr={2}>
      <SoftBox mr={2}>
        <SoftAvatar src={image} alt={email} variant="rounded" />
      </SoftBox>
      <SoftBox flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {email}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

// Typechecking props for the ProductCell
AllowedUserCell.propTypes = {
  image: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default AllowedUserCell;

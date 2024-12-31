/**
=========================================================
* BalAsha - Nurture - v4.0.2
=========================================================

* Product Page: https://balasha-nurture.web.app/product/soft-ui-dashboard-react
* Copyright 2024 BalAsha - Nurture (https://balasha-nurture.web.app)

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// BalAsha - Nurture components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { UserContext } from "custom/UserContext";
import React, { useContext } from "react";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import axiosInstance from "platform/axiosConfig.js";

function ProfileInformation() {
  const [followsMe, setFollowsMe] = useState(true);
  const [answersPost, setAnswersPost] = useState(false);
  const loggedUser = useContext(UserContext);
  const [user, setUser] = useState(null);
  let info_data = {
    fullName: loggedUser.userName,
    email: loggedUser.userEmail,
  };

  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loggedUser),
    };

    const locationsUri = "/get-users";
    axiosInstance
      .get(locationsUri, loggedUser)
      .then((data) => {
        setUser(data.data[0]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (user && user != null) {
    info_data = {
      fullName: loggedUser.userName,
      email: loggedUser.userEmail,
      mobile: user.mobileNo,
      adress: user.address,
      userId: user.idDtls,
      userId: user.idProofType,
    };
  }

  console.log(user);

  return (
    <ProfileInfoCard
      title="profile information"
      description=""
      info={info_data}
      social={[
        {
          link: "https://www.facebook.com/BalAsha/",
          icon: <FacebookIcon />,
          color: "facebook",
        },
        {
          link: "https://twitter.com/balasha",
          icon: <TwitterIcon />,
          color: "twitter",
        },
        {
          link: "https://www.instagram.com/balashaofficial/",
          icon: <InstagramIcon />,
          color: "instagram",
        },
      ]}
      action={{ route: "/pages/users/edit-user", tooltip: "Edit Profile" }}
    />
  );
}
// }

export default ProfileInformation;

/**
=========================================================
* BalAsha - Nurture - v4.0.2
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2023 BalAsha - Nurture (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// BalAsha - Nurture Base Styles
import borders from "assets/theme/base/borders";

// BalAsha - Nurture Helper Functions
import pxToRem from "assets/theme/functions/pxToRem";

const { borderRadius } = borders;

const cardMedia = {
  styleOverrides: {
    root: {
      borderRadius: borderRadius.xl,
      margin: `${pxToRem(16)} ${pxToRem(16)} 0`,
    },

    media: {
      width: "auto",
    },
  },
};

export default cardMedia;

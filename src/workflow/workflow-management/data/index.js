/**
=========================================================
* BalAsha - Nurture - v4.0.2
=========================================================

* Product Page: https://balasha-nurture.web.app/product/soft-ui-dashboard-react
* Copyright 2024 BalAsha - Nurture (https://balasha-nurture.web.app)

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// uuid is a library for generating unique id
import { v4 as uuidv4 } from "uuid";

// Kanban application components
import Card from "layouts/applications/kanban/components/Card";

// Images
import officeDark from "assets/images/office-dark.jpg";
import meeting from "assets/images/meeting.jpg";
import homeDecore from "assets/images/home-decor-1.jpg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import team5 from "assets/images/team-5.jpg";

export const boards = {
  steps: [
    { value: "Police Verfication", label: "Police Verfication" },
    { value: "News Paper Publication", label: "News Paper Publication" },
  ],
  columns: [
    {
      id: uuidv4(),
      title: "New Workflow",
      cards: [
        {
          id: uuidv4(),
          template: "Police Verfication",
        },
        {
          id: uuidv4(),
          template: "News Paper Publication",
        },
      ],
    },
  ],
};

export const board2 = {
  columns: [
    {
      id: uuidv4(),
      title: "New Step",
      cards: [],
    },
  ],
};

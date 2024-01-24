// SIDEBAR IMPORTS FOR LOGOS

import {
    UilEstate,
    UilClipboardAlt,
    UilChart,
    UilHeart,
    UilHeartMedical,
    UilMedicalSquare,
    UilMedkit,
    UilHeartBreak,

} from "@iconscout/react-unicons";



// Schedule Task Img Imports
import bokChoy from "../imgs/bokChoy.png";
import choySum from "../imgs/choySum.jpeg";
import kaiLan from "../imgs/kaiLan.jpg";

export const SidebarData = [
    {
        icon: UilEstate,
        heading: "Dashboard",
        route: "/",
    },

    {
        icon: UilClipboardAlt,
        heading: "Plant Details",
        route: "/PlantDetails",
    },

    {
        icon: UilEstate,
        heading: "Calender",
        route: "/Calender",
    },

    {
        icon: UilChart,
        heading: "Inventory Management",
        route: "/InventoryManagement",
    },

]

// Plant Overview data
export const CardsData = [
    {
        title: "Bak Choy",
        series: [
          {
            name: "Bak Choy",
            data: [31, 40, 28, 51, 42, 109, 100],
          },
        ],
        img: bokChoy,
      },
    
      {
        title: "Cai Xim",
        series: [
          {
            name: "Cai Xim",
            data: [31, 40, 28, 51, 42, 109, 100],
          },
        ],
        img: choySum,
      },
    
      {
        title: "Kai Lan",
        series: [
          {
            name: "Kai Lan",
            data: [31, 40, 28, 51, 42, 109, 100],
          },
        ],
        img: kaiLan,
      },
    ];

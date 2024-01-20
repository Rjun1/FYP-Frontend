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
        heading: "Analytics",
        route: "/Analytics",
    },

]

// Plant Overview data
export const CardsData = [
    {
        title: "Bak Choy",
        status: "Healthy",
        color: "#559f89",
        barValue: 70,
        value: "25,970",
        png: UilHeart,
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
        status: "Attention",
        color: "#ec978c",
        barValue: 60,
        value: "4,270",
        png: UilMedicalSquare,
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
        status: "Critical!",
        color: "#ff6d71",
        barValue: 70,
        value: "25,970",
        png: UilHeartBreak,
        series: [
          {
            name: "Kai Lan",
            data: [31, 40, 28, 51, 42, 109, 100],
          },
        ],
        img: kaiLan,
      },
    ];

import React, { useState } from 'react';
import SGplant from '../imgs/SGplant.png' /* Change image here */

import './Sidebar.css'
import { SidebarData } from '../Data/Data';
import { UilBars} from '@iconscout/react-unicons'
import { motion } from "framer-motion";

// Routing
import { Link } from 'react-router-dom'

const Sidebar = () => {

    const [selected, setSelected] = useState(0)
    const [expanded, setExpaned] = useState(true)

    const sidebarVariants = {
      true: {
        left : '0'
      },
      false:{
        left : '-60%'
      }
    }

    return (
      <>
        <div 
        className="bars" 
        style={expanded?{left: '60%'}:{left: '5%'}} 
        onClick={()=>setExpaned(!expanded)}
        >
          <UilBars />
        </div>
        <motion.div className="Sidebar"
        variants={sidebarVariants}
        animate={window.innerWidth<=768?`${expanded}`:''}
        >
          {/* logo */}
          <Link className="logo link" to="/">
            <img src={SGplant} alt="" />
            <span>Smart Greens</span>
          </Link>

          {/* MENU */}
          <div className="menu">
              {SidebarData.map((item, index)=>{
                  return(
                      <Link className= {selected===index?'menuItem active link': 'menuItem link'}
                      key = {index}
                      onClick={()=>setSelected(index)}
                      to={item.route}
                      >
                          <item.icon/>
                          <span>
                              {item.heading}
                          </span>

                      </Link>
                  )
              })}


          </div>
        </motion.div>
      </>
    );
  };
  

export default Sidebar
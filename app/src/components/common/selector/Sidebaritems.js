import { useState } from "react";

import charcoalpic from "../images/charcoal.png";
import neon from "../images/neon.jpg";
import orange from "../images/orange.jpg";
import teal from "../images/teal.jpg";
import purple from "../images/purple.jpg";
import Cloth from "./ClothColor";

export default function Sidebaritem({ item }) {
  const [open, setOpen] = useState(false);
  const cloths = [];
  cloths.push(neon);
  cloths.push(charcoalpic);
  cloths.push(orange);
  cloths.push(teal);
  cloths.push(purple);

  const setTablecloth = (cloth) => {
    document.documentElement.style.setProperty("--bg-cloth", cloth);
  };

  const getTablecloth = (event) => {
    const currentCloth = event.target.style.getPropertyValue("--bg-cloth");

    setTablecloth(currentCloth);

    console.log(currentCloth);
  };

  if (item.products) {
    return (
      <div className={open ? "sidebar-item open" : "sidebar-item"}>
        <div className='sidebar-title'>
          <span>{item.title}</span>
          <i
            className='bi-chevron-down toggl e-btn'
            onClick={() => setOpen(!open)}
          ></i>
        </div>
        <div className='sidebar-content'>
          {item.products.map((child, index) => (
            <Sidebaritem key={index} item={child} />
          ))}
          <div className='cloths'>
            <div className='cloth-list'>
              {cloths.map((cloth, idx) => (
                /*  <button className='cloth-list'> */
                <Cloth getTablecloth={getTablecloth} cloth={cloth} key={idx} />
                /*</button>*/
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className='sidebar-item plain'>
        <span>{item.title}</span>
        <i
          className='bi-chevron-down toggle-btn'
          onClick={() => setOpen(!open)}
        ></i>
      </div>
    );
  }
}

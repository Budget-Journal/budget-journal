import React from "react";
import "./SideBarRow.css";

function SideBarRow({ selected, Icon, title, link }) {
  return (
    <div className={`sidebarRow ${selected && "selected"}`}>
   
      <Icon className="sidebarRow__icon" />
      <h2 onClick={link} className="sidebarRow__title">
        {title}
      </h2>

      
    </div>
  );
}

export default SideBarRow;

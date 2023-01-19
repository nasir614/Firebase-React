import React from "react";
import FileComponent from "./FileComponent";
import SidebarItem from "./SidebarItem";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import ImportantDevicesIcon from "@material-ui/icons/ImportantDevices";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import StorageIcon from "@material-ui/icons/Storage";
import "./Sidebar.css";

const Sidebar = ({ getFiles }) => {
  return (
    <div className="sidebar">
      <FileComponent getFiles={getFiles} />
      <div className="sidebar__itemsContainer">
        <SidebarItem arrow icon={<InsertDriveFileIcon />} label={"My Drive"} />
        <SidebarItem
          arrow
          icon={<ImportantDevicesIcon />}
          label={"Computers"}
        />
        <SidebarItem icon={<PeopleAltIcon />} label={"Shared with me"} />
        <SidebarItem icon={<QueryBuilderIcon />} label={"Recent"} />
        <SidebarItem icon={<StarBorderIcon />} label={"Starred"} />
        <SidebarItem icon={<DeleteOutlineIcon />} label={"Bin"} />
        <hr />
        <SidebarItem icon={<StorageIcon />} label={"Storage"} />
      </div>
    </div>
  );
};

export default Sidebar;
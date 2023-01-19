import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import SettingsIcon from "@material-ui/icons/Settings";
import AppsIcon from "@material-ui/icons/Apps";
import { Avatar } from "@material-ui/core";
import "./Header.css";

const Header = ({ userPhoto, searchText, setSearchText }) => {
  return (
    <div className="header">
      <div className="header__logo">
        <img src="logo192.png" alt="logo" />
        <span>Storage</span>
      </div>
      <div className="header__serchContainer">
        <div className="header__searchBar">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search in Storage"
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
          />
          <ExpandMoreIcon />
        </div>
      </div>
      <div className="header__icons">
        <span>
          <HelpOutlineIcon />
          <SettingsIcon />
        </span>
        <AppsIcon />
        <Avatar src={userPhoto} />
      </div>
    </div>
  );
};

export default Header;

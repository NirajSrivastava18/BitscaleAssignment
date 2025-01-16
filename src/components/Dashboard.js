import React, { useState } from 'react';
import leftIcon from '../assets/Icon.svg';
import User from '../assets/Frame 1.svg';
import table from '../assets/table.svg';
import coin from '../assets/coins-stacked-01.svg';
import puzzle from '../assets/puzzle-piece-01.svg';
import credit from '../assets/credit-card-02.svg';
import ring from '../assets/Icon (1).svg';
import './Dashboard.css';

const Dashboard = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <>
      <div className="dashboard">
        <div className="dashboard-header">
          <div className="dashboard-left">
            <button className=" btn-left">
              <img src={leftIcon} alt="leftIcon" className="left-icon" />
            </button>
            <h4 className="dashboard-title"> Table.xls </h4>
          </div>
          <div className="dashboard-right">
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <span className="slider"></span>
            </label>
            <span className="toggle-label">Auto Save</span>
            <img src={User} alt="User" />
          </div>
        </div>
        <hr className="hr-line" />
        <div className="dashboard-left-panel">
          <button className="btns-panel">
            <div class className="icon-top">
              <img src={table} alt="table" />
              <img src={puzzle} alt="puzzle" />
              <img src={ring} alt="ring" />
            </div>
            <div className="icon-bottom">
              <img src={credit} alt="credit" style={{ marginBottom: '20px' }} />
              <img src={coin} alt="coin" />
            </div>
          </button>
        </div>
        <div className="vertical"></div>
      </div>
    </>
  );
};

export default Dashboard;

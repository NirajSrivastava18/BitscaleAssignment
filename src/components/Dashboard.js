import React, { useState } from 'react';
import leftIcon from '../assets/Icon.svg';
import User from '../assets/Frame 1.svg';
import table from '../assets/table.svg';
import coin from '../assets/coins-stacked-01.svg';
import puzzle from '../assets/puzzle-piece-01.svg';
import credit from '../assets/credit-card-02.svg';
import ring from '../assets/Icon (1).svg';
import Table from './Table';
import './Dashboard.css';

const Dashboard = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [fileName, setFileName] = useState('Enter the file Name'); // Dynamic file name state
  const [isEditing, setIsEditing] = useState(false); // To track whether the input field is visible

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleFileNameChange = (event) => {
    setFileName(event.target.value); // Update file name on input change
  };

  const handleFileNameSave = (event) => {
    if (event.key === 'Enter' && fileName.trim() !== '') {
      // Ensure it's not empty
      setIsEditing(false); // Hide input field on Enter
      console.log('File name saved:', fileName); // Placeholder for save functionality
    }
  };

  const handleTitleClick = () => {
    setIsEditing(true); // Show input field on title click
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-left">
          <button className="btn-left">
            <img src={leftIcon} alt="leftIcon" className="left-icon" />
          </button>
          {/* Show input field when isEditing is true */}
          {isEditing ? (
            <h4>
              <input
                type="text"
                value={fileName}
                onChange={handleFileNameChange}
                onKeyDown={handleFileNameSave} // Trigger save on Enter key
                className="dashboard-title"
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '10px',
                  outline: 'none',
                  fontSize: '18px',
                }}
                autoFocus
              />
            </h4>
          ) : (
            // Show the file name as text when not editing
            <h4
              className="dashboard-title"
              onClick={handleTitleClick}
              style={{ cursor: 'pointer', fontSize: '18px' }}
            >
              {fileName}
            </h4>
          )}
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
          <div className="icon-top">
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

      <Table />
    </div>
  );
};

export default Dashboard;

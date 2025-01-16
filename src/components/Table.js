import React, { useState, useEffect } from 'react';
import row from '../assets/rows-03.svg';
import col from '../assets/columns-03.svg';
import sort from '../assets/switch-vertical-01.svg';
import filter from '../assets/Icon (2).svg';
import Enrich from '../assets/Enrich.svg';
import share from '../assets/Button.svg';
import download from '../assets/Button-2.svg';
import detele from '../assets/Button-3.svg';
import './Table.css';

const Table = () => {
  const defaultImage =
    'https://img.icons8.com/stickers-duotone/32/circled-play.png';
  const [columns, setColumns] = useState([]); // Columns with names and icons
  const [rows, setRows] = useState([]); // Rows with dynamic data
  const [editingCell, setEditingCell] = useState(null); // Tracks the currently editing cell
  const [columnNames, setColumnNames] = useState({}); // Column names for each column
  const [rowStat, setRowStat] = useState({}); // State for row stats
  const [colStat, setColStat] = useState({}); // State for column stats

  // Function to add a new column
  const addColumn = () => {
    const newColumnId = columns.length + 1;
    setColumns([
      ...columns,
      {
        id: newColumnId,
        name: '', // Empty name initially
        icon: null, // No icon initially
        isNew: true, // Mark column as "new" to allow editing
      },
    ]);

    // Initialize empty name for the new column
    setColumnNames({ ...columnNames, [newColumnId]: '' });

    // Update all rows to include the new column
    const updatedRows = rows.map((row) => ({
      ...row,
      data: { ...row.data, [newColumnId]: '' },
    }));
    setRows(updatedRows);
  };

  // Function to save the column name and remove "isNew" state
  const saveColumnName = (columnId) => {
    if (columnNames[columnId]?.trim()) {
      const updatedColumns = columns.map((column) => {
        if (column.id === columnId) {
          return { ...column, name: columnNames[columnId], isNew: false };
        }
        return column;
      });
      setColumns(updatedColumns);
      setColumnNames((prev) => {
        const updatedNames = { ...prev };
        delete updatedNames[columnId]; // Remove the column name from state after saving
        return updatedNames;
      });
    }
  };

  // Function to handle image upload for columns
  const handleIconUpload = (columnId, file) => {
    const imageURL = URL.createObjectURL(file);
    const updatedColumns = columns.map((column) => {
      if (column.id === columnId) {
        return { ...column, icon: imageURL };
      }
      return column;
    });
    setColumns(updatedColumns);
  };

  // Function to add a new row
  const addRow = () => {
    const newRowId = rows.length + 1;
    const newRow = {
      id: newRowId,
      serial: newRowId, // Auto-incremented Serial Number
      img: defaultImage, // Default image for all rows
      data: columns.reduce((acc, col) => {
        acc[col.id] = ''; // Initialize all cells in new row for dynamic columns
        return acc;
      }, {}),
    };
    setRows([...rows, newRow]);
  };

  // Handle editing a cell
  const startEditingCell = (rowId, columnId) => {
    setEditingCell({ rowId, columnId });
  };

  // Handle saving the cell (on "Enter")
  const saveCell = (rowId, columnId, value) => {
    const updatedRows = rows.map((row) => {
      if (row.id === rowId) {
        return {
          ...row,
          data: { ...row.data, [columnId]: value },
        };
      }
      return row;
    });
    setRows(updatedRows);
    setEditingCell(null); // Stop editing
  };

  // Update stats dynamically using useEffect
  useEffect(() => {
    setRowStat({ total: rows.length });
    setColStat({ total: columns.length });
  }, [rows, columns]); // Update stats when rows or columns change

  return (
    <>
      <div className="Table-header-Container">
        <div className="Table-Header">
          <div className="Table-header-left">
            <input type="text" className="Table-Search" placeholder="Search" />
            <img src={row} alt="row" className="Table-Icon" />
            <p style={{ marginRight: '20px', cursor: 'pointer' }}>
              {rowStat.total}/{rowStat.total} Row
            </p>
            <img src={col} alt="col" className="Table-Icon" />
            <p style={{ marginRight: '20px', cursor: 'pointer' }}>
              {colStat.total}/{colStat.total} Column
            </p>
            <img src={filter} alt="filter" className="Table-Icon" />
            <p style={{ marginRight: '20px', cursor: 'pointer' }}>Filter</p>
            <img src={sort} alt="sort" className="Table-Icon" />
            <p style={{ cursor: 'pointer' }}>Sort</p>
          </div>
          <div className="Table-header-right">
            <button className="Table-headerbtn">
              <img src={Enrich} alt="Enrich" className="Table-btn" />
            </button>
            <button className="Table-headerbtn">
              <img src={share} alt="share" className="Table-btn" />
            </button>
            <button className="Table-headerbtn">
              <img src={download} alt="download" className="Table-btn" />
            </button>
            <button className="Table-headerbtn">
              <img src={detele} alt="detele" className="Table-btn" />
            </button>
          </div>
        </div>
      </div>

      <div className="Table-container">
        <table className="Table" border="1">
          {/* Table Header */}
          <thead>
            <tr>
              <th style={{ width: '25px', textAlign: 'center' }}></th>
              <th style={{ width: '25px', textAlign: 'center' }}></th>
              {columns.map((column) => (
                <th
                  key={column.id}
                  style={{ padding: '8px', textAlign: 'left' }}
                >
                  {column.isNew ? (
                    <div>
                      <input
                        type="text"
                        placeholder="Enter column name"
                        value={columnNames[column.id] || ''}
                        onChange={(e) =>
                          setColumnNames({
                            ...columnNames,
                            [column.id]: e.target.value,
                          })
                        }
                        autoFocus
                        style={{ width: '50%', padding: '4px' }}
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          e.target.files[0] &&
                          handleIconUpload(column.id, e.target.files[0])
                        }
                        style={{ display: 'block', marginTop: '4px' }}
                      />
                      <button
                        onClick={() => saveColumnName(column.id)}
                        style={{
                          marginTop: '8px',
                          padding: '4px 8px',
                          backgroundColor: '#4CAF50',
                          color: 'white',
                        }}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div>
                      {column.icon && (
                        <img
                          src={column.icon}
                          alt="Icon"
                          style={{
                            width: '20px',
                            height: '20px',
                            marginRight: '8px',
                            verticalAlign: 'middle',
                          }}
                        />
                      )}
                      <span>{column.name}</span>
                    </div>
                  )}
                </th>
              ))}
              <th>
                <button
                  className="Add-col-btn"
                  onClick={addColumn}
                  style={{ padding: '8px' }}
                >
                  Add Column
                </button>
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td style={{ textAlign: 'center' }}>{row.serial}</td>
                <td style={{ textAlign: 'center' }}>
                  <img
                    src={row.img}
                    alt="Default"
                    style={{ width: '25px', height: '25px' }}
                  />
                </td>
                {columns.map((column) => (
                  <td key={column.id} style={{ padding: '8px' }}>
                    {editingCell?.rowId === row.id &&
                    editingCell?.columnId === column.id ? (
                      <input
                        type="text"
                        defaultValue={row.data[column.id]}
                        onBlur={() => setEditingCell(null)}
                        style={{ width: '50%' }}
                      />
                    ) : (
                      <span
                        onClick={() => startEditingCell(row.id, column.id)}
                        style={{ cursor: 'pointer', fontWeight: '500' }}
                      >
                        {row.data[column.id] || 'Click to edit'}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}

            {columns.length > 0 && (
              <tr>
                <td colSpan={columns.length + 2} style={{ textAlign: 'left' }}>
                  <button
                    className="Add-row"
                    onClick={addRow}
                    style={{ padding: '8px' }}
                  >
                    Add Row
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;

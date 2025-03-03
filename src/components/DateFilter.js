import React from 'react';

function DateFilter({ onDateChange, availableYears, selectedYear }) {
  const handleYearChange = (event) => {
    const selectedYear = event.target.value;
    onDateChange(selectedYear);
  };

  return (
    <div>
      <label htmlFor="year-select">Year Selected: </label>
      <select id="year-select" onChange={handleYearChange} value={selectedYear}>
        {availableYears.map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
    </div>
  );
}

export default DateFilter;

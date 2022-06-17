import React from "react";

export default function ControlBtn({
  handleNextWeek,
  handlePrevWeek,
  handleSetToday,
}) {
  return (
    <div className="btn-wrapper">
      {/* <button onClick={() => handlePrevWeek()}>Previous</button> */}
      <button onClick={() => handlePrevWeek()} className="dir">
        <span title="Previous week">&lsaquo;</span>
      </button>

      <button onClick={() => handleNextWeek()} className="dir">
        <span title="Next week">&rsaquo;</span>
      </button>
      <button className="today" onClick={() => handleSetToday()}>Today</button>
    </div>
  );
}

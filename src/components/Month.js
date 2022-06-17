import React, { Fragment, useEffect, useState } from "react";
import Day from "./Day";
import axios from "axios";


export default function Week({ weeks, bookings }) {
  return (
    <div className="month">
      {weeks.map((row, indx) => (
        <Fragment key={indx}>
          {row.map((day, index) => (
            <Day day={day} key={index} rowIndex = {indx} stations = {bookings} />
          ))}
        </Fragment>
      ))}
    </div>
  );
}

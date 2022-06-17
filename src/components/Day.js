import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import GlobalContext from "../context/globalContext";
import BookingDetail from "./BookingDetail";

export default function Day({ day, rowIndex, stations }) {
  const [activeBooking, setActiveBooking] = useState([]);
  const { setShowBookingDetail, showBookingDetail } = useContext(GlobalContext);

  useEffect(() => {
    const dayBooking =
      stations &&
      stations.map((item) => {
        return item.bookings.filter((book) => {
          // stationN=  book.pickupReturnStationId === item.id;
          return (
            dayjs(book.endDate).format("DD-MM-YY") === day.format("DD-MM-YY") ||
            dayjs(book.startDate).format("DD-MM-YY") === day.format("DD-MM-YY")
          );
        });
      });
    setActiveBooking(dayBooking.flat());
  }, [stations, day]);

  function getCurrentDay() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "current"
      : "";
  }
  return (
    <div className="day">
      <div className="day-inner">
        {rowIndex === 0 && <p>{day.format("ddd").toUpperCase()}</p>}
        <div className={`${getCurrentDay()}`}>{day.format("DD")}</div>
      </div>
      {activeBooking.map((booking) => (
        <>
          <div
            className="day-booking"
            onClick={() => setShowBookingDetail(booking.id)}
            key={booking.id}
          >
            {booking.customerName}
          </div>
          {booking.id === showBookingDetail && (
            <BookingDetail
              stationId={booking.pickupReturnStationId}
              bookingId={booking.id}
              stationName={stations.find(
                (station) => station.id === booking.pickupReturnStationId
              )}
            />
          )}
        </>
      ))}
    </div>
  );
}

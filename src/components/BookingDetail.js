import dayjs from "dayjs";
import React, { useContext } from "react";
import GlobalContext from "../context/globalContext";
import { useFe, dateDiff } from "../utils/helper";

export default function BookingDetail({ stationId, bookingId, stationName }) {
  const { setShowBookingDetail } = useContext(GlobalContext);
  const stateData = useFe(
    `https://605c94c36d85de00170da8b4.mockapi.io/stations/${stationId}/bookings/${bookingId}`
  );
  const { error, status, data } = stateData;

  return (
    <div className="booking-details">
      {error && <p>{error}</p>}
      <h2>Booking Detail</h2>
      <p className="detail-text">
       Customer Name: <span>{data && data.customerName}</span>{" "}
      </p>
      <p className="detail-text">
        Station Name: <span>{stationName.name}</span>{" "}
      </p>
      <p className="detail-text">
        Start Date:{" "}
        <span>{data && dayjs(data.startDate).format("DD MMM YYYY")}</span>{" "}
      </p>
      <p className="detail-text">
        End Date:{" "}
        <span>{data && dayjs(data.endDate).format("DD MMM YYYY")}</span>{" "}
      </p>
      <p className="detail-text">
        Duration:{" "}
        <span>
          {data && dateDiff(dayjs(data.endDate), dayjs(data.startDate))}
        </span>
      </p>
      <button className="close-btn" onClick={() => setShowBookingDetail(false)}>
        Close
      </button>
    </div>
  );
}

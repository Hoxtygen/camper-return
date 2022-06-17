import dayjs from "dayjs";
import axios from "axios";
import { useEffect, useCallback, useReducer } from "react";


function getFirstDayOfWeek(d = new Date()) {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day;

  return new Date(date.setDate(diff));
}

export function getWeeks(v = 0) {
  const weekelapse = v * 7;
  const daysMatrix = new Array(1).fill([]).map(() => {
    return new Array(7).fill(null).map((e, index) => {
      let today = new Date();
      var date = getFirstDayOfWeek(today.setDate(today.getDate() + weekelapse));
      return dayjs(date.setDate(date.getDate() + index));
    });
  });
  return daysMatrix;
}

function useFetchReducer(state, action) {
  switch (action.type) {
    case "error":
      return {
        ...state,
        status: "rejected",
        error: action.payload,
      };

    case "success":
      return {
        ...state,
        status: "resolved",
        data: action.payload,
      };

    case "started":
      return {
        ...state,
        status: "pending",
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export const useFe = (url) => {
  const [state, dispatch] = useReducer(useFetchReducer, {
    status: "idle",
    data: null,
    error: null,
  });
  const getData = useCallback(async () => {
    if (!url) return;
    dispatch({ type: "started" });
    try {
      const res = await axios.get(url);
      dispatch({ type: "error", payload: null });
      dispatch({ type: "success", payload: res.data });
    } catch (error) {
      if (error.response) {
        dispatch({ type: "error", payload: error.response.data.message });
      } else {
        dispatch({ type: "error", payload: error.message });
      }
    }
  }, [url]);
  useEffect(() => {
    if (!url) return;
    getData();
  }, [url, getData]);

  return state;
};

export function dateDiff(endDate, startDate) {
  const years = endDate.diff(startDate, "year");
  const months = endDate.diff(startDate, "month") - years * 12;
  const days = endDate.diff(
    startDate.add(years, "year").add(months, "month"),
    "day"
  );
  const yearFormat = years > 1 ? "years" : "year";
  const monthFormat = months > 1 ? "months" : "month";
  const dayFormat = days > 1 ? "days" : "day";
  return `${years} ${yearFormat} ${months} ${monthFormat} ${days} ${dayFormat}`;
}

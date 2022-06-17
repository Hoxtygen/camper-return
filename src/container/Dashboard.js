import axios from "axios";
import React, { useState, useEffect } from "react";
import AutoComplete from "../components/AutoComplete";
import ControlBtn from "../components/ControlBtn";
import Weeks from "../components/Month";
import { getWeeks } from "../utils/helper";
import dayjs from "dayjs";

export default function Dashboard() {
  const [stations, setStations] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [weekIndex, setWeekIndex] = useState(0);
  const [currentWeek, setCurrentWeek] = useState(getWeeks());
  const [month, setMonth] = useState("");

  useEffect(() => {
    setCurrentWeek(getWeeks(weekIndex));
    getMonth(getWeeks(weekIndex));
  }, [weekIndex]);

  function handlePrevWeek() {
    setWeekIndex(weekIndex - 1);
  }

  function handleNextWeek() {
    setWeekIndex(weekIndex + 1);
  }
  function handleSetToday() {
    setWeekIndex(0);
  }

  useEffect(() => {
    const loadStations = async () => {
      try {
        const response = await axios.get(
          "https://605c94c36d85de00170da8b4.mockapi.io/stations"
        );
        setStations(response.data);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    loadStations();
  }, []);

  const handleChange = async (text) => {
    let matches = [];
    console.log("stations:", stations);

    if (text.length > 0) {
      matches = stations.filter((station) => {
        const regex = new RegExp(`${text}`, "gi");
        return station.name.match(regex);
      });
    }
    setSuggestions(matches);
    setSearchTerm(text);
  };

  const handleSuggest = (text) => {
    setSearchTerm(text);
    setSuggestions([]);
    const result = stations.filter((station) => station.name === text)
    setStations(result)

  };
  const handleSuggestClick = () => {
    setStations(stations)
  }

  function getMonth(currentWeek) {
    if (
      dayjs(currentWeek[0][0]).format("MMMM YYYY") !==
      dayjs(currentWeek[0][6]).format("MMMM YYYY")
    ) {
      setMonth(
        `${dayjs(currentWeek[0][0]).format("MMM")} - ${dayjs(
          currentWeek[0][6]
        ).format("MMM YYYY")}`
      );
    } else setMonth(dayjs(currentWeek[0][0]).format("MMMM YYYY"));
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="">
          <AutoComplete
            searchTerm={searchTerm}
            handleChange={handleChange}
            suggestions={suggestions}
            handleSuggest={handleSuggest}
          />
        </div>
        <div className="date-time">
          <h2>{month}</h2>
          <ControlBtn
            handleNextWeek={handleNextWeek}
            handlePrevWeek={handlePrevWeek}
            handleSetToday={handleSetToday}
          />
        </div>
        
      </div>
      <Weeks weeks={currentWeek} bookings={stations} />
    </div>
  );
}

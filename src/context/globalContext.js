import React, { createContext } from "react";

const GlobalContext = createContext({
  showBookingDetail: false,
  setShowBookingDetail: () => {},
});

export default GlobalContext;

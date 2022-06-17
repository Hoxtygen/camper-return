import React, { useState } from "react";
import GlobalContext from "./globalContext";

export default function ContextWrapper(props) {
  const [showBookingDetail, setShowBookingDetail] = useState(false);

  

  return (
    <GlobalContext.Provider
      value={{
        showBookingDetail,
        setShowBookingDetail,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}

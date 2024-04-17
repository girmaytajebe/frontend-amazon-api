import { useContext, useEffect, useState } from "react";

import viteLogo from "/vite.svg";
import "./App.css";
import Routering from "./Routering";
import { DataContext } from "./Componenet/DataProvider/DataProvider";
import { Type } from "./Utility/action.type";
import { auth } from "./Utility/firebase";
function App() {
  const [user, dispatch] = useContext(DataContext);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // console.log(authUser)
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
  }, []);

  return <Routering />;
}

export default App;

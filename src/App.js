import React, { useState } from "react";
import "./App.scss";
import AutoForm from "./components/AutoForm/AutoForm";
import AutoList from "./components/AutoList/AutoList";
import { apiData } from "./context";
import { MyContext } from "./context";

function App() {
  const [updatedList, setUpdatedList] = useState();
  const [showList, setShowList] = useState(false);
  const [updatedValue, setUpdatedValue] = useState("");

  const getChangeValue = (data) => {
    console.log(data.length)
    setShowList(false)
    if (data.length > 3) {
      let filteredData = apiData.filter((i) => {
        let apiName = i.API.toLowerCase();
        let matchedApi;
        if (apiName.match(data.toLowerCase())) {
          matchedApi =  i.API;
        }
        return matchedApi
      });
      console.log(filteredData)
      if (filteredData.length > 0) {
        setUpdatedList(filteredData);
        setShowList(true);
      }else{
        console.log('no data found')
      }
    } else {
      setShowList(false);
    }
  };

  const getSelectedValue = (value) => {
    setUpdatedValue(value.API);
  };

  return (
    <div className="App">
      <MyContext.Provider
        value={{
          getChangeValue,
          showList,
          updatedValue,
          updatedList,
          getSelectedValue,
        }}
      >
        <AutoForm/>
        {showList === true ? <AutoList /> : null}
      </MyContext.Provider>
    </div>
  );
}

export default App;

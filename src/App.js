import React, { useEffect, useState } from "react";
import "./App.scss";
import AutoForm from "./components/AutoForm/AutoForm";
import AutoList from "./components/AutoList/AutoList";
import { apiData } from "./context";
import { MyContext } from "./context";

function App() {
  const [updatedList, setUpdatedList] = useState();
  const [showList, setShowList] = useState(false);
  const [updatedValue, setUpdatedValue] = useState("");
  const [count, setCount] = useState(0);

 
  const getChangeValue = (data) => {
    setShowList(false);
    if (data.length > 3) {
      let filteredData = apiData.filter((i) => {
        let apiName = i.API.toLowerCase();
        let matchedAPIs;
        if (apiName.match(data.toLowerCase())) {
          matchedAPIs = i.API;
        }
        return matchedAPIs;
      });
      if (filteredData.length > 0) {
        setUpdatedList(filteredData);
        setShowList(true);
      } else {
      }
    } else {
      setShowList(false);
    }
  };
  const downArrowHandler = () => { 
    if (count !== updatedList.length - 1) {
      setCount(count + 1);
    }
  };

  const upArrowHandler = () => {
    if (count > -1) {
      setCount(count - 1);
    }
  };
  const enterPressHandler = () => {
    let link = updatedList[count].Link
      window.location.href = link
  };
  const getPressedKey = (key) => {
    if (key === 40) {
      downArrowHandler();
    } else if (key === 38) {
      upArrowHandler();
    } else if (key === 13) {
      enterPressHandler();
    }
  };
  useEffect(() => {
    const defaultValueList = () => {
      setUpdatedValue(updatedList[0].API)
    }
    if (updatedList){
      defaultValueList()
    }
    if (count > 0) {
      setUpdatedValue(updatedList[count].API);
    }
  }, [updatedList, count]);


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
          getPressedKey,
        }}
      >
        <AutoForm />
        {showList === true ? <AutoList /> : null}
      </MyContext.Provider>
    </div>
  );
}

export default App;

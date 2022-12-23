import React, { useEffect, useState } from "react";
import "./App.scss";
import AutoForm from "./components/AutoForm/AutoForm";
import AutoList from "./components/AutoList/AutoList";
import Axios from "axios";

function App() {
  const [updatedList, setUpdatedList] = useState();
  const [showList, setShowList] = useState(false);
  const [updatedValue, setUpdatedValue] = useState("");

  const getFormData = (formdata) => {
    let filteredData = dummydata.filter(function (element) {
      return element === formdata;
    });
    if (filteredData.length > 0) {
      setShowList(true);
      let data = dummydata;
      let formDataIndex = data.indexOf(formdata);
      let element = data.splice(formDataIndex, 1)[0];
      data.splice(0, 0, element);
      setUpdatedList(data);
    } else {
      console.log("no data found");
    }
  };
  let arr = [];
  const getChangeValue = (data) => {
    console.log(data.length);
    getDataFromAPI();
    if (data.length > 2) {
      let filteredData = arr.filter((i) => {
        let str = i.toLowerCase();
        if (str.match(data.toLowerCase())) {
          return i;
        }
      });
      if (filteredData.length > 0) {
        setShowList(true);
        setUpdatedList(filteredData);
      }
    } else {
      setShowList(false);
    }
  };

  const getSelectedValue = (value) => {
    console.log("selected value :", value);
    setUpdatedValue(value);
  };

  const getDataFromAPI = async () => {
    await Axios.get("https://jsonplaceholder.typicode.com/comments").then(
      (result) => {
        let num = result.data;
        num.forEach((element) => {
          arr.push(element.name);
        });
        return arr;
      }
    );
  };

  return (
    <div className="App">
      <AutoForm
        getFormData={getFormData}
        getChangeValue={getChangeValue}
        showList={showList}
        updatedValue={updatedValue}
      />
      {showList === true ? (
        <AutoList
          updatedList={updatedList}
          getSelectedValue={getSelectedValue}
        />
      ) : null}
    </div>
  );
}

export default App;

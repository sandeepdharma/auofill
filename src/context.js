import React from "react";
import Axios from "axios";
export const MyContext = React.createContext();
export const apiData = [];

const getDataFromAPI = async () => {
  await Axios.get("https://api.publicapis.org/entries")
    .then((result) => {
      let num = result.data.entries;
      num.forEach((element) => {
        apiData.push(element);
      })
      console.log("API call succesful  :)");
    })
    .catch(function (error) {
      console.log("Error occurred at calling API : ", error);
    });
};
getDataFromAPI();

// get in axios is a http method to call data from the given format
// if the foramt is a api link then the function should be async

// import "./AutoListItem.scss";
import { Typography } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { MyContext } from "../../context";
import React, { useEffect, useState } from "react";
import "../AutoList/AutoList.scss";
const AutoListItem = ({ listItem }) => {
  const [state, setState] = useState(false);
  const { updatedValue } = React.useContext(MyContext);


  
  const highlightSelection = () => {
    if (updatedValue === listItem.API) {
      setState(true);
    } else {
      setState(false);
    }
  };
  useEffect(() => {
    highlightSelection();
  });

  const debounce = (func) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, 3000);
      console.log('debounce working')
    };
  };

  const directToLink = (link) => {
   window.location.href = link

  }
  const { Text } = Typography;
  return (
    <MyContext.Consumer>
      {({ getSelectedValue }) => {
        return (
          <div
          
            className={
              state === true
                ? "list-item-container-highlight"
                : "list-item-container"
            }
          >
            <div className="anchor"
            onClick={()=> debounce(directToLink(listItem.Link))}>
              <div
                onClick={() => getSelectedValue(listItem)}
                className="list-item-inner-container"
                
              >
                <ClockCircleOutlined className="search-icon" />
                <Text>{listItem.API}</Text>
                
              </div>
            </div>
          </div>
        );
      }}
    </MyContext.Consumer>
  );
};

export default AutoListItem;

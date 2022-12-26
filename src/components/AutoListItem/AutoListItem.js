import "./AutoListItem.scss";
import { Typography } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { MyContext } from "../../context";

const AutoListItem = ({ listItem }) => {
  const { Text } = Typography;
  return (
    <MyContext.Consumer>
      {({ getSelectedValue }) => {
        return (
          <div className="list-item">
            <a href={listItem.Link} className='anchor'>
              <div onClick={(e) => getSelectedValue(listItem)} className='list-item-inner-container'>
                <ClockCircleOutlined className="search-icon" />
                <Text>{listItem.API}</Text>
              </div>
            </a>
          </div>
        );
      }}
    </MyContext.Consumer>
  );
};

export default AutoListItem;

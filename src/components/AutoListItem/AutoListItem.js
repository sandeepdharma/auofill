import "./AutoListItem.scss";
import { Typography } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";

const AutoListItem = ({ listItem,getSelectedValue }) => {
  const { Text } = Typography;
  return (
    <div className="list-item"  onClick={(e)=> getSelectedValue(listItem)}>
      <ClockCircleOutlined className="search-icon" />
      <Text>{listItem}</Text>
    </div>
  );
};

export default AutoListItem;

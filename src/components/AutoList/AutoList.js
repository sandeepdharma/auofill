import "./AutoList.scss";
import { ClockCircleOutlined } from "@ant-design/icons";
import { List } from "antd";
import AutoListItem from "../AutoListItem/AutoListItem";
const AutoList = ({ updatedList,getSelectedValue }) => {
  return (
    <div className="list">
      <List
        itemLayout="horizontal"
        dataSource={updatedList}
        renderItem={(item) => (
          <List.Item className="list-item-container" prefix={<ClockCircleOutlined />}>
            <AutoListItem listItem={item} getSelectedValue={getSelectedValue} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default AutoList;

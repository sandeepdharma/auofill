import "./AutoList.scss";
import { ClockCircleOutlined } from "@ant-design/icons";
import { List } from "antd";
import AutoListItem from "../AutoListItem/AutoListItem";
import { MyContext } from "../../context";
const AutoList = () => {
  return (
    <MyContext.Consumer>
        {({updatedList})=>{
            return(<div className="list">
            <List
              itemLayout="horizontal"
              dataSource={updatedList}
              renderItem={(item) => (
                <List.Item className="list-item-container" prefix={<ClockCircleOutlined />}>
                  <AutoListItem listItem={item}/>
                </List.Item>
              )}
            />
          </div>)
        }}
    </MyContext.Consumer>
    
  );
};

export default AutoList;

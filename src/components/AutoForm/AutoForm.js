import "./AutoForm.scss";
import { Typography, Form, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
const AutoForm = ({ getFormData, getChangeValue, showList, updatedValue }) => {
  const [autofillForm] = Form.useForm();

  if (updatedValue.length > 0) {
    autofillForm.resetFields();
  }

  const { Title } = Typography;
  const formSubmitHandler = (e) => {
    autofillForm.resetFields();
    getFormData(e.input);
  };
  const onChangeHandler = (e) => {
    getChangeValue(e);
  };
  return (
    <div className="form">
      <Title level={1} className="title">
        Goggle
      </Title>
      <Form
        form={autofillForm}
        onFinish={(e) => formSubmitHandler(e)}
        onFinishFailed={(error) => {
          console.log({ error });
        }}
      >
        <Form.Item
          name="input"
          className={
            showList === true ? "input-curve-enable" : "input-curve-disable"
          }
        >
          <Input
            bordered={false}
            autoFocus
            size="large"
            prefix={<SearchOutlined className="search-icon" />}
            onChange={(e) => onChangeHandler(e.target.value)}
            defaultValue={updatedValue}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default AutoForm;

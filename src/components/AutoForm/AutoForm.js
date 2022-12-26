import "./AutoForm.scss";
import React, { useEffect } from "react";
import { Form, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { MyContext } from "../../context";

const AutoForm = () => {
  const [autofillForm] = Form.useForm();
  const { updatedValue } = React.useContext(MyContext);

  function debounce(func) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, 3000);
      console.log("dbouncing working");
    };
  }
  const submitForm = () => {
    autofillForm.resetFields();
    console.log("submit working");
  };
  const formSubmitHandler = () => {
    debounce(() => submitForm());
    console.log("form submit handler");
  };
  const onChangeHandler = (e, getChangeValue) => {
    getChangeValue(e.target.value);
  };
  useEffect(() => {
    if (updatedValue !== undefined) {
      autofillForm.resetFields();
    }
  }, [updatedValue, autofillForm]);
  return (
    <MyContext.Consumer>
      {({ getChangeValue, showList, updatedValue }) => {
        return (
          <div className="form-container">
            <img
              src="/googleLarge.png"
              alt="google-logo"
              className="logo-google"
            />
            <Form
              className="form"
              form={autofillForm}
              onFinish={(e) => formSubmitHandler(e)}
              onFinishFailed={(error) => {
                console.log({ error });
              }}
            >
              <Form.Item
                name="input"
                className={
                  showList === true
                    ? "input-curve-enable"
                    : "input-curve-disable"
                }
              >
                <Input
                  bordered={false}
                  autoFocus
                  size="large"
                  prefix={<SearchOutlined className="search-icon" />}
                  suffix={
                    <img
                      src="/google-voice.png"
                      alt="voice"
                      className="logo-voice"
                    />
                  }
                  placeholder="Search Google or type a URL"
                  onChange={(e) => onChangeHandler(e, getChangeValue)}
                  defaultValue={updatedValue}
                />
              </Form.Item>
            </Form>
          </div>
        );
      }}
    </MyContext.Consumer>
  );
};

export default AutoForm;

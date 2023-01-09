import "./AutoForm.scss";
import React, { useEffect, useState } from "react";
import { Form, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { MyContext } from "../../context";
import { Modal } from "antd";
import Speech from "../Speech";
const AutoForm = () => {
  const [open, setOpen] = useState(false);
  const [autofillForm] = Form.useForm();
  const { updatedValue } = React.useContext(MyContext);
  const { getPressedKey } = React.useContext(MyContext);
  const { getSpeechData } = React.useContext(MyContext);

  function debounce(func, time) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, time);
    };
  }
  const submitForm = () => {
    autofillForm.resetFields();
  };
  const formSubmitHandler = () => {
    debounce(() => submitForm());
  };
  const onChangeHandler = (e, getChangeValue) => {
    getChangeValue(e.target.value);
  };
  const onKeyPress = (e) => {
    getPressedKey(e.keyCode);
  };
  const getVoiceRecognitionData = (data) => {
    setOpen(false);
    getSpeechData(data);
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
              src="googleLarge.png"
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
                      src="google-voice.png"
                      alt="voice"
                      className="logo-voice"
                      onClick={() => setOpen(true)}
                    />
                  }
                  placeholder="Search Google or type a URL"
                  onChange={(e) => onChangeHandler(e, getChangeValue)}
                  onKeyDown={(e) => onKeyPress(e)}
                  defaultValue={updatedValue}
                />
              </Form.Item>
              <Modal
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
              >
                <Speech getVoiceRecognitionData={getVoiceRecognitionData} />
              </Modal>
            </Form>
          </div>
        );
      }}
    </MyContext.Consumer>
  );
};

export default AutoForm;

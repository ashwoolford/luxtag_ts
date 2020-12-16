import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { useAuthStatus, useToken } from "../../Context/UserContext";
import { useHistory } from "react-router-dom";

const layout = {
  labelCol: {
    span: 9,
  },
  wrapperCol: {
    span: 6,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 9,
    span: 6,
  },
};

const LoginForm: React.FC<{}> = ({}) => {
  const [isSending, setIsSending] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { isAuth, setIsAuth } = useAuthStatus();
  const { token, setToken } = useToken();
  let history = useHistory();

  const sendLoginReequest = async () => {
    await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setIsAuth(true);
          setToken(data.token);
          setIsSending(false);
        } else {
          setIsSending(false);
        }
        console.log(data);
      })
      .catch((err) => {
        setIsSending(false);
        console.log(err);
      });
  };
  const onFinish = (values) => {
    setEmail(values.email);
    setPassword(values.password);
    setIsSending(true);
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (isSending && email !== undefined && password !== undefined) {
      sendLoginReequest();
    }
  }, [email, password, isSending]);

  useEffect(() => {
    if (isAuth) {
      console.log("auth home", isAuth);
      history.push("/home");
    }
  }, [isAuth]);

  return (
    <div style={{ marginTop: "40px" }}>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => {
              console.log("dff");
            }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>

      {isSending ? "Sending...." : null}
    </div>
  );
};

export default LoginForm;

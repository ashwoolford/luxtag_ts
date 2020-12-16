import { Form, Input, Button, Checkbox, Tabs, Layout } from "antd";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

const AuthenticationPage = () => {
  const TabPane = Tabs.TabPane;
  const { Content } = Layout;

  function callback(key) {
    console.log(key);
  }

  return (
    <Layout style={{ padding: "0 24px 24px" }}>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          height: 360,
        }}
      >
        <Tabs defaultActiveKey="1" onChange={callback} centered>
          <TabPane tab="Login" key="1">
            <LoginForm />
          </TabPane>
          <TabPane tab="Sign Up" key="2">
            <RegistrationForm />
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
};

export default AuthenticationPage;

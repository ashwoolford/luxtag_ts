import React from 'react';
import { Tabs } from "antd";
import LoginForm from './LoginForm';

const { TabPane } = Tabs;

export default function AuthenticationPage() {

    function callback(key) {
      console.log(key);
    }


    return (
      <Tabs defaultActiveKey="1" onChange={callback} centered>
        <TabPane tab="Sign-in" key="1">
          <LoginForm />
        </TabPane>
        <TabPane tab="Sign-up" key="2">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    );
}

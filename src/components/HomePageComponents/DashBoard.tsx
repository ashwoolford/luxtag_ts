import React from 'react';
import { Layout } from 'antd';

const DashBoard: React.FC<{}> = () => {

    const { Content } = Layout;

    return (
      <Layout style={{ padding: "0 24px 24px" }}>
        <span style={{ margin: "16px 0" }} />
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            height: 360,
          }}
        >
          DashBoard
        </Content>
      </Layout>
    );

}

export default DashBoard;
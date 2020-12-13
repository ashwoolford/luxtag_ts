import React, { useEffect, useState } from "react";
import { Layout, Table, Spin } from "antd";

const RecentSubmissions: React.FC<{}> = () => {
  const { Content } = Layout;

  const [recentWarranties, setRecentWarranties] = useState([]);
  const [isLoaded, setIsLoaded] = useState<Boolean>(false);

  const getWarranties = async () => {
    try {
      await fetch("http://localhost:4000/api/get-warranties")
        .then((res) => res.json())
        .then((data) => {
          setIsLoaded(true);
          setRecentWarranties(data);
        });
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getWarranties();

    const interval = setInterval(() => {
      getWarranties();
      setIsLoaded(true);
    }, 10000);

    return () => clearInterval(interval);
  });

  const columns = [
    {
      title: "Warranty No.",
      dataIndex: "warranty_card_no",
    },
    {
      title: "Product S.N.",
      dataIndex: "product_serial_no",
    },
    {
      title: "Date of Purchase",
      dataIndex: "date_of_purchase",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Contract no.",
      dataIndex: "contract_no",
    },
  ];

  return (
    <Layout style={{ padding: "0 24px 24px" }}>
      <span style={{ margin: "16px 0" }} />

      {isLoaded ? (
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            height: 360,
          }}
        >
          <div>
            <h4>Recent Submissions</h4>
            <Table
              columns={columns}
              dataSource={recentWarranties}
              size="small"
              pagination={{
                showSizeChanger: true,
              }}
            />
          </div>
        </Content>
      ) : (
        <div style={{
            textAlign: 'center',
            marginTop: '20px'
        }} className="spinner">
          <Spin />
        </div>
      )}
    </Layout>
  );
};

export default RecentSubmissions;

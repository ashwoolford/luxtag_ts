import React, { useState, useEffect } from "react";
import { Table, Layout, Spin, Modal } from "antd";
import DetailsForm from "../DetailsPage/DetailsForm";
import { Link } from "react-router-dom";

interface warrantyObject {
  id: number;
  warranty_card_no: string;
  product_serial_no: string;
  date_of_purchase: string;
  name: string;
  ic_no: string;
  dob: string;
  email: string;
  person_id: number;
  contract_no: string;
  state: string;
}

const AllSubmissions: React.FC<{}> = () => {
  const { Content } = Layout;

  const [recentWarranties, setRecentWarranties] = useState([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [currentWarranty, setCurrentWarranty] = useState<warrantyObject>();

  const getWarranties = async () => {
    try {
      await fetch("http://localhost:4000/api/get-warranties", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhc2h3b29sZm9yZEBnbWFpbC5jb20iLCJuYW1lIjoiQXNocmFmIEhvc3NhaW4iLCJpYXQiOjE2MDgwMTIyOTAsImV4cCI6MTYwODI3MTQ5MH0.BetzsDmYfs_W_S8n2oFSCbacdwwcAVjATFNn7gVMrWo",
        },
      })
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
  });

  const columns = [
    {
      title: "Warranty No.",
      dataIndex: "warranty_card_no",
      key: "warrantyno",
    },
    {
      title: "Product S.N.",
      dataIndex: "product_serial_no",
      key: "productsn",
    },
    {
      title: "Date of Purchase",
      dataIndex: "date_of_purchase",
      key: "dateofpurchase",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contract no.",
      key: "contractno",
      dataIndex: "contract_no",
    },
    {
      title: "Action",
      key: "action",
      render: (obj: warrantyObject) => (
        <a
          onClick={() => {
            
            setCurrentWarranty(obj);
            setIsModalVisible(!isModalVisible);
          }}
        >
          Edit
        </a>
      ),
    },
  ];

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
          <Table
            columns={columns}
            dataSource={recentWarranties}
            size="small"
            pagination={{
              showSizeChanger: true,
            }}
          />
        </Content>
      ) : (
        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
          className="spinner"
        >
          <Spin />
        </div>
      )}

      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <DetailsForm
          id={currentWarranty?.id}
          warranty_card_no={currentWarranty?.warranty_card_no}
          product_serial_no={currentWarranty?.product_serial_no}
          date_of_purchase={currentWarranty?.date_of_purchase}
          name={currentWarranty?.name}
          ic_no={currentWarranty?.ic_no}
          dob={currentWarranty?.dob}
          email={currentWarranty?.email}
          person_id={currentWarranty?.person_id}
          contract_no={currentWarranty?.contract_no}
          state={currentWarranty?.state}
        />
      </Modal>
    </Layout>
  );
};

export default AllSubmissions;

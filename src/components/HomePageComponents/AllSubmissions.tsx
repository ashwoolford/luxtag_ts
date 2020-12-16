import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Layout,
  Spin,
} from "antd";
import { useAuthStatus, useToken } from "../../Context/UserContext";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const AllSubmissions: React.FC<{}> = ({}) => {
  const [form] = Form.useForm();
  const [data, setData] = useState<any>();
  const [editingKey, setEditingKey] = useState("");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const { Content } = Layout;
  const { token } = useToken();

  const getWarranties = async () => {
    try {
      await fetch("http://localhost:4000/api/get-warranties", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setIsLoaded(true);
        });
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getWarranties();
  }, []);

  const updateWarrantyInfo = async (newData) => {
    await fetch(`http://localhost:4000/api/update-warranty/${newData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhc2h3b29sZm9yZEBnbWFpbC5jb20iLCJuYW1lIjoiQXNocmFmIEhvc3NhaW4iLCJpYXQiOjE2MDgxMjY5OTEsImV4cCI6MTYwODM4NjE5MX0.iIn__Z7pQ3XvZ6gndXwdWbq0X75vXvTl0MOwkjG5eHI",
      },
      body: JSON.stringify({
        warranty_card_no: newData.warranty_card_no,
        product_serial_no: newData.product_serial_no,
        date_of_purchase: newData.date_of_purchase,
        person_id: newData.person_id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== 200) {
          throw "not updated";
        }
        console.log(data);
      });
  };

  useEffect(() => {
    console.log("Editing key", editingKey);
  }, [editingKey]);

  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    console.log("edit button ", record);
    form.setFieldsValue({
      warranty_card_no: "",
      product_serial_no: "",
      date_of_purchase: "",
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }

      await updateWarrantyInfo(newData[index]);
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Warranty Card No",
      dataIndex: "warranty_card_no",
      width: "25%",
      editable: true,
    },
    {
      title: "Product Serial No",
      dataIndex: "product_serial_no",
      width: "15%",
      editable: true,
    },
    {
      title: "Date of Purchase",
      dataIndex: "date_of_purchase",
      width: "15%",
      editable: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "15%",
      editable: false,
    },
    {
      title: "Contract No",
      dataIndex: "contract_no",
      width: "15%",
      editable: false,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        // console.log("record ", record);
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <a onClick={() => edit(record)}>Edit</a>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    // console.log("col -> ", col);

    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Layout style={{ padding: "0 24px 24px" }}>
      <span style={{ margin: "16px 0" }} />

      {isLoaded ? (
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
          }}
        >
          <div>
            <h4>All Submissions</h4>
            <Form form={form} component={false}>
              <Table
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                  onChange: cancel,
                }}
              />
            </Form>
          </div>
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
    </Layout>
  );
};

export default AllSubmissions;

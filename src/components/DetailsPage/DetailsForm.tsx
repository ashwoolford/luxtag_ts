import React, { useEffect, useState } from "react";
import { Layout, Form, Input, Button, Checkbox } from "antd";

interface IProps {
  id: number | undefined;
  warranty_card_no: string | undefined;
  product_serial_no: string | undefined;
  date_of_purchase: string | undefined;
  name: string | undefined;
  ic_no: string | undefined;
  dob: string | undefined;
  email: string | undefined;
  person_id: number | undefined;
  contract_no: string | undefined;
  state: string | undefined;
}

const DetailsForm: React.FC<IProps> = ({
  id,
  warranty_card_no,
  product_serial_no,
  date_of_purchase,
  name,
  ic_no,
  dob,
  email,
  person_id,
  contract_no,
  state,
}: IProps) => {
  const { Content } = Layout;

  const [warrantyNo, setWarrantyNo] = useState<string | undefined>();
  const [productSerialNumber, setProductSerialNumber] = useState<
    string | undefined
  >();
  const [dateOfPurchase, setDateOfPurchase] = useState<string | undefined>();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  //   useEffect(() => {
  //     // console.log("use effect");
  //     setWarrantyNo(warranty_card_no);
  //     setProductSerialNumber(product_serial_no);
  //     setDateOfPurchase(date_of_purchase);
  //   }, []);

  //   console.log(warrantyNo);

  return (
    <Layout>
      <Content>
        <div>
          <input value={id}></input>
        </div>

        <div>
          <input value={warranty_card_no}></input>
        </div>

        <div>
          <input value={product_serial_no}></input>
        </div>

        {/* <div style={{ marginBottom: 16 }}>
          <Input prefix={"Warranty No: "} defaultValue={warranty_card_no} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <Input prefix={"Product Serial No: "} value={product_serial_no} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <Input prefix={"Date of Purchase: "} value={date_of_purchase} />
        </div> */}
      </Content>
    </Layout>
  );
};

export default DetailsForm;

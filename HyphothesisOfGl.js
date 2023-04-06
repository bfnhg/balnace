import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  Button,
  Select,
  Modal,
  Form,
  Row,
  Input,
  InputNumber,
  Card,
  Space,
  DatePicker,
  Popconfirm,
} from "antd";

import { JSON_API } from "../../../services/Constants";
import axios from "axios";
const { Option } = Select;

const HyphothesisOfGl = (props) => {
  const [open, setOpen] = useState(false);
  const [openHyphothese, setopenHyphothese] = useState(false);

  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  const OnopenHyphothese = async (values) => {
    console.log("Received values of form: ", values);

    const obj = {
      glAccountId: props.liability.glAccount.id,
      annualIncrease: values.annualIncrease,
      beginsOnYear: values.beginsOnYear.$y + "",
      beginsOnMonth: values.beginsOnMonth,
      hypothesis: values.hypothesis,
    };

    console.log("obj:", obj);
    await axios
      .post(`${JSON_API}/Hypothesis/${props.liability.glAccount.id}`, obj)
      .then((res) => {
        console.log(res);
        //  getData();

        // setcountry(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setopenHyphothese(false);
  };

  const columnsHyphothese = [
    {
      title: "Year",
      dataIndex: "beginsOnYear",
      align: "center",
      render: (text, record) => {
        return <div style={{ textAlign: "right" }}>{text}</div>;
      },
    },
    {
      title: "Annual Increase",
      dataIndex: "annualIncrease",
      align: "center",
    },
    {
      title: "Begin On",
      dataIndex: "beginsOnMonth",
      align: "center",
      render: (text, record) => {
        // if (editingRow2 === record.key) {
        //   return (
        //     <Form.Item
        //       name="begin"
        //       rules={[
        //         {
        //           required: true,
        //           message: "Please enter your ",
        //         },
        //       ]}
        //     >
        //       <Select
        //         placeholder="Select month"
        //         // onChange={handleStartPeriodChange}
        //         size={"large"}
        //         // style={{
        //         //   width: "50%",
        //         // }}
        //       >
        //         <Option value={1}>January</Option>
        //         <Option value={2}>February</Option>
        //         <Option value={3}>March</Option>
        //         <Option value={4}>April</Option>
        //         <Option value={5}>May</Option>
        //         <Option value={6}>June</Option>
        //         <Option value={7}>July</Option>
        //         <Option value={8}>August</Option>
        //         <Option value={9}>September</Option>
        //         <Option value={10}>October</Option>
        //         <Option value={11}>November</Option>
        //         <Option value={12}>December</Option>
        //       </Select>
        //     </Form.Item>
        //   );
        // } else {
        return record.beginsOnMonth + "/" + record.beginsOnYear;
        // }
      },
    },
    {
      title: "Hyphothesis",
      dataIndex: "hypothesis",
      align: "center",
      render: (text, record) => {
        return <div style={{ textAlign: "left" }}>{text}</div>;
      },
    },
  ];
  const CollectionCreateHyphothesis = ({
    openHyphothese,
    OnopenHyphothese,
    onCancel,
  }) => {
    return (
      <Modal
        forceRender
        open={openHyphothese}
        title="Create GL Number "
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form2
            .validateFields()
            .then((values) => {
              form2.resetFields();
              OnopenHyphothese(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form2}
          // layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: "public",
          }}
        >
          <Form.Item
            // value={nom}
            name="beginsOnYear"
            label="Year"
            rules={[
              {
                required: true,
                message: "Please input the title of ",
              },
            ]}
          >
            <DatePicker
              // placeholder={t("Selectyear")}
              picker="year"
              style={{
                width: "50%",
                textAlign: "center",
              }}
              size={"large"}
            />
          </Form.Item>
          <Form.Item
            // value={nom}
            name="annualIncrease"
            label="Annual Increase"
            rules={[
              {
                required: true,
                message: "Please input the title of ",
              },
            ]}
          >
            <InputNumber
              // disabled={SHselected}
              min={0}
              max={100}
              size={"large"}
              formatter={(value) => `${value}%`}
              parser={(value) => value.replace("%", "")}
              // onChange={e=>setShareHolderShares(e)}
            />
          </Form.Item>

          <Form.Item
            // value={nom}
            name="beginsOnMonth"
            label="Begin On Month"
            rules={[
              {
                required: true,
                message: "Please input the title of ",
              },
            ]}
          >
            <Select
              placeholder="Select month"
              // onChange={handleStartPeriodChange}
              size={"large"}
              // style={{
              //   width: "50%",
              // }}
            >
              <Option value={1}>January</Option>
              <Option value={2}>February</Option>
              <Option value={3}>March</Option>
              <Option value={4}>April</Option>
              <Option value={5}>May</Option>
              <Option value={6}>June</Option>
              <Option value={7}>July</Option>
              <Option value={8}>August</Option>
              <Option value={9}>September</Option>
              <Option value={10}>October</Option>
              <Option value={11}>November</Option>
              <Option value={12}>December</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="hypothesis"
            label="Hyphothesis"
            rules={[
              {
                required: true,
                message: "Please input the title of  ",
              },
            ]}
          >
            <TextArea rows={2}></TextArea>
          </Form.Item>
        </Form>
      </Modal>
    );
  };
  return (
    <div>
      <Row justify="end" gutter={[16, 16]}>
        <Space
          style={{
            display: "flex",
            marginBottom: 8,
          }}
          align="baseline"
        >
          <Button
            className="Create-button"
            type="primary"
            onClick={() => {
              setopenHyphothese(true);
            }}
            style={{
              textAlign: "right",
            }}
          >
            Create a new Hyphothesis
          </Button>
        </Space>
      </Row>

      <CollectionCreateHyphothesis
        openHyphothese={openHyphothese}
        OnopenHyphothese={OnopenHyphothese}
        onCancel={() => {
          setopenHyphothese(false);
          form2.resetFields();
          // onAddChamp();
        }}
      />

      <Table
        bordered
        columns={columnsHyphothese}
        dataSource={props.HypothesesDataSource}
      />
    </div>
  );
};

export default HyphothesisOfGl;

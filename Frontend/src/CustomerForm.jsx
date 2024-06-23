// src/CustomerForm.js
import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  notification,
  Table,
  Popconfirm,
} from "antd";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const CustomerForm = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [customers, setCustomers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/customers");
      setCustomers(response.data.customers);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (isEditing) {
        // Edit customer
        const response = await axios.put(
          `http://localhost:3000/customers/${currentCustomer._id}`,
          values
        );
        if (response.status === 200) {
          notification.success({
            message: "Success",
            description: "Customer Updated Successfully",
          });
        }
      } else {
        // Create customer
        const response = await axios.post(
          "http://localhost:3000/customers",
          values
        );
        if (response.status === 200) {
          notification.success({
            message: "Success",
            description: "Customer Created Successfully",
          });
        }
      }
      form.resetFields();
      setIsModalVisible(false);
      fetchCustomers(); // Refresh the customer list
    } catch (error) {
      console.error("Error saving customer:", error);
      notification.error({
        message: "Error",
        description: error.response?.data.message || "Something went wrong",
      });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEdit = (customer) => {
    setCurrentCustomer(customer);
    setIsEditing(true);
    form.setFieldsValue(customer);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/customers/${id}`
      );
      if (response.status === 200) {
        notification.success({
          message: "Success",
          description: "Customer Deleted Successfully",
        });
        fetchCustomers(); // Refresh the customer list
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
      notification.error({
        message: "Error",
        description: error.response?.data.message || "Something went wrong",
      });
    }
  };

  const columns = [
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
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure delete this customer?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" icon={<DeleteOutlined />} danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Customer
      </Button>
      <Modal
        title={isEditing ? "Edit Customer" : "Create Customer"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input the email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              { required: true, message: "Please input the phone number!" },
              { len: 10, message: "Phone number must be 10 digits!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please input the address!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Table
        columns={columns}
        dataSource={customers}
        rowKey="_id"
        style={{ marginTop: "20px" }}
      />
    </>
  );
};

export default CustomerForm;

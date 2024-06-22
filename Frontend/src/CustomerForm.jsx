// src/CustomerForm.js
import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, notification } from 'antd';
import axios from 'axios';

const CustomerForm = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/customers');
      setCustomers(response.data.customers);
    } catch (error) {
      console.error('Error fetching customers:', error);
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
      const response = await axios.post('http://localhost:3000/customers', values);
      if (response.status === 200) {
        notification.success({ message: 'Success', description: 'Customer Created Successfully' });
        form.resetFields();
        setIsModalVisible(false);
        fetchCustomers(); // Refresh the customer list
      }
    } catch (error) {
      console.error('Error creating customer:', error);
  
      notification.error({
        message: 'Error',
        description: error.response?.data.message || 'Something went wrong',
      });
    }
  };
  

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>Add Customer</Button>
      <Modal
        title="Create Customer"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input the email!' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              { required: true, message: 'Please input the phone number!' },
              { len: 10, message: 'Phone number must be 10 digits!' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please input the address!' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <table style={{ marginTop: '20px', width: '100%', border: '1px solid #ddd', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Phone</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Address</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{customer.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{customer.email}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{customer.phone}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{customer.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CustomerForm;

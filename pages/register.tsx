import { NextPage } from 'next';
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, Form, Input, Modal, Select } from 'antd';
import Link from 'next/link';
import { Rule } from 'rc-field-form/lib/interface';

const { Item, useForm } = Form;

const { Option } = Select;

const validationErrors: {
  [key: string]: Rule[];
} = {
  name: [{ required: true, message: 'Name is required!' }],
  email: [
    {
      required: true,
      message: 'Email is required!',
    },
    {
      type: 'email',
      message: 'Please enter valid email!',
    },
  ],
  password: [
    {
      min: 6,
      max: 64,
      message: 'Password must be between 6 to 64 characters!',
    },
    {
      required: true,
      message: 'Password is required!',
    },
  ],
  answer: [
    { required: true, message: 'Please enter an answer!' },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (value && !getFieldValue('question')) {
          return Promise.reject(new Error('You must select a question first!'));
        }
      },
    }),
  ],
};

const options = [
  {
    value: 'question1',
    label: 'What is your favourite color?',
  },
  {
    value: 'question2',
    label: "What is your best friend's name?",
  },
  {
    value: 'question3',
    label: 'What city you were born?',
  },
];

const Register: NextPage = () => {
  const [showModal, setShowModal] = useState(false);

  const [form] = useForm();

  const onSubmit = async () => {
    const { name, email, password, secret } = form.getFieldsValue();
    try {
      const { data } = await axios.post('http://localhost:8000/api/register', {
        name,
        email,
        password,
        secret,
      });
      setShowModal(data?.ok);
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row py-5 bg-secondary text-light">
        <div className="col text-center">
          <h1>Register Page</h1>
        </div>
      </div>

      <div className="row py-5">
        <div className="col-md-6 offset-md-3">
          <Form layout="vertical" form={form} scrollToFirstError>
            <Item label="Name" name="name" rules={validationErrors.name}>
              <Input placeholder="Enter Name" />
            </Item>
            <Item
              label="Email"
              name="email"
              required
              rules={validationErrors.email}
            >
              <Input placeholder="Enter Email" />
            </Item>
            <Item
              label="Password"
              name="password"
              required
              rules={validationErrors.password}
            >
              <Input.Password placeholder="Enter Name" />
            </Item>
            <Item
              label="Select a Question"
              name="question"
              help="You can use this to reset your password if forgotten."
              required
            >
              <Select placeholder="Pick a question">
                {options.map(({ value, label }) => (
                  <Option key={value} value={value}>
                    {label}
                  </Option>
                ))}
              </Select>
            </Item>
            <Item label="Answer" name="secret" rules={validationErrors.secret}>
              <Input placeholder="Enter Answer" />
            </Item>
            <Item wrapperCol={{ xs: 24 }}>
              <Button onClick={onSubmit} htmlType="submit" className="col-12">
                Submit
              </Button>
            </Item>
          </Form>
        </div>
      </div>
      <Modal
        title="Congratulations!"
        centered
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <p>{"You've successfully registered!"}</p>
        <Link href="/login">
          <a className="btn btn-sm btn-primary">Login</a>
        </Link>
      </Modal>
    </div>
  );
};

export default Register;

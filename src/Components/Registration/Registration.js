import React, { useRef } from 'react';
import "./Registration.scss"
import {
  Form,
  Input,
  Button,
  notification,
} from 'antd';

const REGISTRATION_NICKNAME_MIN_LENGHT = 3;
const REGISTRATION_NICKNAME_MAX_LENGHT = 30;
const REGISTRATION_PASSWORD_MIN_LENGHT = 6;
const REGISTRATION_SUCCES_MESSAGE = "Succes!";
const REGISTRATION_SUCCES_DESCRIPTION = "You can log in now.";
const REGISTRATION_SUCCES_POSITION = "topRight";
const REGISTRATION_SUCCES_MESSAGE_DURATION = 3.2;

const Registration = (props) => {
  const [form] = Form.useForm();
  const formRef = useRef(null);

  const onFinish = values => {
    props.register({
      "username": values.nickname,
      "password": values.password
    }).then(({errors, userAlreadyExists} = {}) => {
      if (errors) {
        if (userAlreadyExists) {
          formRef.current.setFields([
            {
              name: 'nickname',
              errors: ['Username already taken.'],
            },
         ]);
        }
      } else {
        notification.success({
          message: REGISTRATION_SUCCES_MESSAGE,
          description: REGISTRATION_SUCCES_DESCRIPTION,
          placement: REGISTRATION_SUCCES_POSITION,
          duration: REGISTRATION_SUCCES_MESSAGE_DURATION,
        });
        localStorage.setItem('welcomePageTooltipVisited', true);
        props.goToLogin()
      };
    });
  };

  return (
    <div className="registration">
      <div className="registration__title">Create an Account</div>
      <Form
        ref={formRef}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="nickname"
          label={
            <span>
              Username
            </span>
          }
          rules={[
            {
              required: true,
              message: 'Please input your user name!',
              whitespace: true,
            },
            {
              min: REGISTRATION_NICKNAME_MIN_LENGHT,
              message: 'Username to short.'
            },
            {
              max: REGISTRATION_NICKNAME_MAX_LENGHT,
              message: 'User name to long.'
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            {
              min: REGISTRATION_PASSWORD_MIN_LENGHT,
              message: `Password must be at least ${ REGISTRATION_PASSWORD_MIN_LENGHT } characters long.`
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('Passwords do not match!');
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <div className='registration__footer'>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
          <div className="registration__footer-login"> 
            <div className="registration__footer-login-label" onClick={ props.goToLogin }>
              Already a user? Click here to Log In.
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Registration;
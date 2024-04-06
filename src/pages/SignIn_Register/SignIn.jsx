    import React, { useState } from 'react';
    import { Form, Input, Button, Checkbox } from 'antd';
    import styled from 'styled-components';
    import { MainLogo } from '../../components';
    import { Link, Navigate} from 'react-router-dom';
    import { FORGET_PASSWORD_PAGE } from '../../settings/constant';

    const SignInContainer = styled.div`
    width: 600px;
    border-radius: 0.75rem;
    padding: 50px 100px 50px 100px;
    background-color: rgb(241 245 249 / 64%););
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    `;

    const SignInForm = styled(Form)`
    .ant-form-item {
        margin-bottom: 40px;
    }
    `;

    const ButtonSignIn = styled(Button)`
        background-color: rgb(13 148 136);
    `

    const StyledButton = styled(Button)`
    background-color: ${(props) => (props.isLoginButton ? 'rgb(13 148 136)' : 'default')};
    `;

    const SocialLoginButton = styled(Button)`
    width: 100%;
    margin-bottom: 10px;
    `;

    const SocialLoginContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    & > * {
        margin-right: 10px; // Spacing between buttons
    }

    & > *:last-child {
        margin-right: 0;
    }
    `;

    const mockLogin = async (username, password) => {
        const mockUser = {
            username: 'admin123',
            password: '12345', // You should never store passwords like this in a real app
        };

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (username === mockUser.username && password === mockUser.password) {
                    resolve({ success: true, message: 'Login successful' });
                } else {
                    reject({ success: false, message: 'Incorrect username or password' });
                }
            }, 1000); // Simulate a network request with a timeout
        });
    };

    function SignInPage() {
        const [form] = Form.useForm();
        const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status


        // Usage within the onFinish function in the Form component
        const onFinish = async (values) => {
            try {
                const response = await mockLogin(values.username, values.password);
                console.log(response.message);
                setIsLoggedIn(true); // Update the login state
            } catch (error) {
                console.log(error.message);
                setIsLoggedIn(false); // Update the login state
            }
        };

        if (isLoggedIn) {
            return <Navigate to="/" replace={true} />;
          }

        return (
            <div className="flex h-screen bg-[url('https://media1.thrillophilia.com/filestore/e0sv7qhxf4fg3gd33dfe1liycj4h_shutterstock_2178792551.jpg?dpr=1.75&w=1463')] bg-cover bg-center">
                <div className=" flex flex-col justify-center items-center w-1/2 ">
                    <SignInContainer>
                        <h1 className='scale-150 w-20 ml-5 mb-10'>
                            <MainLogo />
                        </h1>
                        <h2 className='font-semibold text-5xl mb-3'>Welcome Back</h2>
                        <p className='font-medium text-2xl text-slate-500'>Please log into your account</p>

                        <SignInForm 
                            className='mt-10'
                            name="normal_login"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Username!',
                                    },
                                ]}
                            >
                                <Input className='h-10' placeholder="Tên đăng nhập" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                ]}
                            >
                                <Input.Password className='h-10' placeholder="Password" />
                            </Form.Item>

                            <Form.Item className="flex justify-between items-center">
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox className='text-base font-semibold'>Nhớ mật khẩu</Checkbox>
                                </Form.Item>
                                <Link to={FORGET_PASSWORD_PAGE} className='text-base font-semibold text-cyan-700'>Quên mật khẩu ?</Link>
                            </Form.Item>

                            <Form.Item>
                                <ButtonSignIn type="primary" htmlType="submit" className="login-form-button w-full text-base h-10 font-semibold">
                                    Đăng nhập
                                </ButtonSignIn>
                            </Form.Item>

                            <Form.Item>
                                <SocialLoginContainer>
                                    <SocialLoginButton type="primary" className="bg-blue-500 flex-grow text-base h-10 font-semibold">
                                        Facebook
                                    </SocialLoginButton>
                                    <SocialLoginButton type="primary" className="bg-red-500 flex-grow text-base h-10 font-semibold">
                                        Google+
                                    </SocialLoginButton>
                                </SocialLoginContainer>
                            </Form.Item>

                            <Form.Item >
                                <p className='text-base text-center font-semibold'>Don't Have an Account? <a href="" className='ml-2 font-bold text-cyan-700'>Registration</a></p>
                            </Form.Item>
                        </SignInForm>
                    </SignInContainer>
                </div>
            </div>
        );
    }

    export default SignInPage;

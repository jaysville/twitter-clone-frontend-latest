import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import AuthForm, { InputContainer } from "../../components/UI/AuthForm";
import { AuthButton } from "../../components/UI/Buttons";
import { useFormik } from "formik";
import { registerSchema } from "../../schemas";
import { notification, Spin } from "antd";
import { useSignupMutation } from "../../redux/api/authApi";
import { ErrorText } from "./Login";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { refreshToken, updateUser } from "../../redux/slices/authSlice";

const SignUp = () => {
  const [signup, { isLoading, error, isSuccess, data, isError }] =
    useSignupMutation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { values, errors, handleChange, handleBlur, handleSubmit, touched } =
    useFormik({
      initialValues: {
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: registerSchema,
      onSubmit: async () => {
        await signup({
          email: values.email,
          username: values.username,
          password: values.password,
          confirmPassword: values.confirmPassword,
        });
      },
    });

  useEffect(() => {
    if (isSuccess) {
      dispatch(updateUser(data.userId));
      dispatch(refreshToken(data.token));

      notification.success({
        message: "Welcome :)",
        duration: 2,
        placement: "bottomRight",
      });

      navigate("/");
    }
    if (isError) {
      console.log();
      notification.error({
        message:
          error.status === 500 ? "Something went wrong." : error.data.error,
        duration: 3,
        placement: "bottomRight",
      });
    }
  }, [data, error, isSuccess, isError, isLoading, navigate]);
  return (
    <Style>
      <h2>Create Account</h2>
      <p>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
      <AuthForm onSubmit={handleSubmit}>
        <InputContainer>
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email && (
            <ErrorText signup={true}>{errors.email}</ErrorText>
          )}
        </InputContainer>
        <InputContainer>
          <input
            type="text"
            placeholder="username"
            name="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.username && errors.username && (
            <ErrorText signup={true}>{errors.username}</ErrorText>
          )}
        </InputContainer>
        <InputContainer>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.password && errors.password && (
            <ErrorText signup={true}>{errors.password}</ErrorText>
          )}
        </InputContainer>
        <InputContainer>
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <ErrorText signup={true}>{errors.confirmPassword}</ErrorText>
          )}
        </InputContainer>
        {!errors.email &&
          !errors.username &&
          !errors.password &&
          !errors.confirmPassword && (
            <AuthButton isLoading={isLoading}>
              {isLoading ? <Spin /> : "Create Account"}
            </AuthButton>
          )}
      </AuthForm>
    </Style>
  );
};

const Style = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    font-size: 30px;
  }
  p {
    color: #a9a6a6;
    font-size: 15px;
  }
  a {
    text-decoration: none;
    color: #94b2cd;
  }
`;

export default SignUp;

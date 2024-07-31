import styled from "styled-components";
import { Email, Key } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import AuthForm, { InputContainer } from "../../components/UI/AuthForm";
import { AuthButton } from "../../components/UI/Buttons";
import { useLoginMutation } from "../../redux/api/authApi";
import { useFormik } from "formik";
import { loginSchema } from "../../schemas";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken, updateUser } from "../../redux/slices/authSlice";
import { notification, Spin } from "antd";

const Login = () => {
  const [login, { isLoading, error, isSuccess, data, isError }] =
    useLoginMutation();

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const onSubmit = () => {
    handleClick();
  };

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const { values, errors, handleChange, handleBlur, handleSubmit, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit,
    });

  const handleClick = async () => {
    console.log("submitted");
    await login({ email: values.email, password: values.password });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(updateUser(data.userId));
      dispatch(refreshToken(data.token));
      notification.success({
        message: "Welcome Back",
        duration: 3,
        placement: "topRight",
      });
      navigate("/");
    }
    if (isError) {
      console.log(error);
      notification.error({
        message:
          error.status === 500 ? "Something went wrong." : error.data.error,
        duration: 3,
        placement: "topRight",
      });
    }
  }, [isSuccess, error, isError, isLoading, data, dispatch, navigate]);

  return (
    <Style>
      <h2>Sign In</h2>
      <p>
        Don't have an account yet? <Link to="/signup">Create Account</Link>
      </p>
      <AuthForm onSubmit={handleSubmit}>
        <InputContainer>
          <div>
            <i>
              <Email />
            </i>
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>

          {touched.email && errors.email && (
            <ErrorText>{errors.email}</ErrorText>
          )}
        </InputContainer>
        {/* <InputContainer>
          <input placeholder="username" />
        </InputContainer> */}

        <InputContainer>
          <div>
            <i>
              <Key />
            </i>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>

          {errors.password && <ErrorText>{errors.password}</ErrorText>}
        </InputContainer>
        {!errors.email && !errors.password && (
          <AuthButton isLoading={isLoading}>
            {isLoading ? <Spin /> : "Sign In"}
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
  i {
    transform: translateX(-10px) translateY(7px);
  }
`;

export const ErrorText = styled.small`
  color: #c7c0c0;
  transform: ${(props) =>
    props.signup ? "translateX(3px)" : "translateX(26px)"};
`;

export default Login;

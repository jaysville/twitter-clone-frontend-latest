import styled from "styled-components";

import AuthForm, { InputContainer } from "../components/UI/AuthForm";
import { Button, notification, Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import {
  useEditProfileMutation,
  useFetchUserQuery,
} from "../redux/api/userApi";
import { useSelector } from "react-redux";
import { GoBack } from "../components/UI/Buttons";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const profilePicRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const userId = useSelector((state) => state.auth.user);

  const navigate = useNavigate();

  const {
    data: user,
    isSuccess,
    error,
    isError,
    isLoading,
  } = useFetchUserQuery(userId);

  const [
    editProfile,
    {
      isSuccess: editProfileSuccess,
      isLoading: editProfileIsLoading,

      isError: editProfileIsError,
    },
  ] = useEditProfileMutation();

  useEffect(() => {
    if (isSuccess) {
      setBio(user.bio);
      setDisplayName(user.displayName);
    }
  }, [isSuccess, error, user, isError]);

  useEffect(() => {
    if (editProfileSuccess) {
      notification.success({
        message: "Profile Updated",
        duration: 3,
        placement: "bottomRight",
      });
      navigate(`/user/${userId}`);
    }
    if (editProfileIsError) {
      notification.error({
        message: "Something went wrong",
      });
    }
  }, [editProfileIsError, editProfileSuccess, navigate, userId]);

  const handleEditProfile = () => {
    if (!selectedFile && displayName === user.displayName && bio === user.bio) {
      notification.error({
        message: "No changes made.",
        duration: 3,
        placement: "bottomRight",
      });
      return;
    }

    editProfile({ profilePic: selectedFile, displayName, bio });
  };
  return (
    <Style>
      {isLoading ? (
        <Spin />
      ) : (
        <AuthForm editprofile={true}>
          <GoBack />
          <InputContainer>
            <div>
              <label
                onClick={() => {
                  profilePicRef.current.click();
                }}
              >
                Update Picture
              </label>
              <span>
                {selectedFile ? selectedFile[0].name : "png, jpg, jpeg"}
              </span>
            </div>
            <input
              type="file"
              ref={profilePicRef}
              hidden
              onChange={(e) => {
                setSelectedFile(e.target.files);
              }}
            />
          </InputContainer>
          <InputContainer>
            <input
              type="text"
              placeholder="Display Name"
              value={displayName}
              onChange={(e) => {
                setDisplayName(e.target.value);
              }}
            />
          </InputContainer>
          <InputContainer>
            <textarea
              placeholder="Enter Bio"
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
              }}
            />
          </InputContainer>
          <Button onClick={handleEditProfile} disabled={editProfileIsLoading}>
            {editProfileIsLoading ? <Spin /> : "Save"}
          </Button>
        </AuthForm>
      )}
    </Style>
  );
};

export default EditProfile;

const Style = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  label {
    background-color: cornflowerblue;
    border-radius: 5px;
    color: aliceblue;
    width: 100px;
    padding: 5px;
    cursor: pointer;
    transform: translateX(-15px);
  }

  svg {
    margin-bottom: 20px;
  }

  button {
    margin-top: 50px;
    width: 100%;
  }
`;

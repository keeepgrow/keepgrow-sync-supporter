import { Button, Input } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import useInput from "../../utils/hooks/useInput";
import { AuthApi } from "../../../api/auth";

import { useNavigate } from "react-router-dom";

const PopupLoginPage = () => {
  const { value: id, onChange: onChangeId } = useInput("");

  const { value: password, onChange: onChangePassword } = useInput("");

  const [feedback, setFeedback] = useState("");

  const navigate = useNavigate();
  const onSubmit = async () => {
    setFeedback("");

    if (!id.includes("uneedcomms")) {
      setFeedback("유니드컴즈 직원만 로그인 가능합니다.");
      return;
    }

    const res = await AuthApi.login(id, password);

    // setIsInvalidPw(false);
    if (res.status == 200) {
      if (res.data?.accessToken) {
        navigate("/main");
        AuthApi.saveToken(res.data.accessToken, res.data.refreshToken);
        return;
      }
    }

    if (res.status == 400 || res.status == 401) {
      setFeedback("로그인 정보를 찾을 수 없습니다.");
      return;
    }

    if (res.status == 500) {
      setFeedback("서버 오류가 발생했습니다.");
      return;
    }

    setFeedback(res?.message);
  };

  return (
    <Wrapper>
      <div className="input_wrapper">
        <Input
          name="email"
          size="large"
          placeholder="킵그로우 아이디를 입력해 주세요"
          value={id}
          onChange={onChangeId}
        />
        <Input
          name="password"
          size="large"
          placeholder="비밀번호를 입력해 주세요"
          value={password}
          onChange={onChangePassword}
          onPressEnter={onSubmit}
          type="password"
        />
        <div className="feedback">{feedback}</div>
      </div>

      <Button size="large" type="primary" block onClick={onSubmit}>
        로그인
      </Button>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .input_wrapper {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    input {
      font-size: 13px;
    }
  }
  .feedback {
    color: red;
    font-size: 12px;
  }
`;

export default PopupLoginPage;

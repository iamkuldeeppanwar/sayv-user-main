import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Image, Row, Spinner } from "react-bootstrap";
import { getError } from "../utils/error";
import LoginCard from "../components/layout/LoginCard";

export default function QuickAccessPasscode() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputs = useRef([]);
  const [_, setPasscode] = useState(0);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    let newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value !== "" && index < 6 - 1) {
      inputs.current[index + 1].focus();
    }
    setPasscode(newOtp.join(""));
  };

  const handleKeyUp = (e, index) => {
    if (e.keyCode === 8 && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handlePasscode = async () => {
    try {
      localStorage.setItem("accessToken", true);
      localStorage.setItem("user", true);
      localStorage.setItem("bankToken", true);
      navigate("/user/dashboard");
    } catch (error) {
      getError(error);
    }
  };

  return (
    <LoginCard height={"350px"} width={"400px"} passcode={true}>
      <div className="d-flex align-items-center flex-column px-5">
        <Image
          height={"50px"}
          width={"50px"}
          src="/images/UserPerspective.png"
          alt="..."
        />
        <div
          className="mt-2 text-center"
          style={{
            color: "var(--primary-color)",
            fontWeight: 800,
            fontSize: "16px",
          }}
        >
          Enter passcode
        </div>

        <p
          style={{
            fontSize: "10px",
            fontWeight: 600,
            color: "rgba(55, 73, 87, 1)",
          }}
        >
          3 attempts left
        </p>
      </div>

      <div className="otp-input ">
        {otp.map((data, index) => (
          <input
            key={index}
            type="password"
            maxLength="1"
            value={data}
            onChange={(e) => handleChange(e.target, index)}
            onKeyUp={(e) => handleKeyUp(e, index)}
            ref={(el) => (inputs.current[index] = el)}
          />
        ))}
      </div>

      <Row className="mt-3 px-5">
        <Col>
          <Button
            onClick={handlePasscode}
            className="float-sm-end w-100"
            style={{
              background: "var(--primary-color)",
              fontWeight: 700,
              fontSize: "12px",
              padding: "10px",
            }}
          >
            {false ? <Spinner size="sm" /> : "Continue"}
          </Button>
        </Col>
      </Row>
    </LoginCard>
  );
}

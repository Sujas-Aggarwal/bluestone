import { useState } from "react";
import Logo from "../assets/logo1.png";
import { Link } from "react-router-dom";
function Login() {
  const [onOtpScreen, setOnOtpScreen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  if (onOtpScreen) {
    return (
      <OtpScreen phoneNumber={phoneNumber} setOnOtpScreen={setOnOtpScreen} />
    );
  } else {
    return (
      <WelcomeScreen
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        setOnOtpScreen={setOnOtpScreen}
      />
    );
  }
}

function OtpScreen({ phoneNumber, setOnOtpScreen }) {
  const [otp, setOtp] = useState("");
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-1 h-full sm:max-h-[400px] sm:w-xl px-6 py-8">
        <img src={Logo} alt="Logo" className="w-[60px] h-[60px] rounded-full" />
        <h1 className="text-[24px] sm:text-xl font-bold mt-3">
          Verify your Phone Number
        </h1>
        <p className="font-light text-[16px]">
          We have sent a 6-digit OTP to the your number +91 XXXXX{" "}
          {phoneNumber.slice(6)}
        </p>
        <p
          onClick={() => {
            setOnOtpScreen(false);
          }}
          className="text-[#D66342] font-bold cursor-pointer"
        >
          Edit Phone Number
        </p>

        <div
          className="phone-input flex gap-2 w-full bg-white p-3 rounded-xl my-6
         "
        >
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            type="text"
            placeholder="Enter 6 Digit OTP"
            className="w-full
            outline-none
            font-light
            text-[16px]
          "
          />
        </div>
        <div className="mt-auto flex flex-col gap-2">
          <div className="flex gap-2 mb-2">
            <span className="text-[14px]">
              Didn't receive the OTP?{" "}
              <span className=" ml-auto  font-bold text-[#D66342] cursor-pointer">
                Resend OTP
              </span>
            </span>
          </div>
          <Link
          to={"/dashboard"}
            className="w-full h-14 rounded-xl
            bg-linear-to-r from-[#F6A07E] via-[#FFCEBA] to-[#F6A07E]
            text-center flex justify-center items-center
            cursor-pointer
            "
          >
            Verify Phone Number
          </Link>
        </div>
      </div>
    </div>
  );
}

function WelcomeScreen({ phoneNumber, setPhoneNumber, setOnOtpScreen }) {
  console.log(phoneNumber);
  const [isChecked, setIsChecked] = useState(false);
  function changeScreen() {
    // api call here
    setOnOtpScreen(true);
  }
  function canChangeScreen() {
    return (
      phoneNumber.length === 10 && isChecked && phoneNumber.match(/^[0-9]+$/)
    );
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-1 h-full sm:max-h-[400px] sm:w-xl px-6 py-8">
        <img src={Logo} alt="Logo" className="w-[60px] h-[60px] rounded-full" />
        <h1 className="text-[24px] sm:text-xl font-bold mt-3">
          Welcome to Bold!
        </h1>
        <p className="font-light text-[16px]">
          Please enter your 10 digit phone number, <br /> we will send an OTP to
          verify
        </p>
        <div
          className="phone-input flex gap-2 w-full bg-white p-3 rounded-xl my-6
         "
        >
          <div className="county-code-selector text-nowrap font-light px-2">
            🇮🇳 +91
          </div>
          <span className="w-px h-full bg-black"></span>
          <input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            type="text"
            placeholder="Enter Your Mobile Number"
            className="w-full
            outline-none
            font-light
            text-[16px]

          "
          />
        </div>
        <div className="mt-auto flex flex-col gap-2">
          <div className="flex gap-2 mb-2">
            <input
              value={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              type="checkbox"
            />
            <span className="text-[14px]">
              By continuing, you agree to our <Link className="text-blue-600 font-semibold" to={"/policy"}>Terms and Conditions</Link>.
            </span>
          </div>
          <button
            disabled={!canChangeScreen()}
            className="w-full h-14 rounded-xl
            bg-linear-to-r from-[#F6A07E] via-[#FFCEBA] to-[#F6A07E]
            cursor-pointer
            disabled:opacity-50
            "
            onClick={() => changeScreen()}
          >
            Verify Phone Number
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;

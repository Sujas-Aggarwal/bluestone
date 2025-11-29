import { useState } from "react";
import Logo from "../assets/logo1.png";
import Spinner from "../components/Spinner.jsx";
import { Link, useNavigate } from "react-router-dom";
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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  async function goToDashboard() {
    // API Call Here
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    navigate("/dashboard");
  }
  // OTP inputs behave like a single 6-digit input (numeric only)
  const OTP_LENGTH = 6;

  function setDigitAt(index, digit) {
    if (!/^\d$/.test(digit)) return;
    const arr = Array.from({ length: OTP_LENGTH }, (_, i) => otp[i] || "");
    arr[index] = digit;
    const newOtp = arr.join("");
    setOtp(newOtp);
    // focus next
    const nextEl = document.getElementById(`otp-${index + 1}`);
    nextEl?.focus();
  }

  function handleKeyDown(index, e) {
    const key = e.key;
    if (key === "Backspace") {
      e.preventDefault();
      const arr = Array.from({ length: OTP_LENGTH }, (_, i) => otp[i] || "");
      if (arr[index]) {
        arr[index] = "";
        setOtp(arr.join(""));
        const cur = document.getElementById(`otp-${index}`);
        cur?.focus();
      } else if (index > 0) {
        const prev = document.getElementById(`otp-${index - 1}`);
        const arr2 = Array.from({ length: OTP_LENGTH }, (_, i) => otp[i] || "");
        arr2[index - 1] = "";
        setOtp(arr2.join(""));
        prev?.focus();
      }
    } else if (key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      document.getElementById(`otp-${index - 1}`)?.focus();
    } else if (key === "ArrowRight" && index < OTP_LENGTH - 1) {
      e.preventDefault();
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
    if (e.key==="Enter" && otp.length===OTP_LENGTH){
      goToDashboard();
    }
  }

  function handlePaste(index, e) {
    e.preventDefault();
    const paste = (e.clipboardData || window.clipboardData).getData("text");
    const digits = paste.replace(/\D/g, "").split("");
    if (digits.length === 0) return;
    const arr = Array.from({ length: OTP_LENGTH }, (_, i) => otp[i] || "");
    for (let i = 0; i < digits.length && index + i < OTP_LENGTH; i++) {
      arr[index + i] = digits[i];
    }
    const newOtp = arr.join("");
    setOtp(newOtp);
    const focusIndex = Math.min(OTP_LENGTH - 1, index + digits.length);
    document.getElementById(`otp-${focusIndex}`)?.focus();
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-1 h-full sm:max-h-[400px] sm:w-xl px-6 py-8">
        <img src={Logo} alt="Logo" className="w-[60px] h-[60px] rounded-full select-none pointer-events-none" />
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
          className="text-[#D66342] font-semibold cursor-pointer"
        >
          Edit Phone Number
        </p>

        <div className="phone-input flex gap-2 w-full my-6">
          <div className="flex gap-2 w-full">
            {Array.from({ length: OTP_LENGTH }).map((_, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                inputMode="numeric"
                pattern="[0-9]*"
                autoFocus={i === 0}
                maxLength={1}
                value={otp[i] || ""}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  if (!val) return;
                  setDigitAt(i, val[val.length - 1]);
                }}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={(e) => handlePaste(i, e)}
                className="w-12 h-12 border bg-white rounded-xl text-center text-[18px] border-none outline-1 outline-[#F5AC8F]"
              />
            ))}
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-2">
          <div className="flex gap-2 mb-2">
            <span className="text-[14px] flex justify-between w-full">
              Didn't receive the OTP?{" "}
              <span className=" ml-auto font-bold text-[#D66342] cursor-pointer">
                Resend OTP
              </span>
            </span>
          </div>
          <button
            onClick={() => {
              if (otp.length === OTP_LENGTH && /^\d{6}$/.test(otp)) {
                goToDashboard();
              }
            }}
            disabled={otp.length !== OTP_LENGTH || !/^\d{6}$/.test(otp)}
            className="w-full h-14 rounded-xl
            bg-linear-to-r from-[#F6A07E] via-[#FFCEBA] to-[#F6A07E]
            cursor-pointer
            disabled:opacity-80
            disabled:cursor-not-allowed
            flex justify-center items-center
            "
          >
            {isLoading ? <Spinner /> : "Verify Phone Number"}
          </button>
        </div>
      </div>
    </div>
  );
}

function WelcomeScreen({ phoneNumber, setPhoneNumber, setOnOtpScreen }) {
  console.log(phoneNumber);
  const [isChecked, setIsChecked] = useState(false);
  function changeScreen() {
    if (!canChangeScreen()) return;
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
      <div className="flex flex-col gap-1 h-full sm:max-h-[400px] sm:w-xl w-full px-6 py-8">
        <img src={Logo} alt="Logo" className="w-[60px] h-[60px] rounded-full select-none pointer-events-none" />
        <h1 className="text-[24px] sm:text-xl font-bold mt-3">
          Welcome to Bold!
        </h1>
        <p className="font-light text-[16px]">
          Please enter your 10 digit phone number, <br /> we will send an OTP to
          verify
        </p>
        <div className="phone-input flex gap-2 w-full bg-white p-3 rounded-xl my-6 outline-1 outline-[#F5AC8F]">
          <div className="county-code-selector text-nowrap font-light px-2">
            🇮🇳 +91
          </div>
          <span className="w-px h-full bg-black"></span>
          <input
            value={phoneNumber}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                changeScreen();
              }
            }}
            onChange={(e) => {
              if (!e.target.value.match(/^[0-9]*$/)) return;
              setPhoneNumber(e.target.value);
            }}
            type="text"
            maxLength={10}
            placeholder="Enter Your Mobile Number"
            className="w-full
            outline-none
            font-light
            text-[16px]

          "
          />
        </div>
        <div className="mt-auto flex flex-col gap-2">
          <div className="flex gap-2 mb-2 items-center">
            <input
              value={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              type="checkbox"
              className="w-[18px] outline-none cursor-pointer h-[18px] accent-[#F5AC8F]"
            />
            <span className="text-[14px]">
              By continuing, you agree to our{" "}
              <Link className="text-blue-600 font-semibold" to={"/policy"}>
                Terms and Conditions
              </Link>
              .
            </span>
          </div>
          <button
            disabled={!canChangeScreen()}
            className="w-full h-14 rounded-xl
            bg-linear-to-r from-[#F6A07E] via-[#FFCEBA] to-[#F6A07E]
            cursor-pointer
            disabled:opacity-80
            disabled:cursor-not-allowed
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

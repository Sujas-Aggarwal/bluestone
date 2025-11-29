import Logo from "../assets/gold.png";
import bg from "../assets/bg.png";
import { useState } from "react";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
function Home() {
  enum Mode {
    Amount,
    Weight,
  }
  const [val, setVal] = useState(0);
  const [rate, setRate] = useState(8000);
  const [mode, setMode] = useState(Mode.Amount); // 0 for amount, 1 for weight
  const [isLoading, setIsLoading] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(true);
  const navigate = useNavigate();

  async function purchase() {
    // Purchase Logic Here
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setIsPurchasing(false);
  }

  if (!isPurchasing) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col gap-1 h-full sm:max-h-[250px] sm:w-xl w-full px-6 py-8">
          <h1 className="text-[24px] sm:text-xl font-bold mt-3">
            Congratulations! You now own {mode == Mode.Amount ? val / rate : val}g 24K gold
          </h1>
          <p className="font-light text-[16px]">
            Your purchase of ₹{mode == Mode.Amount ? val : val * rate} ({mode == Mode.Amount ? val / rate : val}g) has been added to your BOLD portfolio. 100% pure, insured, and securely stored.
          </p>
          <div className="mt-auto flex flex-col gap-2">
            <button
            onClick={()=>{
              navigate("https://github.com/Sujas-Aggarwal")
            }}
              className="w-full h-14 rounded-xl
                bg-linear-to-r from-[#F6A07E] via-[#FFCEBA] to-[#F6A07E]
                cursor-pointer
                "
            >
              See Portfolio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <img
        src={bg}
        className="h-full absolute top-0 left-0 z-[-1] select-none pointer-none"
      />
      <div className="flex flex-col gap-1 h-full sm:max-h-[400px] w-full sm:w-xl px-6 py-8">
        <img
          src={Logo}
          alt="Logo"
          className="w-[60px] h-[60px] rounded-full select-none pointer-events-none"
        />
        <h1 className="text-[24px] sm:text-xl font-bold mt-3">Buy Gold</h1>
        <p className="font-light text-[16px]">
          Select amount or value to proceed
        </p>
        <div className="relative flex justify-center items-center bg-white rounded-full p-3 mt-3 outline-1 outline-[#f5ac8f7d]">
          <div
            style={{
              transform:
                mode == Mode.Weight ? "translate(50%)" : "translate(-50%)",
            }}
            className="bg-linear-to-r from-[#F6A07E] transition duration-300 ease-in-out via-[#FFCEBA] to-[#F6A07E] w-[calc(50%-2px)] h-[calc(100%-4px)] rounded-full absolute"
          ></div>
          <div
            onClick={() => {
              setMode(Mode.Amount);
            }}
            className="flex-1 text-center z-1 cursor-pointer"
          >
            Amount (₹)
          </div>
          <div
            onClick={() => {
              setMode(Mode.Weight);
            }}
            className="flex-1 text-center z-1 cursor-pointer"
          >
            Weight (grams)
          </div>
        </div>
        <div
          className="phone-input flex gap-2 w-full bg-white p-3 rounded-xl my-3 outline-1 outline-[#F5AC8F]
         "
        >
          {
            mode == Mode.Amount && <div className="county-code-selector text-nowrap font-light px-2">
            ₹
          </div>
          }
          
          <input
            type="text"
            value={val}
            onChange={(e) => {
              if (isLoading) return;
              setVal(parseFloat(e.target.value || "0"));
            }}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                purchase();
              }
            }}
            placeholder="Enter Amount"
            autoFocus={true}
            className="w-full
            outline-none
            font-light
            text-[16px]
          "
          />
           {
            mode == Mode.Weight && <div className="county-code-selector text-nowrap font-light px-2">
            grams
          </div>
          }
        </div>
        <div className="flex flex-col gap-2 p-3 text-[16px] rounded-xl bg-[#D663421A]">
          <div className="flex justify-between">
            <p>Amount</p>
            <p>₹ {mode == Mode.Amount ? val : val * rate}</p>
          </div>
          <div className="flex justify-between">
            <p>Gold Value</p>
            <p>{mode == Mode.Amount ? val / rate : val} grams</p>
          </div>
          <div className="flex justify-between">
            <p>Current Gold Rate</p>
            <p>₹ {rate} / gram</p>
          </div>
        </div>
        <div className="mt-auto flex flex-col gap-2">
          <button
            onClick={purchase}
            disabled={val <= 0}
            className="w-full h-14 rounded-xl
              bg-linear-to-r from-[#F6A07E] via-[#FFCEBA] to-[#F6A07E]
              cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed
              flex justify-center items-center
              "
          >
            {isLoading ? <Spinner /> : "Buy Gold"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;

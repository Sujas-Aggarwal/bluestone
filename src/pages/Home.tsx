import Logo from "../assets/gold.png";
function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-1 h-full sm:max-h-[400px] sm:w-xl px-6 py-8">
        <img src={Logo} alt="Logo" className="w-[60px] h-[60px] rounded-full" />
        <h1 className="text-[24px] sm:text-xl font-bold mt-3">Buy Gold</h1>
        <p className="font-light text-[16px]">
          Select amount or value to proceed
        </p>
        <div
          className="phone-input flex gap-2 w-full bg-white p-3 rounded-xl my-3
         "
        >
          <div className="county-code-selector text-nowrap font-light px-2">
            ₹
          </div>
          <input
            type="text"
            placeholder="Enter Amount"
            className="w-full
            outline-none
            font-light
            text-[16px]
          "
          />
        </div>
        <div className="flex flex-col gap-2 p-3 text-[16px] rounded-xl bg-[#D663421A]">
          <div className="flex justify-between">
            <p>Amount</p>
            <p>₹ 00.00</p>
          </div>
          <div className="flex justify-between">
            <p>Gold Value</p>
            <p>00 grams</p>
          </div>
          <div className="flex justify-between">
            <p>Current Gold Rate</p>
            <p>₹ 1000 / gram</p>
          </div>
        </div>
        <div className="mt-auto flex flex-col gap-2">
          <button
            className="w-full h-14 rounded-xl
              bg-linear-to-r from-[#F6A07E] via-[#FFCEBA] to-[#F6A07E]
              cursor-pointer
              "
          >
            Buy Gold
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;

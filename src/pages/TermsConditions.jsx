import Logo from "../assets/logo1.png";
function TermsConditions() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-1 h-full md:max-h-[400px] md:w-xl px-6 py-8">
        <img
          src={Logo}
          alt="Logo"
          className="w-[60px] h-[60px] rounded-full mb-6"
        />
        <h1 className="font-bold text-xl">Terms & Conditions</h1>
        <div className="flex gap-2 flex-col">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
            numquam officia doloribus doloremque, ex expedita magnam asperiores
            deleniti tempore exercitationem, ipsa nemo temporibus.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. <br /> Soluta
            numquam officia doloribus doloremque, ex expedita magnam asperiores
            deleniti tempore exercitationem, ipsa nemo temporibus.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TermsConditions;

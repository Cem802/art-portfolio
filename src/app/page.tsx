import Navbar from "@/components/Navbar";
import Work from "@/components/Work";

export default function Home() {
  return (
    <div>
      <div style={{
        backgroundImage: `url('/images/background.jpg')`,
      }} className="relative overflow-hidden min-h-[100vh] bg-fixed bg-center bg-no-repeat bg-cover">
        <Navbar />
        <div className="p-4">
          <div className="w-full h-96 flex flex-col justify-center items-center">
            <h1 className="text-[150px] m-5 text-[#9FCC2E]">Art by Sera</h1>
            <p className="text-2xl text-white">Digital Artist</p>
          </div>
        </div>
      </div>
      <Work />
    </div>
  );
}

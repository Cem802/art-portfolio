import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="relative">
      <div
        className="absolute top-0 left-0 w-full h-full bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: 'url("/images/background.jpg")',
          transform: 'translateZ(0)',
          willChange: 'transform',
          zIndex: -1,
        }}
      />
      <div className="relative z-10 min-h-screen">
        <Navbar />
        <div className="p-4">
          <div className="w-full h-96 flex flex-col justify-center items-center">
            <h1 className="text-[150px] m-5 text-red-500 font-bold">Art by Sera</h1>
            <p className="text-2xl text-white">Digital Artist</p>
          </div>
          
        </div>
      </div>
    </div>
  );
}

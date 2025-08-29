import { useParams } from "react-router-dom";
import Lottie from "lottie-react";
import handshakeAnim from "../assets/lottie/Handshake.json";

const ConnectionSuccess = () => {
    const { linkCode } = useParams();

    const handleContinue = () => {
        if (linkCode) {
            window.location.href = `https://app.biizline.com/${linkCode}`;
        } else {
            window.location.href = "https://app.biizline.com/";
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50 text-gray-900">

            {/* Abstract dynamic background (light) */}
            <div className="absolute inset-0">
                <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-green-200/50 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-100/60 rounded-full blur-2xl animate-bounce"></div>
                <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] bg-teal-200/40 rounded-full blur-2xl animate-ping"></div>
            </div>

            {/* Center Animation */}
            <div className="z-10 relative">
                <Lottie animationData={handshakeAnim} loop style={{ height: 240, width: 240 }} />
            </div>

            <h1 className="z-10 relative mt-8 text-5xl md:text-6xl font-extrabold tracking-wide">
                <span className="bg-gradient-to-r from-emerald-600 via-green-700 to-teal-600 bg-clip-text text-transparent drop-shadow-md">
                    Connection Successful
                </span>
            </h1>

            <div className="z-10 mt-3 h-1 w-32 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full animate-pulse"></div>

            <p className="z-10 mt-6 text-lg text-gray-600 max-w-xl text-center leading-relaxed">
                Your connection has been{" "}
                <span className="text-green-700 font-semibold">successfully established</span>.
                You’re ready to continue 🚀
            </p>

            <button
                onClick={handleContinue}
                className="z-10 relative mt-10 px-12 py-4 text-lg font-bold rounded-2xl
                   bg-gradient-to-r from-green-500 via-emerald-600 to-green-700
                   text-white shadow-lg
                   transition-all duration-500 transform hover:scale-110 active:scale-95
                   hover:shadow-green-400/50
                   overflow-hidden"
            >
                <span className="relative z-10">Continue →</span>
                <span className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition duration-500"></span>
            </button>
        </div>
    );
};

export default ConnectionSuccess;

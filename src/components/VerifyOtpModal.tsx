import { Modal, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { CheckCircleFilled } from "@ant-design/icons";
import ArrowLeft from "../assets/icons/arrow-left.svg";
import CloseIcon from "../assets/icons/x.svg";
import Frame from "../assets/icons/Frame.svg";

interface VerifyOtpModalProps {
    open: boolean;
    onClose: () => void;
    phoneNumber: string;
    onSubmitOtp: (otp: string) => boolean;
    onBack: () => void;
}

const VerifyOtpModal = ({
    open,
    onClose,
    phoneNumber,
    onSubmitOtp,
    onBack,
}: VerifyOtpModalProps) => {
    const [otp, setOtp] = useState(Array(5).fill(""));
    const inputsRef = useRef<Array<HTMLInputElement | null>>(new Array(5).fill(null));
    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState(false);
    const [timer, setTimer] = useState(0);
    const [isOtpMatched, setIsOtpMatched] = useState(false);
    const [showOtpMessage, setShowOtpMessage] = useState(false);

    const handleChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return;

        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);
        setError(false);

        if (value && index < otp.length - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleSubmit = () => {
        const otpString = otp.join("");
        if (otpString.length !== 5) {
            message.error("Please enter a valid 5-digit OTP");
            setError(true);
            return;
        }

        const success = onSubmitOtp(otpString);
        if (success) {
            setIsOtpMatched(true);
            setShowOtpMessage(true);
            setTimeout(() => {
                setIsVerified(true);
            }, 1000);
        } else {
            setIsOtpMatched(false);
            setShowOtpMessage(false);
            message.error("OTP does not match");
            setError(true);
        }
    };

    const handlePlaceOrder = () => {
        setIsVerified(false);
        onClose();
    };

    const startTimer = () => {
        setTimer(60);
        const countdown = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(countdown);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleResendOtp = () => {
        message.success("OTP resent successfully!");
        setOtp(Array(5).fill(""));
        setIsOtpMatched(false);
        setShowOtpMessage(false);
        setError(false);
        startTimer();
        setTimeout(() => inputsRef.current[0]?.focus(), 200);
    };

    useEffect(() => {
        if (open) {
            setOtp(Array(5).fill(""));
            setIsVerified(false);
            setShowOtpMessage(false);
            setIsOtpMatched(false);
            setError(false);
            setTimeout(() => inputsRef.current[0]?.focus(), 200);
            startTimer();
        }
    }, [open]);

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            closeIcon={false}
            centered
            className="w-full max-w-[460px] sm:max-w-[500px] md:max-w-[550px] px-4"
            styles={{
                body: {
                    padding: "1.5rem",
                    maxHeight: "85vh",
                    overflowY: "auto",
                },
            }}
        >
            {!isVerified ? (
                <div className="rounded-[16px]">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4 gap-4">
                        <div
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={onBack}
                        >
                            <img src={ArrowLeft} alt="Back" className="w-5 h-5" />
                            <h3 className="text-[18px] font-semibold text-gray-800">
                                Verify OTP
                            </h3>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-[28px] h-[28px] flex items-center justify-center rounded hover:bg-gray-100 transition"
                        >
                            <img src={CloseIcon} alt="Close" className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Phone Info */}
                    <p className="text-sm text-gray-600 mb-3">
                        OTP sent to <strong>+91 {phoneNumber}</strong>{" "}
                        <button
                            onClick={onBack}
                            className="text-blue-600 ml-2 font-medium hover:underline"
                        >
                            Change
                        </button>
                    </p>

                    {/* OTP Inputs */}
                    <div className="flex flex-col items-center">
                        <div className="flex justify-center gap-2 p-2 m-2">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el: HTMLInputElement | null) => {
                                        inputsRef.current[index] = el;
                                    }}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(e.target.value, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    className={`w-[48px] sm:w-[60px] md:w-[70px] h-[56px] sm:h-[60px] md:h-[64px] rounded-[12px] text-center text-[22px] font-semibold border focus:outline-none transition-all ${error
                                        ? "border-red-500"
                                        : otp.join("").length === otp.length
                                            ? "border-green-500"
                                            : "border-gray-300 focus:border-blue-500"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Resend Block */}
                    <div className="text-left text-sm text-gray-600 mb-2 mt-3">
                        Didn't receive OTP?{" "}
                        {timer > 0 ? (
                            <span className="text-gray-400">Resend OTP in {timer}s</span>
                        ) : (
                            <span
                                className="text-blue-600 font-medium cursor-pointer hover:underline"
                                onClick={handleResendOtp}
                            >
                                Resend OTP
                            </span>
                        )}
                    </div>

                    {/* OTP Verified Message */}
                    {isOtpMatched && showOtpMessage && (
                        <div className="flex items-center text-green-600 text-sm font-medium mt-2 mb-3">
                            <img src={Frame} alt="verified" className="w-4 h-4 mr-1" />
                            OTP Verified
                        </div>
                    )}

                    <button
                        onClick={handleSubmit}
                        className="w-full h-[48px] rounded-[10px] bg-black text-white text-base font-semibold"
                    >
                        Submit
                    </button>
                </div>
            ) : (
                <div className="relative text-center p-4 sm:p-6 pt-12">
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-green-500 rounded-full p-4 shadow-lg">
                        <CheckCircleFilled className="text-white text-4xl" />
                    </div>

                    <h2 className="text-xl font-semibold mt-4">You're All Set</h2>
                    <p className="text-gray-600 mt-2 px-4">
                        Welcome to <strong>Biizline</strong>. You're now connected with the
                        vendor and ready to manage your business seamlessly.
                    </p>

                    <button
                        onClick={handlePlaceOrder}
                        className="mt-6 bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 transition"
                    >
                        Place Order
                    </button>
                </div>
            )}
        </Modal>
    );
};

export default VerifyOtpModal;

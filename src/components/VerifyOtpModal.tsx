import { Modal, message } from "antd";
import { useEffect, useRef, useState } from "react";
import ArrowLeft from "../assets/icons/arrow-left.svg";
import CloseIcon from "../assets/icons/x.svg";
import Frame from "../assets/icons/Frame.svg";
import SuccessModal from "./SuccessModal";
import { sendOtpEndPoint } from "../endpoints/OtpApi-endpoint";
import { connectionEndPoint } from "../endpoints/connection-endpoint";


interface VerifyOtpModalProps {
    open: boolean;
    onClose: () => void;
    phoneNumber: string;
    onBack: () => void;
    formData: {
        companyName: string;
        firstName: string;
        lastName: string;
        phoneNo: string;
        state: string;
        city: string;
    };
}

const VerifyOtpModal = ({ open, onClose, phoneNumber, onBack, formData }: VerifyOtpModalProps) => {
    const [otp, setOtp] = useState(Array(5).fill(""));
    const inputsRef = useRef<Array<HTMLInputElement | null>>(new Array(5).fill(null));
    const [error, setError] = useState(false);
    const [timer, setTimer] = useState(0);
    const [isOtpMatched, setIsOtpMatched] = useState(false);
    const [successModalOpen, setSuccessModalOpen] = useState(false);

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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async () => {
        const otpString = otp.join("");
        if (otpString.length !== 5) {
            message.error("Please enter a valid 5-digit OTP");
            setError(true);
            return;
        }

        try {
            const res = await fetch(sendOtpEndPoint.VERIFIED_OTP, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phoneNo: phoneNumber, otp: otpString }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                message.success("OTP Verified Successfully!");
                setIsOtpMatched(true);
                setError(false);

                try {
                    const connectionApiRes = await fetch(connectionEndPoint.ADD_NEW_CONNECTION, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(formData),
                    });

                    const connectionData = await connectionApiRes.json();

                    if (connectionApiRes.ok) {
                        console.log("New Connection Create Successfully:", connectionData);
                        message.success("New Connection Create Successfully!");

                    } else {
                        console.error("New Connection API failed:", connectionData);
                        message.error(connectionData.message || "Failed to add connection");
                    }
                } catch (err) {
                    console.error("Error calling second API:", err);
                    message.error("Error while adding connection. Please try again.");
                }

                setTimeout(() => {
                    onClose();
                    setSuccessModalOpen(true);
                }, 600);
            } else {
                message.error(data.message || "Invalid OTP");
                setIsOtpMatched(false);
                setError(true);
            }
        } catch (err) {
            console.error(err);
            message.error("Something went wrong while verifying OTP");
        }
    };

    const startTimer = () => {
        setTimer(60);
        const countdown = setInterval(() => {
            setTimer(prev => {
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
        setError(false);
        startTimer();
        setTimeout(() => inputsRef.current[0]?.focus(), 200);
    };

    useEffect(() => {
        if (open) {
            setOtp(Array(5).fill(""));
            setIsOtpMatched(false);
            setError(false);
            setTimeout(() => inputsRef.current[0]?.focus(), 200);
            startTimer();
        }
    }, [open]);

    return (
        <>
            <Modal
                open={open}
                onCancel={onClose}
                footer={null}
                closeIcon={false}
                centered
                className="w-full max-w-[460px] sm:max-w-[500px] md:max-w-[550px] px-4"
                styles={{ body: { padding: "1.5rem", maxHeight: "85vh", overflowY: "auto", } }}
            >
                <div className="rounded-[16px]">
                    <div className="flex items-center justify-between mb-4 gap-4">
                        <div className="flex items-center gap-2 cursor-pointer" onClick={onBack}>
                            <img src={ArrowLeft} alt="Back" className="w-5 h-5" />
                            <h3 className="text-[18px] font-semibold text-gray-800">Verify OTP</h3>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-[28px] h-[28px] flex items-center justify-center rounded hover:bg-gray-100 transition"
                        >
                            <img src={CloseIcon} alt="Close" className="w-5 h-5" />
                        </button>
                    </div>

                    <p className="text-sm text-gray-600 mb-3">
                        OTP sent to <strong>+91 {phoneNumber}</strong>{" "}
                        <button onClick={onBack} className="text-blue-600 ml-2 font-medium hover:underline">
                            Change
                        </button>
                    </p>

                    <div className="flex flex-col items-center">
                        <div className="flex justify-center gap-2 p-2 m-2">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={element => (inputsRef.current[index] = element)}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={e => handleChange(e.target.value, index)}
                                    onKeyDown={e => handleKeyDown(e, index)}
                                    className={`w-[48px] sm:w-[60px] md:w-[70px] h-[56px] sm:h-[60px] md:h-[64px] rounded-[12px] text-center text-[22px] font-semibold border focus:outline-none transition-all ${error
                                        ? "border-red-500"
                                        : isOtpMatched
                                            ? "border-green-500"
                                            : "border-gray-300 focus:border-blue-500"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="text-left text-sm text-gray-600 mb-2 mt-3">
                        Didn't receive OTP?{" "}
                        {timer > 0 ? (
                            <span className="text-gray-400">Resend OTP in {timer}s</span>
                        ) : (
                            <span className="text-blue-600 font-medium cursor-pointer hover:underline" onClick={handleResendOtp}>
                                Resend OTP
                            </span>
                        )}
                    </div>

                    {isOtpMatched && (
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
            </Modal>
            <SuccessModal open={successModalOpen} onClose={() => setSuccessModalOpen(false)} />
        </>
    );
};

export default VerifyOtpModal;

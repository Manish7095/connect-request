import { Modal, Button } from "antd";
import Lottie from "lottie-react";
import animationData from "../assets/lottie/Celebrate.json";
import { useNavigate, useParams } from "react-router-dom";

interface SuccessModalProps {
    open: boolean;
    onClose: () => void;
}

const SuccessModal = ({ open, onClose }: SuccessModalProps) => {
    const navigate = useNavigate();
    const { linkCode } = useParams();

    const handleSubmit = () => {
        onClose();
        navigate(`/success/${linkCode || ""}`);
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            centered
            closable={false}
            className="!w-full sm:!w-[459px] !h-auto sm:!h-[234px] !max-w-[95%] relative rounded-[16px]"
            styles={{ body: { padding: 0 } }}
        >
            <div className="absolute -top-[120px] left-1/2 -translate-x-1/2 z-10 w-[180px] sm:w-[200px]">
                <Lottie animationData={animationData} loop={false} autoplay />
            </div>

            <div className="relative z-10 flex flex-col justify-center items-center gap-3 text-center p-6 h-full w-full">
                <h2 className="text-2xl text-[#1B1D24] font-semibold">You're All Set</h2>
                <p className="text-[#4B5563] text-xs max-w-[340px]">
                    Welcome to Biizline. You're now connected with the vendor and ready to
                    manage your business seamlessly.
                </p>
                <Button
                    onClick={handleSubmit}
                    className="flex !justify-center !items-center min-h-[50px] w-full !bg-black !text-white !text-base !font-semibold rounded-md shadow"
                >
                    Submit
                </Button>
            </div>
        </Modal>
    );
};

export default SuccessModal;

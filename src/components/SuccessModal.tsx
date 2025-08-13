import { Modal, Button } from "antd";
import Lottie from "lottie-react";
import animationData from "../assets/lottie/Celebrate.json";

interface SuccessModalProps {
    open: boolean;
    onClose: () => void;
}

const SuccessModal = ({ open, onClose }: SuccessModalProps) => {
    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            centered
            closable={false}
            className="!w-full sm:!w-[459px] !h-auto sm:!h-[234px] !max-w-[95%] relative rounded-[16px]"
            styles={{
                body: {
                    padding: 0,
                },
            }}
        >
            <div className="absolute -top-[120px] left-1/2 -translate-x-1/2 z-10 w-[180px] sm:w-[200px]">
                <div className="flex items-center justify-center">
                    <Lottie animationData={animationData} loop={false} autoplay />
                </div>
            </div>

            <div className="relative z-10 flex flex-col justify-center items-center gap-3 text-center p-6 h-full w-full">
                <h2 className="text-2xl text-[#1B1D24] font-inter-tight font-semibold leading-normal">
                    You're All Set
                </h2>

                <p className="text-[#4B5563] font-normal leading-normal text-xs max-w-[90%] sm:max-w-[340px]">
                    Welcome to Biizline. You're now connected with the vendor and ready to manage your business seamlessly.
                </p>

                <Button
                    onClick={onClose}
                    className="flex !justify-center !items-center !gap-1 min-h-[50px] w-full self-stretch !bg-black !text-white !font-inter-tight !text-base !text-lg leading-tight !font-semibold rounded-md shadow"
                >
                    Submit
                </Button>
            </div>
        </Modal>
    );
};

export default SuccessModal;

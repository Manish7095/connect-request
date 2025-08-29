import axios from "axios";
import { sendOtpEndPoint } from "../endpoints/OtpApi-endpoint";

// OTP API Call
export const getOTP = async (data: { phoneNo: string }) => {
    try {
        const res = await axios.post(sendOtpEndPoint.SEND_OTP_BY_phoneNo, {
            phoneNo: data.phoneNo,
        });

        return res.data;
    } catch (error: any) {
        console.error("Error while sending OTP:", error.response || error);
        throw error;
    }
};

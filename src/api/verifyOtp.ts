import axios from "axios";
import { sendOtpEndPoint } from "../endpoints/OtpApi-endpoint";

export const verifyOtp = async (phoneNo: string, otp: string) => {
    try {
        const response = await axios.post(sendOtpEndPoint.VERIFIED_OTP, {
            phoneNo,
            otp,
        });
        return response.data;
    } catch (error: any) {
        throw error.response?.data || { success: false, message: "Something went wrong" };
    }
};

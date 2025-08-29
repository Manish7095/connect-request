const API_BASE_URL = "http://192.168.1.46:5000/api/v3";

export const sendOtpEndPoint = {
    SEND_OTP_BY_phoneNo: `${API_BASE_URL}/Connction/send-otp`,
    VERIFIED_OTP: `${API_BASE_URL}/Connction/verify-otp`
};

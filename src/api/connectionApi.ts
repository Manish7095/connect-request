import axios from "axios";
import { connectionEndPoint } from "../endpoints/connection-endpoint";

export interface ConnectionData {
    companyName: string;
    firstName: string;
    lastName: string;
    phoneNo: string;
    state: string;
    city: string;
}

export const addNewConnection = async (data: ConnectionData) => {
    try {
        const payload: ConnectionData = {
            companyName: data.companyName,
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNo: data.phoneNo,
            state: data.state,
            city: data.city,
        };

        console.log("📤 Sending payload:", payload);

        const res = await axios.post(connectionEndPoint.ADD_NEW_CONNECTION, payload, {
            headers: { "Content-Type": "application/json" },
        });

        console.log("✅ API Response:", res.data);
        return res.data;
    } catch (error: any) {
        console.error("❌ Error adding new connection:", error.response?.data || error);
        throw error;
    }
};

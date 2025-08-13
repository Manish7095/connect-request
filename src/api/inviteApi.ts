import axios from "axios";
import { inviteApiEndpoints } from "./endpoints";

export interface GenerateLinkResponse {
    status: number;
    message: string;
    data: {
        companyId: number;
        linkCode: string;
        existing: boolean;
    };
}

export interface VerifyLinkResponse {
    status: number;
    message: string;
    data: {
        companyId: number;
        companyName: string;
        firstName: string;
        lastName: string;
        businessType: string[];
        state: string;
        city: string;
        aboutCompany: string | null;
        productCount: number;
        connectionCount: number;
        industryTypes: string[];
        categories: string[];
    };
}

export const generateLinkByCompanyId = async (companyId: number) => {
    const res = await axios.get<GenerateLinkResponse>(
        inviteApiEndpoints.GENERATE_LINK_BY_COMPANY_ID,
        {
            params: {
                companyId,
            },
        }
    );
    return res.data;
};

export const verifyLinkAndGetData = async (linkCode: string) => {
    const res = await axios.get<VerifyLinkResponse>(
        inviteApiEndpoints.VERIFY_LINK_AND_GET_DATA,
        {
            params: {
                linkCode,
            },
        }
    );
    return res.data;
};

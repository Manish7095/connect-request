import { API_BASE_URL } from "../constants/apiConstants";

export const inviteApiEndpoints = {
    GENERATE_LINK_BY_COMPANY_ID: `${API_BASE_URL}/public/invite/generateLinkByCompanyId`,
    VERIFY_LINK_AND_GET_DATA: `${API_BASE_URL}/public/invite/verifyLinkAndGetData`,
    // LINK_VERIFY_COMPANY_DATA: `${API_BASE_URL}/Connction/company`,
};

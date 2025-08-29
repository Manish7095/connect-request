import axios from "axios";
import { inviteApiEndpoints } from "../endpoints/inviteApiEndpoints";

// export const generateLinkByCompanyId = async (companyId: number) => {
//     const res = await axios.get(
//         inviteApiEndpoints.GENERATE_LINK_BY_COMPANY_ID,
//         {
//             params: {
//                 companyId,
//             },
//         }
//     );
//     return res.data;
// };

export const verifyLinkAndGetData = async (linkCode: string) => {
    console.log(linkCode)
    const res = await axios.get(
        inviteApiEndpoints.VERIFY_LINK_AND_GET_DATA,
        {
            params: {
                linkCode,
            },
        }
    );
    return res.data;
};

export interface DecryptedData {
    companyId: number;
}

export interface Company {
    profileImage: string;
    isVerified: any;
    contactPerson: string;
    description: string;
    catalogueUrl: string;
    location: string;
    yearsActive: string;
    industry: string;
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
}

export interface LinkDataResponse {
    status: number;
    message: string;
    data: {
        decryptedData: DecryptedData;
        company: Company;
    };
}

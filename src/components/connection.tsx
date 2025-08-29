import { useState, useEffect } from "react";
import { Typography, Button, Image, Spin, Tooltip } from "antd";
import { useParams } from "react-router-dom";
import BusinessIcon from "../assets/icons/Bussiness Type.svg";
import LocationIcon from "../assets/icons/Location.svg";
import IndustryIcon from "../assets/icons/Industries.svg";
import SinceIcon from "../assets/icons/Since.svg";
import VerifiedIcon from "../assets/icons/VerifiedIcon.svg";
import CheckIcon from "../assets/icons/check.svg";
import Vector from "../assets/icons/Vector.svg";
import ProfileForm from "./ProfileFormDrawer";
import { verifyLinkAndGetData } from "../api/inviteApi";

const { Text, Paragraph } = Typography;

interface InfoBlockProps {
    icon: string;
    label: string;
    value: string;
}

const InfoBlock = ({ icon, label, value }: InfoBlockProps) => (
    <div className="flex w-full sm:w-[calc(50%-0.5rem)] md:w-[200px] items-start gap-2">
        <img src={icon} alt={`${label} Icon`} className="w-8 sm:w-10 h-8 sm:h-10" />
        <div className="text-xs sm:text-sm leading-tight w-full">
            <p>{label}</p>
            <Tooltip title={value} placement="topLeft">
                <p className="text-[#1B1D27] font-medium line-clamp-2 break-words">
                    {value || "N/A"}
                </p>
            </Tooltip>
        </div>
    </div>
);

interface BenefitProps {
    text: string;
    desc: string;
}

const Benefit = ({ text, desc }: BenefitProps) => (
    <div className="flex items-start gap-2 sm:gap-3">
        <img src={CheckIcon} alt="Check" className="w-4 sm:w-5 h-4 sm:h-5 mt-1" />
        <div className="space-y-1">
            <p className="text-[#1B1D27] font-medium text-sm">{text}</p>
            <p className="text-[#717680] text-xs">{desc}</p>
        </div>
    </div>
);

interface CompanyData {
    companyId: string;
    profileImg: string;
    firstName: string;
    lastName: string;
    companyName: string;
    aboutCompany: string;
    productCount: number;
    connectionCount: number;
    isVerified: boolean;
    businessType: string[];
    industryTypes: string[];
    city: string;
    state: string;
    catalogLink: string;
}

const ConnectionRequest = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [companyData, setCompanyData] = useState<CompanyData | null>(null);
    const [loading, setLoading] = useState(true);

    const params = useParams<{ linkCode?: string }>();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (!params.linkCode) {
                    throw new Error("Link code is missing");
                }

                const verifyRes = await verifyLinkAndGetData(params.linkCode);
                if (verifyRes.status !== 200)
                    throw new Error("Failed to fetch company data");

                setCompanyData(verifyRes.data);
            } catch (err) {
                console.error("Error fetching connection request data:", err);
                setCompanyData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params.linkCode]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spin size="small" />
            </div>
        );
    }

    const safeData: CompanyData = companyData || {
        companyId: "",
        profileImg: "",
        firstName: "",
        lastName: "",
        companyName: "",
        aboutCompany: "",
        productCount: 0,
        connectionCount: 0,
        isVerified: false,
        businessType: [],
        industryTypes: [],
        city: "",
        state: "",
        catalogLink: ""
    };

    const joinOrNA = (value: string[]) => (value.length ? value.join(", ") : "N/A");

    return (
        <div className="w-full max-w-[1440px] min-h-screen mx-auto bg-white px-3 sm:px-6 md:px-8">
            {/*====== Header ======*/}
            <div className="relative w-full bg-[url('/src/img/Header-Back.png')] bg-cover bg-center px-3 sm:px-6 md:px-[112px] py-8 md:py-16">
                <h2 className="text-right font-inter-tight text-xl sm:text-2xl md:text-3xl font-bold text-[#172554] tracking-tight max-w-full md:max-w-[710px] ml-auto">
                    New Connection Request
                    <span className="block md:inline">
                        {" "}— From {safeData.firstName} {safeData.lastName}
                    </span>
                </h2>
            </div>

            {/*====== Main Content ======*/}
            <div className="relative w-full max-w-[1096px] mx-auto -mt-16 md:-mt-[120px] flex flex-col items-start px-2 sm:px-0">
                {/* Profile Image */}
                <div className="w-24 h-24 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full border-3 border-white overflow-hidden">
                    <Image
                        src={safeData.profileImg}
                        alt="Profile"
                        preview={false}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Company Info */}
                <div className="mt-4 w-full">
                    <div className="flex flex-col">
                        <div>
                            <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="text-[#1B1D27] text-lg sm:text-xl md:text-2xl font-bold leading-tight tracking-tight">
                                    {safeData.companyName}
                                </h4>

                                {safeData.isVerified && (
                                    <Image
                                        src={VerifiedIcon}
                                        alt="Verified"
                                        preview={false}
                                        className="w-4 h-4 sm:w-5 sm:h-5"
                                    />
                                )}
                            </div>

                            <Text className="!text-[#414651] font-medium block text-sm sm:text-base">
                                {safeData.firstName} {safeData.lastName}
                            </Text>
                            <Paragraph className="mt-2 text-xs sm:text-sm md:text-base !text-[#414651]">
                                {safeData.aboutCompany}
                            </Paragraph>
                            <Text className="text-xs sm:text-sm !text-[#414651] font-medium block">
                                {safeData.productCount} Products | {safeData.connectionCount} Connections
                            </Text>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-4 mt-4">
                            <Button
                                type="primary"
                                className="w-full sm:w-[176.5px] px-6 py-2 h-9 !text-xs !sm:text-sm !font-semibold !rounded-md flex justify-center items-center gap-1"
                                onClick={() => setOpenDrawer(true)}
                            >
                                Accept
                            </Button>
                            <Button
                                onClick={() => {
                                    if (safeData.catalogLink) {
                                        const decodedUrl = decodeURIComponent(safeData.catalogLink);
                                        const finalUrl = decodedUrl.startsWith("http")
                                            ? decodedUrl
                                            : `https://app.biizline.com/${decodedUrl}`;
                                        window.open(finalUrl);
                                    } else {
                                        window.open("https://app.biizline.com/");
                                    }
                                }}
                                className="w-full sm:w-[176.5px] px-6 py-2 h-9 !bg-[#E9EAEB] !text-[#414651] !text-xs sm:text-sm !font-semibold rounded-md flex justify-center items-center gap-1"
                            >
                                Product Catalogue
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-start gap-4 mt-6 text-[#717680]">
                        <InfoBlock
                            icon={BusinessIcon}
                            label="Business Type"
                            value={joinOrNA(safeData.businessType)}
                        />
                        <InfoBlock
                            icon={IndustryIcon}
                            label="Industry Type"
                            value={joinOrNA(safeData.industryTypes)}
                        />
                        <InfoBlock icon={SinceIcon} label="Since" value="N/A" />
                        <InfoBlock
                            icon={LocationIcon}
                            label="Location"
                            value={`${safeData.city}, ${safeData.state}`}
                        />
                    </div>
                </div>

                {/* Bizline Benefits */}
                <div className="flex flex-col items-start gap-5 w-full p-4 sm:p-5 bg-green-50 border border-green-300 rounded-xl mt-10">
                    <div className="flex flex-wrap items-center gap-1">
                        <p className="font-medium text-gray-700 text-sm md:text-base mb-0">Ordering from</p>
                        <img src={Vector} className="w-16 sm:w-[69px] h-auto" alt="Biizline" />
                        <p className="font-medium text-gray-700 text-sm md:text-base mb-0">means</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs sm:text-sm text-gray-500 w-full">
                        <Benefit text="Full Product Catalog" desc="Explore the vendor's range at your fingertips." />
                        <Benefit text="Exclusive Business Pricing" desc="Get special rates for your business." />
                        <Benefit text="Instant Vendor Chat" desc="Communicate directly with the vendor." />
                        <Benefit text="Seamless Direct Ordering" desc="Place orders instantly, right from the platform." />
                        <Benefit text="Real-Time Order Tracking" desc="Track your order and get delivery updates." />
                    </div>
                </div>

                {/* Footer */}
                <div className="text-left mt-10 w-full">
                    <h3 className="text-2xl md:text-[42px] leading-snug text-[#A4A7AE] font-extrabold">
                        Connect. Collaborate. Grow!
                    </h3>
                    <p className="text-base md:text-lg mt-1 text-[#A4A7AE] font-medium font-inter-tight mb-10">
                        — With Biizline
                    </p>
                </div>

                <ProfileForm open={openDrawer} onClose={() => setOpenDrawer(false)} />
            </div>
        </div>
    );
};

export default ConnectionRequest;

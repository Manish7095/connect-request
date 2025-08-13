import { useState, useEffect } from "react";
import { Typography, Button, Image, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import BusinessIcon from "../assets/icons/Bussiness Type.svg";
import LocationIcon from "../assets/icons/Location.svg";
import IndustryIcon from "../assets/icons/Industries.svg";
import SinceIcon from "../assets/icons/Since.svg";
import VerifiedIcon from "../assets/icons/VerifiedIcon.svg";
import CheckIcon from "../assets/icons/check.svg";
import Vector from "../assets/icons/Vector.svg";
import ProfileForm from "./ProfileFormDrawer";
import { generateLinkByCompanyId, verifyLinkAndGetData } from "../api/inviteApi";

const { Text, Paragraph } = Typography;

interface ConnectionRequestProps {
    companyId?: number;
}

const ConnectionRequest = ({ companyId: propCompanyId }: ConnectionRequestProps) => {
    const DEFAULT_COMPANY_ID = 40;

    const [companyId /*, setCompanyId*/] = useState<number>(propCompanyId ?? DEFAULT_COMPANY_ID);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [companyData, setCompanyData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const params = useParams<{ linkCode?: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                let linkCode = params.linkCode;

                if (!linkCode) {
                    const generateRes = await generateLinkByCompanyId(companyId);
                    if (generateRes.status !== 200) throw new Error("Failed to generate invite link");

                    linkCode = generateRes.data.linkCode;
                    navigate(`/${linkCode}`, { replace: true });
                    return;
                }

                const verifyRes = await verifyLinkAndGetData(linkCode);
                if (verifyRes.status !== 200) throw new Error("Failed to fetch company data");

                if (verifyRes.data.companyId !== companyId) {
                    const generateRes = await generateLinkByCompanyId(companyId);
                    if (generateRes.status !== 200) throw new Error("Failed to generate invite link");

                    const newLinkCode = generateRes.data.linkCode;
                    if (newLinkCode !== linkCode) {
                        navigate(`/${newLinkCode}`, { replace: true });
                        return;
                    }
                } else {
                    setCompanyData(verifyRes.data);
                }
            } catch {
                setCompanyData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [companyId, params.linkCode, navigate]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spin size="small" />
            </div>
        );
    }

    const safeData = companyData || {
        firstName: "",
        lastName: "",
        companyName: "",
        aboutCompany: "",
        productCount: "",
        connectionCount: "",
        businessType: [],
        industryTypes: [],
        city: "",
        state: ""
    };

    const joinOrNA = (arr: string[]) => (arr.length ? arr.join(", ") : "N/A");

    return (
        <div className="w-full max-w-[1440px] h-auto min-h-screen mx-auto bg-white px-4 md:px-8">
            {/*====== Header ======*/}
            <div className="relative w-full bg-[url('/src/img/Header-Back.png')] bg-cover bg-center px-4 sm:px-10 md:px-[112px] py-10 md:py-20">
                <h2 className="text-right font-inter-tight text-2xl font-bold text-[#172554] tracking-tight max-w-[710px] ml-auto">
                    New Connection Request
                    <span className="block md:inline">
                        {" "}
                        — From {safeData.firstName} {safeData.lastName}
                    </span>
                </h2>
            </div>

            {/*====== Main Content ======*/}
            <div className="relative w-full max-w-[1096px] mx-auto !-mt-[80px] md:-mt-[120px] flex flex-col items-start">
                {/*====== Profile Image ======*/}
                <div className="w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] rounded-full border-3 border-white overflow-hidden">
                    <Image
                        src="/src/img/Profile.png"
                        alt="Profile"
                        preview={false}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/*====== Company Info ======*/}
                <div className="mt-4 w-full">
                    <div className="flex flex-col">
                        <div>
                            <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="text-[#1B1D27] text-xl font-bold leading-tight tracking-tight">
                                    {safeData.companyName}
                                </h4>
                                <Image src={VerifiedIcon} alt="Verified" preview={false} className="w-5 h-5" />
                            </div>
                            <Text className="!text-[#414651] font-medium block">
                                {safeData.firstName} {safeData.lastName}
                            </Text>
                            <Paragraph className="mt-2 text-sm md:text-base !text-[#414651]">
                                {safeData.aboutCompany}
                            </Paragraph>
                            <Text className="text-sm !text-[#414651] font-medium block">
                                {safeData.productCount} Products | {safeData.connectionCount} Connections
                            </Text>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-4 mt-4 w-full">
                            <Button
                                type="primary"
                                className="w-full sm:w-[176.5px] px-6 py-2 h-9 font-medium rounded-md flex justify-center items-center !text-xs !font-semibold !leading-tight gap-4"
                                onClick={() => setOpenDrawer(true)}
                            >
                                Accept
                            </Button>
                            <Button
                                onClick={() => window.open("https://biizline.com/", "_blank")}
                                className="w-full sm:w-[176.5px] px-6 py-2 h-9 !bg-[#E9EAEB] !text-[#414651] !font-semibold rounded-md flex justify-center items-center gap-4 leading-tight"
                            >
                                Product Catalogue
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-start gap-4 mt-6 text-[#717680]">
                        <InfoBlock icon={BusinessIcon} label="Business Type" value={joinOrNA(safeData.businessType)} />
                        <InfoBlock icon={IndustryIcon} label="Industry" value={joinOrNA(safeData.industryTypes)} />
                        <InfoBlock icon={SinceIcon} label="Since" value="16+ Years" />
                        <InfoBlock icon={LocationIcon} label="Location" value={`${safeData.city}, ${safeData.state}`} />
                    </div>
                </div>

                {/*====== Bizline Benefits ======*/}
                <div className="flex flex-col items-start gap-5 w-full p-5 bg-green-50 border border-green-300 rounded-xl mt-10">
                    <div className="flex items-center gap-1 mb-0">
                        <p className="font-medium text-gray-700 text-sm md:text-base mb-0">Ordering from</p>
                        <img src={Vector} className="w-[69px] h-[16px]" alt="Biizline" />
                        <p className="font-medium text-gray-700 text-sm md:text-base mb-0">means</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 text-xs text-gray-500">
                        <Benefit text="Full Product Catalog" desc="Explore the vendor's range at your fingertips." />
                        <Benefit text="Exclusive Business Pricing" desc="Get special rates for your business." />
                        <Benefit text="Instant Vendor Chat" desc="Communicate directly with the vendor." />
                        <Benefit text="Seamless Direct Ordering" desc="Place orders instantly, right from the platform." />
                        <Benefit text="Seamless Direct Ordering" desc="Place orders instantly, right from the platform." />
                        <Benefit text="Seamless Direct Ordering" desc="Place orders instantly, right from the platform." />
                    </div>
                </div>

                {/* ======= Footer ====== */}
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

const InfoBlock = ({
    icon,
    label,
    value,
}: {
    icon: string;
    label: string;
    value: string;
}) => (
    <div className="flex w-full sm:w-[200px] items-start gap-2">
        <img src={icon} alt={`${label} Icon`} className="w-10 h-10" />
        <div className="text-sm leading-tight">
            <p>{label}</p>
            <p className="text-[#1B1D27] font-medium">{value}</p>
        </div>
    </div>
);

const Benefit = ({ text, desc }: { text: string; desc: string }) => (
    <div className="flex items-start gap-3">
        <img src={CheckIcon} alt="Check" className="w-5 h-5 mt-1" />
        <div className="space-y-1">
            <p className="text-[#1B1D27] font-medium">{text}</p>
            <p className="text-[#717680] text-xs">{desc}</p>
        </div>
    </div>
);

export default ConnectionRequest;

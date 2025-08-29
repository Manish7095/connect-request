import { useState, useEffect } from "react";
import { Modal, Form, Input, Row, Col, Select, Button } from "antd";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { profileFormSchema } from "../Schema/profileFormSchema";
import WhatsAppIcon from "../assets/icons/whatsapp.svg";
import VerifyOtpModal from "./VerifyOtpModal";
import SuccessModal from "./SuccessModal";
import { getStates, getCities, type State, type City } from "../api/locationApi";
import { getOTP } from "../api/OTPApi";
import type { ConnectionData } from "../api/connectionApi";

const { Option } = Select;

export type ProfileFormData = {
    whatsappNumber: string;
    firstName: string;
    lastName: string;
    companyName: string;
    state: string;
    city: string;
};


interface ProfilePopupFormProps {
    open: boolean;
    onClose: () => void;
}

const ProfilePopupForm = ({ open, onClose }: ProfilePopupFormProps) => {
    const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [formData, setFormData] = useState<ConnectionData | undefined>(undefined);


    const [isFormVisible, setIsFormVisible] = useState(open);

    const [stateList, setStateList] = useState<State[]>([]);
    const [cityList, setCityList] = useState<City[]>([]);

    useEffect(() => {
        setIsFormVisible(open);
    }, [open]);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileFormSchema),
    });

    useEffect(() => {
        const fetchStates = async () => {
            try {
                const data = await getStates();
                setStateList(data);
            } catch (err) {
                console.error("Error fetching states:", err);
            }
        };
        fetchStates();
    }, []);

    const onSubmit: SubmitHandler<ProfileFormData> = async (data) => {
        try {
            const result = await getOTP({ phoneNo: data?.whatsappNumber });
            console.log("✅ OTP API Success:", result);

            setPhoneNumber(data.whatsappNumber);

            setFormData({
                companyName: data.companyName,
                firstName: data.firstName,
                lastName: data.lastName,
                phoneNo: data.whatsappNumber,
                state: data.state,
                city: data.city,
            });
            setIsFormVisible(false);
            setTimeout(() => setIsOtpModalVisible(true), 300);
        } catch (error) {
            alert("Failed to submit profile details. Please try again.");
        }
    };

    return (
        <>
            <Modal
                open={isFormVisible}
                onCancel={() => {
                    setIsFormVisible(false);
                    onClose();
                }}
                footer={null}
                centered
                className="!w-[914px] flex p-40 !flex-col !items-start gap-20"
                title={
                    <div className="text-left font-semibold text-lg mt-4">
                        Complete Your Profile to Get Started
                        <div className="text-sm text-gray-500">
                            We need a few details to set up your Business Profile and connect you with vendors.
                        </div>
                    </div>
                }
            >
                <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                    <Row gutter={16} className="mt-4">
                        <Col xs={24} md={12}>
                            <Form.Item
                                label={
                                    <>
                                        WhatsApp Number <span className="text-red-500">*</span>
                                    </>
                                }
                                validateStatus={errors.whatsappNumber ? "error" : ""}
                                help={errors.whatsappNumber?.message}
                            >
                                <Controller
                                    name="whatsappNumber"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            placeholder="Enter WhatsApp number"
                                            maxLength={10}
                                            inputMode="numeric"
                                            pattern="[6-9]{1}[0-9]{9}"
                                            prefix={
                                                <img
                                                    src={WhatsAppIcon}
                                                    alt="whatsapp"
                                                    className="w-4 h-4"
                                                />
                                            }
                                            className="w-[407px] h-[48px] rounded-[16px]"
                                            onChange={(e) => {
                                                let value = e.target.value.replace(/\D/g, "");
                                                if (value === "") {
                                                    field.onChange("");
                                                    return;
                                                }
                                                if (value.length === 1 && !/^[6-9]$/.test(value)) {
                                                    return;
                                                }
                                                if (value.length <= 10) {
                                                    field.onChange(value);
                                                }
                                            }}
                                            value={field.value || ""}
                                        />
                                    )}
                                />
                            </Form.Item>
                        </Col>

                        {/* First Name */}
                        <Col xs={24} md={12}>
                            <Form.Item
                                label={
                                    <>
                                        First Name <span className="text-red-500">*</span>
                                    </>
                                }
                                validateStatus={errors.firstName ? "error" : ""}
                                help={errors.firstName?.message}
                            >
                                <Controller
                                    name="firstName"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            placeholder="Enter first name"
                                            className="w-[407px] h-[48px] rounded-[16px]"
                                        />
                                    )}
                                />
                            </Form.Item>
                        </Col>

                        {/* Last Name */}
                        <Col xs={24} md={12}>
                            <Form.Item
                                label={
                                    <>
                                        Last Name <span className="text-red-500">*</span>
                                    </>
                                }
                                validateStatus={errors.lastName ? "error" : ""}
                                help={errors.lastName?.message}
                            >
                                <Controller
                                    name="lastName"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            placeholder="Enter last name"
                                            className="w-[407px] h-[48px] rounded-[16px]"
                                        />
                                    )}
                                />
                            </Form.Item>
                        </Col>

                        {/* Company Name */}
                        <Col xs={24} md={12}>
                            <Form.Item
                                label={
                                    <>
                                        Company Name <span className="text-red-500">*</span>
                                    </>
                                }
                                validateStatus={errors.companyName ? "error" : ""}
                                help={errors.companyName?.message}
                            >
                                <Controller
                                    name="companyName"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            placeholder="Enter company name"
                                            className="w-[407px] h-[48px] rounded-[16px]"
                                        />
                                    )}
                                />
                            </Form.Item>
                        </Col>

                        {/* State */}
                        <Col xs={24} md={12}>
                            <Form.Item
                                label={
                                    <>
                                        State <span className="text-red-500">*</span>
                                    </>
                                }
                                validateStatus={errors.state ? "error" : ""}
                                help={errors.state?.message}
                            >
                                <Controller
                                    name="state"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            placeholder="Select state"
                                            showSearch
                                            optionFilterProp="children"
                                            className="w-[407px] rounded-[16px]"
                                            style={{ height: 48 }}
                                            onChange={(stateName) => {
                                                field.onChange(stateName);
                                                getCities(stateName).then((data) => setCityList(data));
                                            }}
                                            filterOption={(input, option) =>
                                                (option?.children as unknown as string)?.toLowerCase().includes(input.toLowerCase())
                                            }
                                        >
                                            {stateList.map((state) => (
                                                <Option key={state.stateCode} value={state.state}>
                                                    {state.state}
                                                </Option>
                                            ))}
                                        </Select>
                                    )}
                                />

                            </Form.Item>
                        </Col>

                        {/* City */}
                        <Col xs={24} md={12}>
                            <Form.Item
                                label={
                                    <>
                                        City <span className="text-red-500">*</span>
                                    </>
                                }
                                validateStatus={errors.city ? "error" : ""}
                                help={errors.city?.message}
                            >
                                <Controller
                                    name="city"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            placeholder="Select city"
                                            disabled={cityList.length === 0}
                                            showSearch
                                            optionFilterProp="children"
                                            className="w-[407px] rounded-[16px]"
                                            style={{ height: 48 }}
                                            filterOption={(input, option) =>
                                                (option?.children as string)
                                                    ?.toLowerCase()
                                                    .includes(input.toLowerCase())
                                            }
                                        >
                                            {Array.isArray(cityList) &&
                                                cityList.map((city) => (
                                                    <Option key={city.id} value={city}>
                                                        {city.name}
                                                    </Option>
                                                ))}
                                        </Select>
                                    )}
                                />

                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Submit Button */}
                    <Form.Item className="text-center mt-5">
                        <Button
                            htmlType="submit"
                            className=" items-center justify-center w-full bg-black text-white font-semibold rounded-[16px] !text-sm !leading-tight !bg-black !text-white !h-[48px]"
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            {/* OTP Modal */}
            <VerifyOtpModal
                open={isOtpModalVisible}
                onClose={() => setIsOtpModalVisible(false)}
                phoneNumber={phoneNumber}
                onBack={() => {
                    setIsOtpModalVisible(false);
                    setTimeout(() => setIsFormVisible(true), 200);
                }}
                formData={{
                    companyName: formData?.companyName || "",
                    firstName: formData?.firstName || "",
                    lastName: formData?.lastName || "",
                    phoneNo: formData?.phoneNo || "",
                    state: formData?.state || "",
                    city: formData?.city || "",
                }}
            />


            <SuccessModal
                open={isSuccessModalVisible}
                onClose={() => setIsSuccessModalVisible(false)}
            />
        </>
    );
};

export default ProfilePopupForm;
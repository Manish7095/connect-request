import { useState, useEffect } from "react";
import { Modal, Form, Input, Row, Col, Select, Button } from "antd";
import { Controller, useForm } from "react-hook-form";
import { profileFormSchema } from "../Schema/profileFormSchema";
import WhatsAppIcon from "../assets/icons/whatsapp.svg";
import VerifyOtpModal from "./VerifyOtpModal";
import SuccessModal from "./SuccessModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { cities } from "../constants/ProfileForm-constant";

const { Option } = Select;

const states = ["Gujarat", "Maharashtra", "Rajasthan", "Delhi"];


const ProfilePopupForm = ({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) => {
    const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(open);

    useEffect(() => {
        setIsFormVisible(open);
    }, [open]);
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(profileFormSchema),
    });



    const selectedState = watch("state");

    const onSubmit = (data: any) => {
        console.log("Form Data:", data);
        setPhoneNumber(data.whatsappNumber);
        setIsFormVisible(false);
        setTimeout(() => {
            setIsOtpModalVisible(true);
        }, 300);
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
                            We need a few details to set up your Business Profile and connect
                            you with vendors.
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

                                                // If input is empty, allow
                                                if (value === "") {
                                                    field.onChange("");
                                                    return;
                                                }

                                                if (value.length === 1 && !/^[6-9]$/.test(value)) {
                                                    return;
                                                }

                                                // Allow only max 10 digits
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
                                            className="w-[407px] rounded-[16px]"
                                            style={{ height: 48 }}
                                        >
                                            {states.map((state) => (
                                                <Option key={state} value={state}>
                                                    {state}
                                                </Option>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </Form.Item>
                        </Col>

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
                                            disabled={!selectedState}
                                            className="w-[407px] rounded-[16px]"
                                            style={{ height: 48 }}
                                        >
                                            {(cities[selectedState] || []).map((city, index) => (
                                                <Option key={index} value={city}>
                                                    {city}
                                                </Option>
                                            ))}

                                        </Select>
                                    )}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

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
                onSubmitOtp={(otp) => {
                    console.log("Submitted OTP:", otp);
                    setIsOtpModalVisible(false);
                    setTimeout(() => {
                        setIsSuccessModalVisible(true);
                    }, 300);
                    return true;
                }}
                onBack={() => {
                    setIsOtpModalVisible(false);
                    setTimeout(() => {
                        setIsFormVisible(true);
                    }, 200);
                }}
            />

            {/* Success Modal */}
            <SuccessModal
                open={isSuccessModalVisible}
                onClose={() => setIsSuccessModalVisible(false)}
            />
        </>
    );
};

export default ProfilePopupForm;


export interface Library {
    id: number;
    name: string;
    description: string;
    userId: string;
    createDate: Date;
    updateDate: Date;
    contents: Content[];
    isOwner: boolean;
    permissionType: string;
}

export interface Content {
    id: number;
    title: string;
    link: string;
    tags: string[] | null;
    userId: string;
    text: string;
    description: string;
    fileData: string;
    contentType: string | null;
    libraryId: number;
}

export interface LibraryListServerResponse {
    content: Library[];
    last: boolean;
    totalElements: number;
    size: number;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

export interface verifyOtpResponse {
    message: string;
    code: string;
}


export interface UserModelResponse {
    username: string;
    email: string;
    password: string;
    role: string;
    gender: string;
    dob: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

export interface PhoneModelResponse {
    dob: string;
    email: string;
    firstName: string;
    gender: string;
    lastName: string;
    password: string;
    phoneNumber: string;
    role: string;
    username: string;
}

export interface VerifyOtpRequestEmail {
    receiverEmail: string;
    enteredOTP: string;
}

export interface VerifyOtpRequestPhone {
    phoneNumber: string;
    otp: string;
}

export interface VerifyOtpRequestPhoneLogin {
    phoneNumber: string;
    otp: string
}

export interface PhoneLoginTokenResponse {
    accessToken: string;
}

export interface TokenRequestBody {
    client_id: string;
    client_secret: string;
    grant_type: string;
    redirect_uri: string;
    code: string;
    code_verifier: string;
}

export interface resetPasswordRequest {
    password: string;
    confirmPassword: string;
    email: string;
    secretKey: string;
}
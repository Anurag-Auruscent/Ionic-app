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


export interface UserModelResponse {
    username: string;
    email: string;
    password: string;
    role: string;
    gender: string;
    dob: string;
    firstName: string;
    lastName: string;
}

export interface VerifyOtpRequest {
    receiverEmail: string;
    enteredOTP: string;
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
}
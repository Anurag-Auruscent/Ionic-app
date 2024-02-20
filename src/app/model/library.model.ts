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

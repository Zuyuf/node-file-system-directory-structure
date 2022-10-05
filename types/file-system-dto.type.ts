export type IFileSystemDto = {
    id: number;
    parent_id: number | null;
    element_name: string;
    element_type: string;
    content: string;
    created_at: number;
    updated_at: number;
}


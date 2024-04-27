import { create } from 'zustand';

interface AppState {
    isDeleteModalOpen: boolean;
    setIsDeleteModalOpen: (open: boolean) => void;

    isRenameModalOpen: boolean;
    setIsRenameModalOpen: (open: boolean) => void;

    fileId: string | null;
    setFileId: (id: string) => void;

    filename: string;
    setFilename: (name: string) => void;

}

export const useAppStore = create<AppState>()((set) => ({
    fileId: null,
    setFileId: (fileId: string) => set((state) => ({ fileId })),

    filename: '',
    setFilename: (filename: string) => set((state) => ({ filename })),

    isDeleteModalOpen: false,
    setIsDeleteModalOpen: (open: boolean) => set((state) => ({ isDeleteModalOpen: open })),

    isRenameModalOpen: false,
    setIsRenameModalOpen: (open: boolean) => set((state) => ({ isRenameModalOpen: open })),
}));
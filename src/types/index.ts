import { Dispatch, SetStateAction } from 'react';

export type PhotoNames = Array<string>
//export type SetStatePhoto = Dispatch<SetStateAction<PhotoNames>>
export type PhotoFileInfo = {
    fileName: string,
    diary:{
        title: string,
        content: string
    },
};
export type PhotoFileInfos = PhotoFileInfo[]
export type SetStatePhoto = Dispatch<SetStateAction<PhotoFileInfos>>
export type SetStateCardTitle = Dispatch<SetStateAction<string>>
export type SetStateCardContent = Dispatch<SetStateAction<string>>
import { useState, ReactElement } from 'react';
import { Stack } from '@mui/material';

import { TakePhotoButton, UpdatePhotoButton } from '../ui_parts/Buttons';
import { PhotoCards } from '../ui_parts/PhotoCards';
import { getPhotoAndDiary, takePhoto, } from '../../models/apiFunctions';
import { PhotoFileInfos, SetStatePhoto } from '../../types';
import "../../scss/Contents.scss";

const onUpdatePhotoButtonClicked = async (setPhotoFiles: SetStatePhoto): Promise<void> => {
  const photoNames: PhotoFileInfos = await getPhotoAndDiary();
  setPhotoFiles(photoNames);
}


export const Contents = (): ReactElement => {
  const [photoFiles, setPhotoFiles] = useState<PhotoFileInfos>([]);
  
  return (
    <div className='loadButtons'>
      <Stack direction='row' spacing={1}>
        <TakePhotoButton onClickedEvent={takePhoto}></TakePhotoButton>
        <UpdatePhotoButton onClickedEvent={() => onUpdatePhotoButtonClicked(setPhotoFiles)}></UpdatePhotoButton>
      </Stack>
      <PhotoCards {...{photoFiles, setPhotoFiles}}  />
      <br/>
    </div>
  );
}

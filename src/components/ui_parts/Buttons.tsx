import { ReactElement } from 'react';
import { Button } from '@mui/material';
import { AddAPhoto, Autorenew, Delete, Edit } from '@mui/icons-material';

type TakePhotoButtonProps = {
  onClickedEvent: () => void
}

export const TakePhotoButton = ({onClickedEvent}: TakePhotoButtonProps): ReactElement => {
  return (
    <div>
      <Button
        variant='contained'
        onClick={onClickedEvent}
        startIcon={<AddAPhoto />}
        sx={{
          backgroundColor: '#3C98F8',
          color: 'white', 
          '&:hover': {
            backgroundColor: '#A2AFB3'
          }
        }}
      >
        写真を撮影
      </Button>
    </div>
  );
}

type UpdatePhotoButtonProps = {
  onClickedEvent: () => void
}

export const UpdatePhotoButton = ({onClickedEvent}: UpdatePhotoButtonProps): ReactElement => {
  return (
    <div>
      <Button
        variant='contained'
        onClick={onClickedEvent}
        startIcon={<Autorenew/>}
        sx={{
          backgroundColor: '#3C98F8',
          color: 'white', 
          '&:hover': {
            backgroundColor: '#A2AFB3'
          }
        }}
        >
        日記一覧を更新
      </Button>
    </div>
  );
}

type DeletePhotoButtonProps = {
  onClickedEvent: () => void
}

export const DeletePhotoButton = ({onClickedEvent}: DeletePhotoButtonProps): ReactElement => {
  return (
    <div>
      <Button
        variant='contained'
        onClick={onClickedEvent} 
        startIcon={<Delete/>}
        sx={{
          backgroundColor: '#F8423C',
          color: 'white', 
          '&:hover': {
            backgroundColor: '#A2AFB3'
          }
        }}>
        削除
      </Button>
    </div>
  );
}

type EditDiaryButtonProps = {
  onClickedEvent: () => void
}

export const EditDiaryButton = ({onClickedEvent}: EditDiaryButtonProps): ReactElement => {
  return (
    <div>
      <Button
        variant='contained'
        onClick={onClickedEvent}
        startIcon={<Edit/>}
        sx={{
          backgroundColor: '#3C98F8',
          color: 'white', 
          '&:hover': {
            backgroundColor: '#A2AFB3'
          }
        }}
      >
        編集
      </Button>
    </div>
  );
}


export type OnClickEvent = React.MouseEvent<HTMLButtonElement | MouseEvent>;

type DecideButtonProps = {
  onClickedEvent: (e: OnClickEvent) => void
}
export const DecideButton = ({onClickedEvent}: DecideButtonProps): ReactElement => {
  return (
    <div>
      <Button variant='contained' onClick={onClickedEvent}>
        確定
      </Button>
    </div>
  );
};


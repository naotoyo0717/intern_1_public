import { ReactElement, useState } from 'react';
import { isUndefined,} from 'lodash';
import { Card, CardContent, CardMedia, Dialog, DialogContent, Grid, TextField } from '@mui/material';

import { DeletePhotoButton, DecideButton, EditDiaryButton } from './Buttons';
import { deletePhotoAndDiary, saveDiary, } from '../../models/apiFunctions';
import { PhotoFileInfo, PhotoFileInfos, SetStatePhoto } from '../../types';
import { serverPath } from '../../config/serverPath';
import "../../scss/form.scss";
import "../../scss/Card.scss";
import OutputTime from '../OutputTime';

type PhotoCardProps = {
  photoInfo: PhotoFileInfo,
  setPhotoFiles: SetStatePhoto
}
type PhotoCardsProps = {
  photoFiles: PhotoFileInfos,
  setPhotoFiles: SetStatePhoto
}
const truncateText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

const deletePhotoFile = (fileInfo: PhotoFileInfo, setPhotoFiles: SetStatePhoto): void => {
  deletePhotoAndDiary(fileInfo);

  setPhotoFiles((curFiles) => {
    return curFiles.filter(photoFile => photoFile.fileName !== fileInfo.fileName);
  });
}

// 画像を載せるカード
const PhotoCard = ({photoInfo, setPhotoFiles}: PhotoCardProps): ReactElement | null => {
  const photoName = photoInfo.fileName
  const photoDiary = photoInfo.diary
  const [open, setOpen] = useState(false)
  const [diaryTitle, setDiaryTitle] = useState<string>("") //ダイアログで表示
  const [diaryContent, setDiaryContent] = useState<string>("") //ダイアログで表示
  
  const handleDiaryTitle = (e: { target: { name: string; value: string; }; }) => {
    const newValue = e.target.value
    setDiaryTitle(newValue);
  }

  const handleDiaryContent = (e: {target: { name: string; value: string; }; }) => {
    const newValue = e.target.value
    setDiaryContent(newValue);
  }

  const saveCardContent = () => {
    const saveInfo = {fileName: photoName, diary: {title: diaryTitle, content: diaryContent}}
    saveDiary(saveInfo)
  }

  if (isUndefined(photoName)) {
    return null;
  }

  const handleOpen = () => {
    setOpen(true);
    setDiaryTitle(photoDiary.title)
    setDiaryContent(photoDiary.content)
  }
  const handleClose = () => {
    setOpen(false);
  }

  
//ダイアログ
  return (
    <div>
      <br></br>
      <br></br>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <br></br>
        <DialogContent>
          <div className='contentForm'>
          <img src={`${serverPath}/getphotos/${photoName}`} style={{height: 300, width: 'auto',}}/>
          <br></br>
          <br></br>
          <br></br>
          <TextField
            sx = {{width: '30rem'}}
            name="titleName"
            label="タイトル"
            value={diaryTitle}
            onChange={handleDiaryTitle}
            placeholder='タイトルを入力してください'
          />
          <TextField
            sx = {{width: '30rem', margin: 3}}        
            name="contentName"
            multiline
            label="内容"
            value={diaryContent}
            onChange={handleDiaryContent}
            placeholder='内容を入力してください'
            inputProps={{ maxLength: 50 }}
          />
          <DecideButton
            onClickedEvent={saveCardContent}/>
          </div>
          </DialogContent>
      </Dialog>

      <div className='cardConteiner'>
        <Card sx={{maxWidth: 300, height: '30rem'}}>
          <CardMedia component='img' sx={{width: "300", height: "auto"}} image={`${serverPath}/getphotos/${photoName}`} />
          <CardContent>
            <div className='PhotoTime'>
              <OutputTime name={photoName}/>
            </div>
              <h3>{isUndefined(photoInfo.diary.title) ? '\n' : photoInfo.diary.title } </h3>
              <div className='PhotoCardContent'>
              <p>{isUndefined(photoInfo.diary.content) ? '\n' : truncateText(photoInfo.diary.content, 60)}</p>
            </div>
          </CardContent>
          <div className='Buttons'>
            <div className='deleteButton'><DeletePhotoButton onClickedEvent={() =>  deletePhotoFile(photoInfo, setPhotoFiles,)}/></div>
            <div className='editButton'><EditDiaryButton onClickedEvent={handleOpen} /></div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// 画像カードを表示する表
// export const PhotoCards = ({photoFiles, setPhotoFiles}: PhotoCardsProps): ReactElement => {
//   return (
//     <div className='CardCSonteiner'>
//       <Grid container spacing={2} rowSpacing={2} columnSpacing={2}>
//         {
//           photoFiles?.map((photoInfo, i) =>
//             <Grid item key={i}>
//               <PhotoCard {...{photoInfo, setPhotoFiles}} />
//             </Grid>
//           )
//         }
//       </Grid>
//     </div>
//   );
// }

export const PhotoCards = ({ photoFiles, setPhotoFiles }: PhotoCardsProps): ReactElement => {
  return (
    <div className='CardCSonteiner'>
      <Grid container spacing={2} rowSpacing={2} columnSpacing={2}>
        {
          photoFiles.slice().reverse().map((photoInfo, i) => (
            <Grid item key={i}>
              <PhotoCard {...{ photoInfo, setPhotoFiles }} />
            </Grid>
          ))
        }
      </Grid>
    </div>
  );
}
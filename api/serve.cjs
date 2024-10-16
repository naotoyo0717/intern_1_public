const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const lodash = require('lodash');
const { exec, execSync } = require('child_process');

const app = express();
const port = 8080;
const picturesDir = __dirname + '/../../Pictures/intern';

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// ~/Pictures/internフォルダの画像を静的に取得
app.use('/getphotos', express.static(picturesDir));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// 年月日時分秒の文字列を取得する関数
function getDateString() {
  const date = new Date();

  const year = date.getFullYear().toString();
  const month = ("00" + (date.getMonth() + 1)).slice(-2);
  const day = ("00" + date.getDate()).slice(-2);
  const hours = ("00" + date.getHours()).slice(-2);
  const minutes = ("00" + date.getMinutes()).slice(-2);
  const seconds = ("00" + date.getSeconds()).slice(-2);

  const dateString = year + month + day + hours + minutes + seconds;

  return dateString;
}

const takePhoto = (saveFileName, optionsStr) => {
  const dateString = getDateString();
  const defaultFileName = `picture_${dateString}.jpg`;
  const fileName = saveFileName === '' ? defaultFileName : saveFileName;
  exec(`fswebcam ${optionsStr} ${picturesDir}/${fileName}`);
};

app.post('/takephoto', (req, res) => {
  takePhoto('', '-r 1280x760');
  res.sendStatus(201);
});

app.delete('/deletephoto/*', (req, res) => {
  const fileName = req.path.replace('/deletephoto/', '');
  fs.unlinkSync(`${picturesDir}/${fileName}`);
  res.sendStatus(204);
});

// 複数ファイルの削除 チェックボックス等で削除対象を選択して実行
app.delete('/deletephotos', (req, res) => {
  const body = req.body; // body: object(key: 数字, value: ファイル名)
  const fileNames = Object.values(body);
  fileNames.forEach(fileName => fs.unlinkSync(`${picturesDir}/${fileName}`));
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// 画像名を取得する
app.get('/updatephoto', (req, res) => {
  const pictures = fs.readdirSync(picturesDir);
  res.json(pictures);
});

// 検索した画像のみ取得する (部分一致) パスパラメータ: 検索ワード
app.get('/getsearchedphotos/*', (req, res) => {
  const searchKey = req.path.replace('/getsearchedphotos/', '');
  const photoNames = fs.readdirSync(picturesDir);
  const searchedPhotoNames = photoNames.filter((photoName) => photoName.includes(searchKey));
  res.json(searchedPhotoNames);
});

const getCurMemos = () => {
  const isExistsMemoJson = fs.existsSync(memoJsonPath);
  const curMemos = isExistsMemoJson ? JSON.parse(fs.readFileSync(memoJsonPath)) : {};
  return curMemos;
};

const memoJsonPath = path.join(__dirname, 'memo.json'); // memo保存用jsonファイル
// メモ保存機能
app.post('/savememo', (req, res) => {
  const body = req.body;
  const photoFileName = body.fileName;
  const memo = body.memo;
  const addedMemo = {[photoFileName]: memo};

  const curMemos = getCurMemos();
  const newMemos = {...curMemos, ...addedMemo};
  const newMemosStr = JSON.stringify(newMemos, null, '  ');

  fs.writeFileSync(memoJsonPath, newMemosStr)
  res.sendStatus(201);
});

// 画像名、メモを取得する
app.get('/getphotoandmemos', (req, res) => {
  const photoFileNames = fs.readdirSync(picturesDir);
  const curMemos = getCurMemos();

  const photoFileInfos = photoFileNames.map((photoFileName) => {
    const memoKey = Object.keys(curMemos).find((key) => key === photoFileName);
    const memo = lodash.isUndefined(memoKey) ? '' : curMemos[memoKey];
    return {
      fileName: photoFileName,
      memo: memo,
    }
  });

  res.json(photoFileInfos);
});

// 画像とメモを削除
app.delete('/deletephotoandmemo/*', (req, res) => {
  const photoFileName = req.path.replace('/deletephotoandmemo/', '');
  fs.unlinkSync(`${picturesDir}/${photoFileName}`);

  const curMemos = getCurMemos();
  const {[photoFileName]: _, ...newMemos} = curMemos;
  fs.writeFileSync(memoJsonPath, JSON.stringify(newMemos, null, '  '));

  res.sendStatus(204);
});

const getCurDiary = () => {
  const isExistsDiaryJson = fs.existsSync(diaryJsonPath);
  const curDiary = isExistsDiaryJson ? JSON.parse(fs.readFileSync(diaryJsonPath)) : {};
  return curDiary;
};

const diaryJsonPath = path.join(__dirname, 'diary.json');
// 日記保存機能
app.post('/savediary', (req, res) => {
  const body = req.body;
  const photoFileName = body.fileName;
  const diary = body.diary;
  const addedDiary = {[photoFileName]: diary};
  
  const curDiary = getCurDiary();
  const newDIary = {...curDiary, ...addedDiary};
  const newDiaryStr = JSON.stringify(newDIary, null, '  ');
    
  fs.writeFileSync(diaryJsonPath, newDiaryStr);
  res.sendStatus(201);
});

// 画像名、日記を取得する
app.get('/getphotoanddiary', (req, res) => {
  const photoFileNames = fs.readdirSync(picturesDir);
  const curDiary = getCurDiary();

  const photoFileInfos = photoFileNames.map((photoFileName) => {
    const diaryKey = Object.keys(curDiary).find((key) => key === photoFileName);
    const diary = lodash.isUndefined(diaryKey) ? {} : curDiary[diaryKey];
    return {
      fileName: photoFileName,
      diary: diary
    };
  });

  res.json(photoFileInfos);
});

// 画像と日記を削除
app.delete('/deletephotoanddiary/*', (req, res) => {
  const photoFileName = req.path.replace('/deletephotoanddiary/', '');
  fs.unlinkSync(`${picturesDir}/${photoFileName}`);

  const curDiary = getCurDiary();
  const {[photoFileName]: _, ...newDiary} = curDiary;
  fs.writeFileSync(diaryJsonPath, JSON.stringify(newDiary, null, '  '));

  res.sendStatus(204);
});

// 画像のダウンロード
app.get('/downloadphoto/*', (req, res) => {
  const photoFileName = req.path.replace('/downloadphoto/', '');
  res.download(path.join(picturesDir, photoFileName), (err) => {
    if (!lodash.isUndefined(err)) {
      console.log({err}); // TODO 404 Not Found
    }
  });
});

// オプションを指定して撮影
app.post('/takephotowithoptions', (req, res) => {
  const body = req.body; // body: 保存ファイル名とfswebcamオプションのオブジェクト
  const saveFileName = body.saveFileName;
  const options = body.options;
  const optionsStr = options.join(' ')

  takePhoto(saveFileName, optionsStr);
  res.sendStatus(201);
});

// 画像ファイル情報(Exif情報)の取得
app.get('/getexifinfos', (req, res) => {
  const photoFileNames = fs.readdirSync(picturesDir);
  const photoFilePaths = photoFileNames.map(photoFileName => path.join(picturesDir, photoFileName));
  const exifInfosStr = execSync(`exiftool -j ${photoFilePaths.join(' ')}`).toString(); // 画像ファイルのメタ情報取得
  const exifInfos = JSON.parse(exifInfosStr);

  res.json(exifInfos)
});

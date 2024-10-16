import { PhotoFileInfo, PhotoNames } from '../types';
import { serverPath } from '../config/serverPath';

export function takePhoto(): void {
  fetch(`${serverPath}/takephoto`, {
    method: 'POST',
  }).then(res => {
      console.log({res});
  });
}

export function deletePhoto(fileName: string): void {
  fetch(`${serverPath}/deletephoto/${fileName}`, {
    method: 'DELETE',
  }).then(res => {
    console.log({res});
  });
}

export const deletePhotos = async (fileNames: string[]): Promise<void> => {
  const response = await fetch(`${serverPath}/deletephotos`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(fileNames)
  });
  const isOK = response.ok;
  if (isOK) {
    console.log({response});
  }
}


// 型をつけるためのwrapper
const fetchWrpper = <T>(task: Promise<Response>): Promise<T> => {
  return new Promise((resolve) => {
    task.then(response => {
      if (response.ok) {
        response.json().then(json => {
          resolve(json);
        })
      }
    })
  })
}

// wrapperを呼び出す
const fetcher = <T> (
  input: RequestInfo,
  init?: RequestInit
): Promise<T> => {
  return fetchWrpper<T>(fetch(input, init))
}

// 画像名を取得するapiの結果を返す
export async function updatePhoto(): Promise<PhotoNames> {
  return fetcher<PhotoNames>(
    `${serverPath}/updatephoto/`
  );
}

export const getPhotoAndDiary = async () => {
  const response = await fetch(`${serverPath}/getphotoanddiary`);
  const isOK = response.ok;
  if (isOK) {
    const photoFileInfos = await response.json();
    console.log('json', photoFileInfos)
    return photoFileInfos;
  }
}

/* async/await使用のサンプルコード
export const updatePhoto = async (): Promise<PhotoNames | null> => {
  const response = await fetch(`${serverPath}/updatephoto`);
  const isOK = response.ok;
  if (isOK) {
    const photoFileNames: PhotoNames = await response.json();
    return photoFileNames;
  } else {
    return null;
  }
}
*/

export const saveDiary = async(photoFileInfo: PhotoFileInfo) => {
  const body = JSON.stringify(photoFileInfo);
  const response = await fetch(`${serverPath}/savediary`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
    });
    const isOK = response.ok;
    if(isOK) {
      console.log({response});
    }
  }

export const deletePhotoAndDiary = async(photoFileInfo: PhotoFileInfo) => {
  fetch(`${serverPath}/deletephotoanddiary/${photoFileInfo.fileName}`,{
    method: 'DELETE',
  }).then(res => {
    console.log({res});
  })
}
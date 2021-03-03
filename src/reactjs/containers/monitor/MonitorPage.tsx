import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuthentication } from 'reactjs/hooks';
import { formatDiagnostic } from 'typescript';

const electron = window.require('electron');
const WIN = electron.remote.getCurrentWindow();
const desktopCapturer = electron.desktopCapturer;
const ipcRenderer = electron.ipcRenderer;
const electronScreen = electron.remote.screen;
// const shell = electron.remote.shell;

// const fs = electron.remote.require('fs');
// const os = require('os');
// const path = require('path');

const MonitorPage = () => {
  const history = useHistory();
  const [images, setImages] = useState<any[]>([]);
  const { user } = useAuthentication();

  useEffect(() => {
    ipcRenderer.on('show-user', () => {
      alert(JSON.stringify(user));
    });
  }, []);

  const determineScreenShotSize = () => {
    const screenSize = electronScreen.getPrimaryDisplay().workAreaSize;
    const maxDimension = Math.max(screenSize.width, screenSize.height);
    return {
      width: maxDimension * window.devicePixelRatio,
      height: maxDimension * window.devicePixelRatio,
    };
  };

  const onMinimize = () => {
    WIN.minimize();
  };

  const onCapture = async () => {
    const thumbSize = determineScreenShotSize();
    let options = { types: ['screen'], thumbnailSize: thumbSize };
    const inputSources = await desktopCapturer.getSources(options);
    inputSources.forEach((source: any) => {
      // console.log(source);
      // const screenPath = path.join(
      //   os.tmpdir(),
      //   `${source.name}-${Date.now()}.png`
      // );
      const newImg = source.thumbnail.toDataURL();
      images.push(newImg);
      setImages([...images]);
      // fs.writeFile(screenPath, source.thumbnail.toPNG(), function (error: any) {
      //   if (error) return console.log(error);
      //   const newImg = source.thumbnail.toDataURL();
      //   images.push(newImg);
      //   setImages([...images]);
      // });
    });
  };

  const captureInterval = () => {
    setInterval(() => {
      onCapture();
      // ipcRenderer.send('message-send', 'ping');
    }, 1000 * 60 * 0.5); //0.5min
  };

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="flex-row p-10 bg-gray-100 shadow-sm rounded-md">
        <div className="text-2xl font-thin text-red-500 text-center">
          Monitor Page
        </div>
        <div className="text-2xl font-thin text-red-500 text-center">
          {JSON.stringify(user)}
        </div>
        <div
          className="mt-9 text-center hover:bg-gray-300 border-0 cursor-pointer"
          onClick={onMinimize}
        >
          Monitor
        </div>
        <div
          className="mt-1 text-center hover:bg-gray-300 border-0 cursor-pointer"
          onClick={captureInterval}
        >
          Capture
        </div>
        <div
          className="mt-1 text-center hover:bg-gray-300 border-0 cursor-pointer"
          onClick={() => history.goBack()}
        >
          Go back
        </div>
        <div className="flex flex-row overflow-x-auto">
          {images.map((image: any, index: number) => {
            return (
              <img
                key={index}
                src={image}
                alt="asd"
                className="w-20 h-12 mr-3"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MonitorPage;

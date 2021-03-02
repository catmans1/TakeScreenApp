import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const electron = window.require('electron');
const WIN = electron.remote.getCurrentWindow();
const desktopCapturer = electron.desktopCapturer;
const electronScreen = electron.remote.screen;
const shell = electron.remote.shell;

const fs = electron.remote.require('fs');
const os = require('os');
const path = require('path');

const MonitorPage = () => {
  const history = useHistory();
  const [images, setImages] = useState<any[]>([]);

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
      console.log(source);
      const screenPath = path.join(
        os.tmpdir(),
        `${source.name}-${Date.now()}.png`
      );

      fs.writeFile(screenPath, source.thumbnail.toPNG(), function (error: any) {
        if (error) return console.log(error);
        const newImg = source.thumbnail.toDataURL();
        images.push(newImg);
        setImages([...images]);
        // const newImg = 'file://' + screenPath;
        // setImages([...images, newImg]);
        // shell.openExternal('file://' + screenPath);
      });
    });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="flex-row p-10 bg-gray-100 shadow-sm rounded-md">
        <div className="text-2xl font-thin text-red-500 text-center">
          Monitor Page
        </div>
        <div
          className="mt-9 text-center hover:bg-gray-300 border-0 cursor-pointer"
          onClick={onMinimize}
        >
          Monitor
        </div>
        <div
          className="mt-1 text-center hover:bg-gray-300 border-0 cursor-pointer"
          onClick={onCapture}
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
          {images.map((image, index) => {
            console.log(index);
            return <img key={index} src={image} alt="asd" className="mr-3" />;
          })}
        </div>
      </div>
    </div>
  );
};

export default MonitorPage;

import React, { Fragment, useState } from 'react';
import './Snipper.scss';
import Cropper from './Cropper';

const { ipcRenderer, desktopCapturer, shell, remote } = window.require(
  'electron'
);

const BrowserWindow = remote.BrowserWindow;
const dev = process.env.NODE_ENV === 'development';
const path = require('path');
const Jimp = require('jimp');
const screenSize = remote.screen.getPrimaryDisplay().size;
const uuidv4 = require('uuid/v4');
const fs = require('fs');
// const { post } = require('axios');

let snipWindow = null,
  mainWindow = null;

const Snipper = () => {
  const [view, setView] = useState('main');
  const [save, setSave] = useState(false);
  const [image, setImage] = useState();

  const getContext = () => {
    const context = global.location.search;
    return context.substr(1, context.length - 1);
  };

  const getCurrentWindow = () => {
    return remote.getCurrentWindow();
  };

  const getAllInstances = () => {
    return BrowserWindow.getAllWindows();
  };

  const getMainInstance = () => {
    let instances = getAllInstances();
    return instances.filter((instance) => {
      return instance.id !== getCurrentWindow().id;
    })[0];
  };

  const discardSnip = () => {};

  const destroyCurrentWindow = () => {
    getCurrentWindow().close();
  };

  const captureScreen = () => {
    mainWindow = getCurrentWindow();
    mainWindow.minimize();
  };

  const initCropper = () => {};

  const uploadAndGetURL = () => {};

  const saveToDisk = () => {};

  return (
    <Fragment>
      {view === 'main' ? (
        <Fragment>
          <div className="snip-controls text-center">
            <span
              className="close"
              title="close"
              onClick={destroyCurrentWindow}
            >
              &times;
            </span>

            <div>
              <h2>
                <img
                  height="25"
                  src={require('../../assets/logo-big.png')}
                  alt=""
                />
                Snipper
              </h2>
            </div>

            {!save ? (
              <div>
                <button
                  className="btn btn-primary mr-1"
                  onClick={captureScreen}
                >
                  Fullscreen
                </button>

                <button className="btn btn-primary mr-1" onClick={initCropper}>
                  Crop Image
                </button>
              </div>
            ) : (
              <div>
                <button className="btn btn-primary mr-1" onClick={saveToDisk}>
                  Save to Disk
                </button>

                <button
                  className="btn btn-primary mr-1"
                  onClick={uploadAndGetURL}
                >
                  Upload URL
                </button>

                <button className="btn btn-primary mr-1" onClick={discardSnip}>
                  Discard
                </button>
              </div>
            )}
          </div>

          {image && (
            <div className="snipped-image">
              <img className="preview" src={image} alt="" />
            </div>
          )}
        </Fragment>
      ) : (
        <Cropper
        // snip={this.snip.bind(this)}
        // destroySnipView={this.destroySnipView.bind(this)}
        />
      )}
    </Fragment>
  );
};

export default Snipper;

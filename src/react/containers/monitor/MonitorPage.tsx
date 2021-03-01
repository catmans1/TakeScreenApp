import React from 'react';
import { useHistory } from 'react-router-dom';

const electron = window.require('electron');
const WIN = electron.remote.getCurrentWindow();

const MonitorPage = () => {
  const history = useHistory();

  const onMinimize = () => {
    WIN.minimize();
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
          onClick={() => history.goBack()}
        >
          Go back
        </div>
      </div>
    </div>
  );
};

export default MonitorPage;

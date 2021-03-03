import { useHistory } from 'react-router-dom';

import './Drag.scss';
import { useAuthentication } from 'reactjs/hooks';

const electron = window.require('electron');
const WIN = electron.remote.getCurrentWindow();

const RecordPage = () => {
  const history = useHistory();
  const { setUser, user } = useAuthentication();

  const onMinimize = () => {
    WIN.minimize();
  };
  console.log('record');
  const onHandleRecord = () => {
    alert('record');
    setUser({ record: 'record' });
  };

  const onHandlePause = () => {
    alert('pause');
    setUser({ pause: 'pause' });
  };

  return (
    <div className="flex flex-row h-screen bg-yellow-500 justify-between">
      <div
        className="flex flex-row bg-blue-500 items-center cursor-pointer px-1"
        onClick={onHandleRecord}
      >
        <div className="w-4 h-4 mr-2 rounded-full bg-red-500" />
        <div className="flex text-white">画面監視中</div>
      </div>
      <div
        className="flex flex-row bg-red-500 items-center cursor-pointer px-1"
        onClick={onHandlePause}
      >
        <div className="w-4 h-4 mr-2 bg-white" />
        <div className="flex text-white">アプリを終了</div>
      </div>
      <div className="drag-area flex items-center bg-green-500 px-2">
        <div className=" text-white text-center">+</div>
      </div>
    </div>
  );
};

export default RecordPage;

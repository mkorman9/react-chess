import {useBoardState} from '../../hooks/boardState.tsx';

const ChessBoardMenu = () => {
  const {turn} = useBoardState();

  return (<>
    <div className="flex flex-col p-8 justify-center items-center">
      <span className="text-xl p-1">Turn</span>
      <span className={'w-48 h-12 ' + ((turn === 'white') ? 'bg-white' : 'bg-black')}></span>
    </div>
  </>);
};

export default ChessBoardMenu;

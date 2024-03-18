import {useBoardState} from '../../hooks/boardState.tsx';
import Button from '../Button/Button.tsx';

const ChessBoardMenu = () => {
  const {turn, resetBoard, revertMove} = useBoardState();

  return (<>
    <div className="flex flex-col gap-8 p-8 justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <span className="text-xl p-1">Turn</span>
        <span className={'w-48 h-12 ' + ((turn === 'white') ? 'bg-white' : 'bg-black')}></span>
      </div>
      <div className="flex flex-col gap-2 justify-center items-center">
        <Button text="Reset" onClick={resetBoard}/>
        <Button text="Revert move" onClick={revertMove}/>
      </div>
    </div>
  </>);
};

export default ChessBoardMenu;

import ChessBoard from './components/ChessBoard/ChessBoard.tsx';
import {BoardState} from './hooks/boardState.tsx';

const App = () => {
  return (
    <div className="flex w-full h-full justify-center">
      <BoardState>
        <ChessBoard view='white' />
      </BoardState>
    </div>
  );
};

export default App;

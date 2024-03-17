import React from 'react';
import {ChessPieceName, useBoardState} from '../../hooks/boardState.tsx';
import ChessPiece, {ChessPieceDropItem} from '../ChessPiece/ChessPiece.tsx';
import {useDrop} from 'react-dnd';

export type ChessFieldColor = 'dark' | 'light';
export type ChessFieldEffect = 'highlight' | 'capture';

export type ChessFieldProps = {
  id: string;
  color: ChessFieldColor;
  effects: ChessFieldEffect[];
  piece?: ChessPieceName;
};

export type ChessFieldDropProps = {
  isHovering: boolean;
};

const ChessField: React.FC<ChessFieldProps> = ({ id, color, effects, piece }) => {
  const {movePiece} = useBoardState();
  const [{isHovering}, ref] = useDrop<ChessPieceDropItem, unknown, ChessFieldDropProps>(() => ({
    accept: 'piece',
    collect: monitor => ({
      isHovering: monitor.isOver()
    }),
    drop: item => {
      movePiece(item.from, id);
    }
  }), [movePiece]);

  return (<>
    <div ref={ref} className={`flex w-16 h-16 justify-center items-center 
                              ${color === 'light' ? 'bg-tile-light' : ''}
                              ${color === 'dark' ? 'bg-tile-dark' : ''}`
    }>
      <div className={`w-full h-full
                      ${effects.includes('highlight') ? 'rounded-2xl border-2 border-tile-highlight' : ''}
                      ${effects.includes('capture') ? 'rounded-2xl border-2 border-tile-capture' : ''}
                      ${effects.includes('highlight') && isHovering ? 'bg-tile-highlight' : ''}
                      ${effects.includes('capture') && isHovering ? 'bg-tile-capture' : ''}`
      }>
        {piece && (<ChessPiece piece={piece} position={id} />)}
      </div>
    </div>
  </>);
};

export default ChessField;

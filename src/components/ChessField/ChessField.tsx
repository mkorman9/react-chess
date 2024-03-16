import React, {useEffect, useState} from 'react';
import {useBoardState, ChessPieceName} from '../../hooks/boardState.tsx';
import ChessPiece, {ChessPieceDropItem} from '../ChessPiece/ChessPiece.tsx';
import {useDrop} from 'react-dnd';

export type ChessFieldColor = 'dark' | 'light' | 'highlight' | 'capture';

export type ChessFieldProps = {
  id: string;
  color: ChessFieldColor;
  piece?: ChessPieceName;
};

const ChessField: React.FC<ChessFieldProps> = ({ id, color, piece }) => {
  const {pieces, movePiece} = useBoardState();
  const [, ref] = useDrop<ChessPieceDropItem>(() => ({
    accept: 'piece',
    drop: item => {
      movePiece(item.from, id);
    }
  }), [pieces, movePiece]);

  return (<>
    <div ref={ref} className={`flex w-16 h-16 justify-center items-center 
                  ${color === 'light' ? 'bg-tile-light' : ''}
                  ${color === 'dark' ? 'bg-tile-dark' : ''}
                  ${color === 'highlight' ? 'bg-tile-highlight' : ''}
                  ${color === 'capture' ? 'bg-tile-capture' : ''}`
    }>
      {!piece || (<ChessPiece piece={piece} position={id} />)}
    </div>
  </>);
};

export default ChessField;

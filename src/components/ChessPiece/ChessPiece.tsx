import React, {useEffect, useRef} from 'react';
import {ChessPieceName, useBoardState} from '../../hooks/boardState.tsx';
import whiteKing from './pieces/white_king.png';
import whiteQueen from './pieces/white_queen.png';
import whiteBishop from './pieces/white_bishop.png';
import whiteKnight from './pieces/white_knight.png';
import whiteRook from './pieces/white_rook.png';
import whitePawn from './pieces/white_pawn.png';
import blackKing from './pieces/black_king.png';
import blackQueen from './pieces/black_queen.png';
import blackBishop from './pieces/black_bishop.png';
import blackKnight from './pieces/black_knight.png';
import blackRook from './pieces/black_rook.png';
import blackPawn from './pieces/black_pawn.png';
import {useDrag} from 'react-dnd';

export type ChessPieceProps = {
  piece: ChessPieceName
  position: string
};

export type ChessPieceDropItem = {
  from: string;
};

type ChessPieceDragItem = {
  isDragging: boolean;
};

const ChessPiece: React.FC<ChessPieceProps> = ({ piece, position }) => {
  const {highlightValidMoves, resetHighlight} = useBoardState();

  const [{isDragging}, ref] = useDrag<ChessPieceDropItem, unknown, ChessPieceDragItem>(() => ({
    type: 'piece',
    item: {
      from: position
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    }),
  }), []);

  useEffect(() => {
    if (isDragging) {
      highlightValidMoves(position);
    } else {
      resetHighlight();
    }
  }, [isDragging]);

  return (<>
    <div ref={ref} className={'w-full h-full ' + (isDragging ? 'opacity-50' : '')}>
      {piece === 'white-king' && (
        <img src={whiteKing} alt={piece} className="w-full h-full"/>
      )}
      {piece === 'white-queen' && (
        <img src={whiteQueen} alt={piece} className="w-full h-full"/>
      )}
      {piece === 'white-knight' && (
        <img src={whiteKnight} alt={piece} className="w-full h-full"/>
      )}
      {piece === 'white-bishop' && (
        <img src={whiteBishop} alt={piece} className="w-full h-full"/>
      )}
      {piece === 'white-rook' && (
        <img src={whiteRook} alt={piece} className="w-full h-full"/>
      )}
      {piece === 'white-pawn' && (
        <img src={whitePawn} alt={piece} className="w-full h-full"/>
      )}
      {piece === 'black-king' && (
        <img src={blackKing} alt={piece} className="w-full h-full"/>
      )}
      {piece === 'black-queen' && (
        <img src={blackQueen} alt={piece} className="w-full h-full"/>
      )}
      {piece === 'black-knight' && (
        <img src={blackKnight} alt={piece} className="w-full h-full"/>
      )}
      {piece === 'black-bishop' && (
        <img src={blackBishop} alt={piece} className="w-full h-full"/>
      )}
      {piece === 'black-rook' && (
        <img src={blackRook} alt={piece} className="w-full h-full"/>
      )}
      {piece === 'black-pawn' && (
        <img src={blackPawn} alt={piece} className="w-full h-full"/>
      )}
    </div>
  </>);
};

export default ChessPiece;

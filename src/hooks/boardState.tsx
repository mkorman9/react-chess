import React, {createContext, useContext, useState} from 'react';
import {calculateValidMoves} from './validMoves.ts';

export type ChessColor = 'white' | 'black';
export type ChessPieceType = 'king' | 'queen' | 'bishop' | 'knight' | 'rook' | 'pawn';
export type ChessPieceName = `${ChessColor}-${ChessPieceType}`;
export type ChessMove = {
  type: 'move';
  color: ChessColor;
  source: ChessPieceType;
  from: string;
  to: string;
} | {
  type: 'capture';
  color: ChessColor;
  from: string;
  to: string;
  source: ChessPieceType;
  target: ChessPieceType;
};

export type BoardStateContextType = {
  pieces: Record<string, ChessPieceName>;
  highlightFields: string[];
  captureFields: string[];
  moves: ChessMove[];
  turn: ChessColor;
  movePiece: (from: string, to: string) => boolean;
  highlightValidMoves: (position: string) => void;
  resetHighlight: () => void;
  resetBoard: () => void;
  revertMove: () => void;
};

const START_PIECES: Record<string, ChessPieceName> = {
  a1: 'white-rook',
  b1: 'white-knight',
  c1: 'white-bishop',
  d1: 'white-queen',
  e1: 'white-king',
  f1: 'white-bishop',
  g1: 'white-knight',
  h1: 'white-rook',
  a2: 'white-pawn',
  b2: 'white-pawn',
  c2: 'white-pawn',
  d2: 'white-pawn',
  e2: 'white-pawn',
  f2: 'white-pawn',
  g2: 'white-pawn',
  h2: 'white-pawn',

  a8: 'black-rook',
  b8: 'black-knight',
  c8: 'black-bishop',
  d8: 'black-queen',
  e8: 'black-king',
  f8: 'black-bishop',
  g8: 'black-knight',
  h8: 'black-rook',
  a7: 'black-pawn',
  b7: 'black-pawn',
  c7: 'black-pawn',
  d7: 'black-pawn',
  e7: 'black-pawn',
  f7: 'black-pawn',
  g7: 'black-pawn',
  h7: 'black-pawn'
};
const START_TURN: ChessColor = 'white';

const oppositeColor = (color: ChessColor) => {
  return color === 'white' ? 'black' : 'white';
};

export const BoardStateContext = createContext<BoardStateContextType>(
  {} as BoardStateContextType
);

export const BoardState: React.FC<React.PropsWithChildren> = ({children}) => {
  const [pieces, setPieces] =
    useState<Record<string, ChessPieceName>>(START_PIECES);
  const [highlightFields, setHighlightFields] =
    useState<string[]>([]);
  const [captureFields, setCaptureFields] =
    useState<string[]>([]);
  const [moves, setMoves] =
    useState<ChessMove[]>([]);
  const [turn, setTurn] =
    useState<ChessColor>(START_TURN);

  const movePiece = (from: string, to: string) => {
    if (from === to) {
      return false;
    }
    if (!highlightFields.includes(to) && !captureFields.includes(to)) {
      return false;
    }

    const piecesTmp = {...pieces};

    const source = piecesTmp[from];
    if (!source) {
      return false;
    }

    const target = piecesTmp[to];

    piecesTmp[to] = source;
    delete piecesTmp[from];

    setPieces(piecesTmp);
    if (target) {
      setMoves([...moves, {
        from,
        to,
        color: turn,
        source: (source.split('-')[1] as ChessPieceType),
        target: (target.split('-')[1] as ChessPieceType),
        type: 'capture'
      }]);
    } else {
      setMoves([...moves, {
        from,
        to,
        color: turn,
        source: (source.split('-')[1] as ChessPieceType),
        type: 'move'
      }]);
    }
    resetHighlight();

    setTurn(oppositeColor(turn));

    return true;
  };

  const highlightValidMoves = (position: string) => {
    const moves = calculateValidMoves(position, pieces);
    setHighlightFields(moves.highlight);
    setCaptureFields(moves.capture);
  };

  const resetHighlight = () => {
    setHighlightFields([]);
    setCaptureFields([]);
  };

  const resetBoard = () => {
    resetHighlight();
    setMoves([]);
    setPieces(START_PIECES);
    setTurn(START_TURN);
  };

  const revertMove = () => {
    if (!moves.length) {
      return;
    }

    const piecesTmp = {...pieces};

    const move = moves[moves.length - 1];
    if (move.type === 'move') {
      piecesTmp[move.from] = `${move.color}-${move.source}`;
      delete piecesTmp[move.to];
    } else if (move.type === 'capture') {
      piecesTmp[move.from] = `${move.color}-${move.source}`;
      piecesTmp[move.to] = `${oppositeColor(move.color)}-${move.target}`;
    }

    setPieces(piecesTmp);
    setMoves([...moves].slice(0, -1));
    setTurn(oppositeColor(turn));
  };

  return (
    <BoardStateContext.Provider value={{
      pieces,
      highlightFields,
      captureFields,
      moves,
      turn,
      movePiece,
      highlightValidMoves,
      resetHighlight,
      resetBoard,
      revertMove
    }}>
      {children}
    </BoardStateContext.Provider>
  );
};

export const useBoardState = () => useContext(BoardStateContext);

import React, {createContext, useContext, useState} from 'react';
import {calculateValidMoves} from './validMoves.ts';

export type ChessColor = 'white' | 'black';
export type ChessPieceType = 'king' | 'queen' | 'bishop' | 'knight' | 'rook' | 'pawn';
export type ChessPieceName = `${ChessColor}-${ChessPieceType}`;
export type ChessMove = {
  from: string;
  to: string;
};

export type BoardStateContextType = {
  pieces: Record<string, ChessPieceName>;
  highlightFields: string[];
  captureFields: string[];
  moves: ChessMove[];
  movePiece: (from: string, to: string) => boolean;
  highlightValidMoves: (position: string) => void;
  resetHighlight: () => void;
};

export const BoardStateContext = createContext<BoardStateContextType>({} as BoardStateContextType);

export const BoardState: React.FC<React.PropsWithChildren> = ({children}) => {
  const [pieces, setPieces] = useState<Record<string, ChessPieceName>>(() => ({
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
  }));
  const [highlightFields, setHighlightFields] = useState<string[]>([]);
  const [captureFields, setCaptureFields] = useState<string[]>([]);
  const [moves, setMoves] = useState<ChessMove[]>([]);

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

    piecesTmp[to] = source;
    delete piecesTmp[from];

    setPieces(piecesTmp);
    setMoves([...moves, {from, to}]);
    resetHighlight();

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

  return (
    <BoardStateContext.Provider value={{
      pieces,
      highlightFields,
      captureFields,
      moves,
      movePiece,
      highlightValidMoves,
      resetHighlight
    }}>
      {children}
    </BoardStateContext.Provider>
  );
};

export const useBoardState = () => useContext(BoardStateContext);

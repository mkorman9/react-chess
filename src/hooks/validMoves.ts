import {ChessPieceName} from './boardState.tsx';

export const calculateValidMoves = (sourceField: string, pieces: Record<string, ChessPieceName>) => {
  return {
    highlight: ['d4'],
    capture: ['d5']
  };
};

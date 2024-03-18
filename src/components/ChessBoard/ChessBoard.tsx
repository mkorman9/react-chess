import React, {useMemo} from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {ChessColor, useBoardState} from '../../hooks/boardState.tsx';
import ChessField, {ChessFieldColor, ChessFieldEffect} from '../ChessField/ChessField.tsx';
import {COLUMNS, ROWS} from '../../hooks/constants.ts';
import ChessBoardMenu from '../ChessBoardMenu/ChessBoardMenu.tsx';

type ChessBoardProps = {
  view: ChessColor;
};

const ChessBoard: React.FC<ChessBoardProps> = ({view}) => {
  const {pieces, highlightFields, captureFields} =
    useBoardState();

  const tiles = useMemo(
    () => {
      const tiles = [...ROWS].reverse().map((row, rowNumber) =>
        COLUMNS.map((column, columnNumber) => {
          const id = `${column}${row}`;
          return {
            id,
            color: ((columnNumber + (rowNumber % 2 === 0 ? 0 : 1)) % 2 === 0) ? 'light' : 'dark',
            effects: [
              ...(highlightFields.includes(id) ? ['highlight'] : []),
              ...(captureFields.includes(id) ? ['capture'] : [])
            ],
            piece: pieces[`${column}${row}`]
          };
        })
      );

      if (view === 'black') {
        tiles.forEach(row => row.reverse());
        tiles.reverse();
      }

      return tiles;
    },
    [view, pieces, highlightFields, captureFields]
  );

  return (<>
    <div className="flex bg-chessboard-border gap-4">
      <DndProvider backend={HTML5Backend}>
        <div className="flex flex-col p-4">
          <div>
            {tiles.map((row, i) => (
              <div key={i} className="flex flex-row justify-center items-center">
                <span className="w-4">{row[0].id[1]}</span>

                {row.map((tile, j) => (
                  <ChessField
                    key={j}
                    id={tile.id}
                    color={tile.color as ChessFieldColor}
                    effects={tile.effects as ChessFieldEffect[]}
                    piece={tile.piece}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center">
            <span className="w-16 ml-1"></span>
            {(view === 'white' ? COLUMNS : [...COLUMNS].reverse()).map(
              (columnId, columnKey) => (
                <span key={columnKey} className="w-16">{columnId}</span>
              )
            )}
          </div>
        </div>
      </DndProvider>
      <ChessBoardMenu />
    </div>
  </>);
};

export default ChessBoard;

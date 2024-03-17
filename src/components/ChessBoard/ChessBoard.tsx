import React, {useMemo} from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {ChessColor, useBoardState} from '../../hooks/boardState.tsx';
import ChessField, {ChessFieldColor} from '../ChessField/ChessField.tsx';
import {COLUMNS, ROWS} from '../../hooks/constants.ts';

type ChessBoardProps = {
  view: ChessColor;
};

const ChessBoard: React.FC<ChessBoardProps> = ({view}) => {
  const {pieces, highlightFields, captureFields} = useBoardState();

  const tiles = useMemo(
    () => {
      const tiles = [...ROWS].reverse().map((row, rowNumber) =>
        COLUMNS.map((column, columnNumber) => {
          const id = `${column}${row}`;

          let color = ((columnNumber + (rowNumber % 2 === 0 ? 0 : 1)) % 2 === 0) ? 'light' : 'dark';
          if (highlightFields.includes(id)) {
            color = 'highlight';
          }
          if (captureFields.includes(id)) {
            color = 'capture';
          }

          return {
            id,
            color,
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
    [view, pieces, highlightFields]
  );

  return (<>
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col p-4 bg-chessboard-border">
        <div className="flex pl-12">
          {(view === 'white' ? COLUMNS : [...COLUMNS].reverse()).map((columnId, columnKey) => (
            <span key={columnKey} className="w-16">{columnId}</span>
          ))}
        </div>
        <div>
          {tiles.map((row, i) => (
            <div key={i} className="flex flex-row justify-center items-center">
              <span className="mr-2">{row[0].id[1]}</span>

              {row.map((tile, j) => (
                <ChessField key={j} id={tile.id} color={tile.color as ChessFieldColor} piece={tile.piece}/>
              ))}

              <span className="ml-2">{row[0].id[1]}</span>
            </div>
          ))}
        </div>
        <div className="flex pl-12">
          {(view === 'white' ? COLUMNS : [...COLUMNS].reverse()).map((columnId, columnKey) => (
            <span key={columnKey} className="w-16">{columnId}</span>
          ))}
        </div>
      </div>
    </DndProvider>
  </>);
};

export default ChessBoard;

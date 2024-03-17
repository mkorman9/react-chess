import React, {useMemo} from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {ChessColor, useBoardState} from '../../hooks/boardState.tsx';
import ChessField, {ChessFieldColor} from '../ChessField/ChessField.tsx';

type ChessBoardProps = {
  view: ChessColor;
};

const ChessBoard: React.FC<ChessBoardProps> = ({view}) => {
  const {pieces, highlightFields, captureFields} = useBoardState();

  const tiles = useMemo(
    () => {
      const tiles = [8, 7, 6, 5, 4, 3, 2, 1].map((row, rowNumber) =>
        ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((column, columnNumber) => {
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
    <div className="flex flex-col">
      <DndProvider backend={HTML5Backend}>
        <div className="p-4 bg-chessboard-border">
          {tiles.map((row, i) => (
            <div key={i} className="flex flex-row justify-center items-center">
              <span className="mr-4">
                {row[0].id[1]}
              </span>
              {row.map((tile, j) => (
                <div className="flex flex-col justify-center items-center">
                  {i === 0 && (<span className="mb-2">{tile.id[0]}</span>)}
                  <ChessField key={j} id={tile.id} color={tile.color as ChessFieldColor} piece={tile.piece}/>
                  {i === 7 && (<span className="mt-2">{tile.id[0]}</span>)}
                </div>
              ))}
              <span className="ml-4">
                {row[0].id[1]}
              </span>
            </div>
          ))}
        </div>
      </DndProvider>
    </div>
  </>);
};

export default ChessBoard;

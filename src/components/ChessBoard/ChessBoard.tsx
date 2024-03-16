import React, {useMemo} from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {useBoardState} from '../../hooks/boardState.tsx';
import ChessField, {ChessFieldColor} from '../ChessField/ChessField.tsx';

type ChessBoardView = 'white' | 'black';

type ChessBoardProps = {
  view: ChessBoardView
};

const ChessBoard: React.FC<ChessBoardProps> = ({view}) => {
  const {pieces, highlightFields} = useBoardState();

  const tiles = useMemo(
    () => {
      const tiles = [8, 7, 6, 5, 4, 3, 2, 1].map((row, rowNumber) =>
        ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((column, columnNumber) => {
          const id = `${column}${row}`;

          let color = ((columnNumber + (rowNumber % 2 === 0 ? 0 : 1)) % 2 === 0) ? 'light' : 'dark';
          if (highlightFields.includes(id)) {
            color = 'highlight';
          }

          return {
            id,
            color,
            piece: pieces[`${column}${row}`]
          };
        })
      );

      if (view === 'black') {
        tiles.reverse();
      }

      return tiles;
    },
    [view, pieces, highlightFields]
  );

  return (<>
    <div className="flex flex-col">
      <DndProvider backend={HTML5Backend}>
        {tiles.map((row, i) => (
          <div key={i} className="flex flex-row">
            {row.map((tile, j) => (
              <ChessField key={j} id={tile.id} color={tile.color as ChessFieldColor} piece={tile.piece} />
            ))}
          </div>
        ))}
      </DndProvider>
    </div>
  </>);
};

export default ChessBoard;

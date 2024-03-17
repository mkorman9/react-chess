import {ChessColor, ChessPieceName, ChessPieceType} from './boardState.tsx';

const ROWS = ['1', '2', '3', '4', '5', '6', '7', '8'];
const COLUMNS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export const calculateValidMoves = (source: string, pieces: Record<string, ChessPieceName>) => {
  const highlight: string[] = [];
  const capture: string[] = [];

  const sourcePiece = pieces[source];
  if (!source) {
    return {
      highlight,
      capture
    };
  }

  const {color, type} = getPieceInfo(sourcePiece);

  if (type === 'king') {
    const forward = getPositionForward(source, color);
    if (forward) {
      if (pieces[forward]) {
        const {color: pieceColor} = getPieceInfo(pieces[forward]);
        if (color !== pieceColor) {
          capture.push(forward);
        }
      } else {
        highlight.push(forward);
      }
    }

    const backward = getPositionBackward(source, color);
    if (backward) {
      if (pieces[backward]) {
        const {color: pieceColor} = getPieceInfo(pieces[backward]);
        if (color !== pieceColor) {
          capture.push(backward);
        }
      } else {
        highlight.push(backward);
      }
    }

    const right = getPositionRight(source, color);
    if (right) {
      if (pieces[right]) {
        const {color: pieceColor} = getPieceInfo(pieces[right]);
        if (color !== pieceColor) {
          capture.push(right);
        }
      } else {
        highlight.push(right);
      }
    }

    const left = getPositionLeft(source, color);
    if (left) {
      if (pieces[left]) {
        const {color: pieceColor} = getPieceInfo(pieces[left]);
        if (color !== pieceColor) {
          capture.push(left);
        }
      } else {
        highlight.push(left);
      }
    }

    const forwardRight = getPositionForwardRight(source, color);
    if (forwardRight) {
      if (pieces[forwardRight]) {
        const {color: pieceColor} = getPieceInfo(pieces[forwardRight]);
        if (color !== pieceColor) {
          capture.push(forwardRight);
        }
      } else {
        highlight.push(forwardRight);
      }
    }

    const forwardLeft = getPositionForwardLeft(source, color);
    if (forwardLeft) {
      if (pieces[forwardLeft]) {
        const {color: pieceColor} = getPieceInfo(pieces[forwardLeft]);
        if (color !== pieceColor) {
          capture.push(forwardLeft);
        }
      } else {
        highlight.push(forwardLeft);
      }
    }

    const backwardRight = getPositionBackwardRight(source, color);
    if (backwardRight) {
      if (pieces[backwardRight]) {
        const {color: pieceColor} = getPieceInfo(pieces[backwardRight]);
        if (color !== pieceColor) {
          capture.push(backwardRight);
        }
      } else {
        highlight.push(backwardRight);
      }
    }

    const backwardLeft = getPositionBackwardLeft(source, color);
    if (backwardLeft) {
      if (pieces[backwardLeft]) {
        const {color: pieceColor} = getPieceInfo(pieces[backwardLeft]);
        if (color !== pieceColor) {
          capture.push(backwardLeft);
        }
      } else {
        highlight.push(backwardLeft);
      }
    }
  } else if (type === 'queen') {
    let forward = getPositionForward(source, color);
    while (forward) {
      const piece = pieces[forward];
      if (piece) {
        const {color: pieceColor} = getPieceInfo(piece);
        if (color !== pieceColor) {
          capture.push(forward);
        }
        break;
      } else {
        highlight.push(forward);
      }

      forward = getPositionForward(forward, color);
    }

    let backward = getPositionBackward(source, color);
    while (backward) {
      const piece = pieces[backward];
      if (piece) {
        const {color: pieceColor} = getPieceInfo(piece);
        if (color !== pieceColor) {
          capture.push(backward);
        }
        break;
      } else {
        highlight.push(backward);
      }

      backward = getPositionBackward(backward, color);
    }

    let right = getPositionRight(source, color);
    while (right) {
      const piece = pieces[right];
      if (piece) {
        const {color: pieceColor} = getPieceInfo(piece);
        if (color !== pieceColor) {
          capture.push(right);
        }
        break;
      } else {
        highlight.push(right);
      }

      right = getPositionRight(right, color);
    }

    let left = getPositionLeft(source, color);
    while (left) {
      const piece = pieces[left];
      if (piece) {
        const {color: pieceColor} = getPieceInfo(piece);
        if (color !== pieceColor) {
          capture.push(left);
        }
        break;
      } else {
        highlight.push(left);
      }

      left = getPositionLeft(left, color);
    }

    let forwardRight = getPositionForwardRight(source, color);
    while (forwardRight) {
      const piece = pieces[forwardRight];
      if (piece) {
        const {color: pieceColor} = getPieceInfo(piece);
        if (color !== pieceColor) {
          capture.push(forwardRight);
        }
        break;
      } else {
        highlight.push(forwardRight);
      }

      forwardRight = getPositionForwardRight(forwardRight, color);
    }

    let forwardLeft = getPositionForwardLeft(source, color);
    while (forwardLeft) {
      const piece = pieces[forwardLeft];
      if (piece) {
        const {color: pieceColor} = getPieceInfo(piece);
        if (color !== pieceColor) {
          capture.push(forwardLeft);
        }
        break;
      } else {
        highlight.push(forwardLeft);
      }

      forwardLeft = getPositionForwardLeft(forwardLeft, color);
    }

    let backwardRight = getPositionBackwardRight(source, color);
    while (backwardRight) {
      const piece = pieces[backwardRight];
      if (piece) {
        const {color: pieceColor} = getPieceInfo(piece);
        if (color !== pieceColor) {
          capture.push(backwardRight);
        }
        break;
      } else {
        highlight.push(backwardRight);
      }

      backwardRight = getPositionBackwardRight(backwardRight, color);
    }

    let backwardLeft = getPositionBackwardLeft(source, color);
    while (backwardLeft) {
      const piece = pieces[backwardLeft];
      if (piece) {
        const {color: pieceColor} = getPieceInfo(piece);
        if (color !== pieceColor) {
          capture.push(backwardLeft);
        }
        break;
      } else {
        highlight.push(backwardLeft);
      }

      backwardLeft = getPositionBackwardLeft(backwardLeft, color);
    }
  } else if (type === 'bishop') {
    let forwardRight = getPositionForwardRight(source, color);
    while (forwardRight) {
      const piece = pieces[forwardRight];
      if (piece) {
        const {color: pieceColor} = getPieceInfo(piece);
        if (color !== pieceColor) {
          capture.push(forwardRight);
        }
        break;
      } else {
        highlight.push(forwardRight);
      }

      forwardRight = getPositionForwardRight(forwardRight, color);
    }

    let forwardLeft = getPositionForwardLeft(source, color);
    while (forwardLeft) {
      const piece = pieces[forwardLeft];
      if (piece) {
        const {color: pieceColor} = getPieceInfo(piece);
        if (color !== pieceColor) {
          capture.push(forwardLeft);
        }
        break;
      } else {
        highlight.push(forwardLeft);
      }

      forwardLeft = getPositionForwardLeft(forwardLeft, color);
    }

    let backwardRight = getPositionBackwardRight(source, color);
    while (backwardRight) {
      const piece = pieces[backwardRight];
      if (piece) {
        const {color: pieceColor} = getPieceInfo(piece);
        if (color !== pieceColor) {
          capture.push(backwardRight);
        }
        break;
      } else {
        highlight.push(backwardRight);
      }

      backwardRight = getPositionBackwardRight(backwardRight, color);
    }

    let backwardLeft = getPositionBackwardLeft(source, color);
    while (backwardLeft) {
      const piece = pieces[backwardLeft];
      if (piece) {
        const {color: pieceColor} = getPieceInfo(piece);
        if (color !== pieceColor) {
          capture.push(backwardLeft);
        }
        break;
      } else {
        highlight.push(backwardLeft);
      }

      backwardLeft = getPositionBackwardLeft(backwardLeft, color);
    }
  } else if (type === 'knight') {
    const forwardRight = getPositionForwardRight(source, color);
    if (forwardRight) {
      const forward = getPositionForward(forwardRight, color);
      if (forward) {
        if (pieces[forward]) {
          const {color: pieceColor} = getPieceInfo(pieces[forward]);
          if (color !== pieceColor) {
            capture.push(forward);
          }
        } else {
          highlight.push(forward);
        }
      }

      const right = getPositionRight(forwardRight, color);
      if (right) {
        if (pieces[right]) {
          const {color: pieceColor} = getPieceInfo(pieces[right]);
          if (color !== pieceColor) {
            capture.push(right);
          }
        } else {
          highlight.push(right);
        }
      }
    }

    const forwardLeft = getPositionForwardLeft(source, color);
    if (forwardLeft) {
      const forward = getPositionForward(forwardLeft, color);
      if (forward) {
        if (pieces[forward]) {
          const {color: pieceColor} = getPieceInfo(pieces[forward]);
          if (color !== pieceColor) {
            capture.push(forward);
          }
        } else {
          highlight.push(forward);
        }
      }

      const left = getPositionLeft(forwardLeft, color);
      if (left) {
        if (pieces[left]) {
          const {color: pieceColor} = getPieceInfo(pieces[left]);
          if (color !== pieceColor) {
            capture.push(left);
          }
        } else {
          highlight.push(left);
        }
      }
    }

    const backwardRight = getPositionBackwardRight(source, color);
    if (backwardRight) {
      const backward = getPositionBackward(backwardRight, color);
      if (backward) {
        if (pieces[backward]) {
          const {color: pieceColor} = getPieceInfo(pieces[backward]);
          if (color !== pieceColor) {
            capture.push(backward);
          }
        } else {
          highlight.push(backward);
        }
      }

      const right = getPositionRight(backwardRight, color);
      if (right) {
        if (pieces[right]) {
          const {color: pieceColor} = getPieceInfo(pieces[right]);
          if (color !== pieceColor) {
            capture.push(right);
          }
        } else {
          highlight.push(right);
        }
      }
    }

    const backwardLeft = getPositionBackwardLeft(source, color);
    if (backwardLeft) {
      const backward = getPositionBackward(backwardLeft, color);
      if (backward) {
        if (pieces[backward]) {
          const {color: pieceColor} = getPieceInfo(pieces[backward]);
          if (color !== pieceColor) {
            capture.push(backward);
          }
        } else {
          highlight.push(backward);
        }
      }

      const left = getPositionLeft(backwardLeft, color);
      if (left) {
        if (pieces[left]) {
          const {color: pieceColor} = getPieceInfo(pieces[left]);
          if (color !== pieceColor) {
            capture.push(left);
          }
        } else {
          highlight.push(left);
        }
      }
    }
  } else if (type === 'rook') {
    let forward = getPositionForward(source, color);
    while (forward) {
      const piece = pieces[forward];
      if (piece) {
        const {color: pieceColor} = getPieceInfo(piece);
        if (color !== pieceColor) {
          capture.push(forward);
        }
        break;
      } else {
        highlight.push(forward);
      }

      forward = getPositionForward(forward, color);
    }

    let backward = getPositionBackward(source, color);
    while (backward) {
      const piece = pieces[backward];
      if (piece) {
        const {color: pieceColor} = getPieceInfo(piece);
        if (color !== pieceColor) {
          capture.push(backward);
        }
        break;
      } else {
        highlight.push(backward);
      }

      backward = getPositionBackward(backward, color);
    }

    let right = getPositionRight(source, color);
    while (right) {
      const piece = pieces[right];
      if (piece) {
        const {color: pieceColor} = getPieceInfo(piece);
        if (color !== pieceColor) {
          capture.push(right);
        }
        break;
      } else {
        highlight.push(right);
      }

      right = getPositionRight(right, color);
    }

    let left = getPositionLeft(source, color);
    while (left) {
      const piece = pieces[left];
      if (piece) {
        const {color: pieceColor} = getPieceInfo(piece);
        if (color !== pieceColor) {
          capture.push(left);
        }
        break;
      } else {
        highlight.push(left);
      }

      left = getPositionLeft(left, color);
    }
  } else if (type === 'pawn') {
    let forward = getPositionForward(source, color);
    if (forward && !pieces[forward]) {
      highlight.push(forward);

      if (isPawnOnStart(source, color)) {
        forward = getPositionForward(forward, color);
        if (forward && !pieces[forward]) {
          highlight.push(forward);
        }
      }
    }

    const forwardRight = getPositionForwardRight(source, color);
    if (forwardRight && pieces[forwardRight]) {
      const {color: pieceColor} = getPieceInfo(pieces[forwardRight]);
      if (color !== pieceColor) {
        capture.push(forwardRight);
      }
    }

    const forwardLeft = getPositionForwardLeft(source, color);
    if (forwardLeft && pieces[forwardLeft]) {
      const {color: pieceColor} = getPieceInfo(pieces[forwardLeft]);
      if (color !== pieceColor) {
        capture.push(forwardLeft);
      }
    }
  }

  return {
    highlight,
    capture
  };
};

const getPieceInfo = (piece: ChessPieceName) => {
  const [color, type] = piece.split('-');
  return {
    color: color as ChessColor,
    type: type as ChessPieceType
  };
};

const isPawnOnStart = (position: string, color: ChessColor) => {
  const [, row] = position.split('');
  return color === 'white' ? (row === '2') : (row === '7');
};

const getPositionForward = (position: string, color: ChessColor) => {
  const [column, row] = position.split('');
  const [x, y] = [COLUMNS.indexOf(column), ROWS.indexOf(row)];
  const [newX, newY] = [x, y + (color === 'white' ? 1 : -1)];
  if (newY < 0 || newY >= 8) {
    return undefined;
  }
  return `${COLUMNS[newX]}${ROWS[newY]}`;
};

const getPositionBackward = (position: string, color: ChessColor) => {
  const [column, row] = position.split('');
  const [x, y] = [COLUMNS.indexOf(column), ROWS.indexOf(row)];
  const [newX, newY] = [x, y - (color === 'white' ? 1 : -1)];
  if (newY < 0 || newY >= 8) {
    return undefined;
  }
  return `${COLUMNS[newX]}${ROWS[newY]}`;
};

const getPositionRight = (position: string, color: ChessColor) => {
  const [column, row] = position.split('');
  const [x, y] = [COLUMNS.indexOf(column), ROWS.indexOf(row)];
  const [newX, newY] = [x + (color === 'white' ? 1 : -1), y];
  if (newX < 0 || newX >= 8) {
    return undefined;
  }
  return `${COLUMNS[newX]}${ROWS[newY]}`;
};

const getPositionLeft = (position: string, color: ChessColor) => {
  const [column, row] = position.split('');
  const [x, y] = [COLUMNS.indexOf(column), ROWS.indexOf(row)];
  const [newX, newY] = [x - (color === 'white' ? 1 : -1), y];
  if (newX < 0 || newX >= 8) {
    return undefined;
  }
  return `${COLUMNS[newX]}${ROWS[newY]}`;
};

const getPositionForwardRight = (position: string, color: ChessColor) => {
  const [column, row] = position.split('');
  const [x, y] = [COLUMNS.indexOf(column), ROWS.indexOf(row)];
  const [newX, newY] = [x + (color === 'white' ? 1 : -1), y + (color === 'white' ? 1 : -1)];
  if (newX < 0 || newX >= 8 || newY < 0 || newY >= 8) {
    return undefined;
  }
  return `${COLUMNS[newX]}${ROWS[newY]}`;
};

const getPositionForwardLeft = (position: string, color: ChessColor) => {
  const [column, row] = position.split('');
  const [x, y] = [COLUMNS.indexOf(column), ROWS.indexOf(row)];
  const [newX, newY] = [x - (color === 'white' ? 1 : -1), y + (color === 'white' ? 1 : -1)];
  if (newX < 0 || newX >= 8 || newY < 0 || newY >= 8) {
    return undefined;
  }
  return `${COLUMNS[newX]}${ROWS[newY]}`;
};

const getPositionBackwardRight = (position: string, color: ChessColor) => {
  const [column, row] = position.split('');
  const [x, y] = [COLUMNS.indexOf(column), ROWS.indexOf(row)];
  const [newX, newY] = [x + (color === 'white' ? 1 : -1), y - (color === 'white' ? 1 : -1)];
  if (newX < 0 || newX >= 8 || newY < 0 || newY >= 8) {
    return undefined;
  }
  return `${COLUMNS[newX]}${ROWS[newY]}`;
};

const getPositionBackwardLeft = (position: string, color: ChessColor) => {
  const [column, row] = position.split('');
  const [x, y] = [COLUMNS.indexOf(column), ROWS.indexOf(row)];
  const [newX, newY] = [x - (color === 'white' ? 1 : -1), y - (color === 'white' ? 1 : -1)];
  if (newX < 0 || newX >= 8 || newY < 0 || newY >= 8) {
    return undefined;
  }
  return `${COLUMNS[newX]}${ROWS[newY]}`;
};

export const parseLineBreaks = (str) => {
    const pieces = str.split(/\r?\n|\r/);
  
    let processed = [];
    pieces.forEach((piece, pieceIdx) => {
      if (processed.length !== 0) processed.push(<br key={pieceIdx} />);
      processed.push(piece);
    });
  
    return processed;
  };
  
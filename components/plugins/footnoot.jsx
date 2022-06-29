import React, { useState } from 'react';

export const Footnote = (props) => {
  const [num, setNum] = useState(props.config.start);

  const handleClick = () => {
    props.editor.insertText(`[^מספר הערה]`);
    setNum(num + 1);
  };

  return (
    <span
      className="button button-type-counter"
      title="הערת שוליים"
      onClick={handleClick}
    >
      ↑
    </span>
  );
};

Footnote.defaultConfig = {
  start: 0,
};
Footnote.align = 'left';
Footnote.pluginName = 'footnote';

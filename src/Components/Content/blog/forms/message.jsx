import React, { useState } from 'react';

function LessText({ text, maxLength }) {
  const [hidden, setHidden] = useState(true);

  if (text.length <= maxLength) {
    return text;
  }

  return (

    <span>
      {hidden ? `${text.substr(0, maxLength).trim()} ...` : text}
      {hidden ? (
        <a href="#readmore" onClick={() => setHidden(false)}>read more</a>
      ) : (
        <a href="#readless" onClick={() => setHidden(true)}>read less</a>
      )}
    </span>

  );
}

export default LessText;
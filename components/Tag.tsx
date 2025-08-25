
import React from 'react';

interface TagProps {
  text: string;
}

const Tag: React.FC<TagProps> = ({ text }) => {
  return (
    <span className="text-xs font-semibold inline-block py-1 px-2.5 uppercase rounded-full text-slate-600 bg-slate-200 last:mr-0 mr-1">
      {text}
    </span>
  );
};

export default Tag;

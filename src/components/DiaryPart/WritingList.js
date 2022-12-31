import React from 'react';
import WritingItem from './WritingItem';

const WritingList = ({writingList}) => {
    return(
      <>
        {writingList.map((it)=>(
        	<WritingItem key={it.id} {...it} />
        ))}
      </>
    );
}

export default WritingList;
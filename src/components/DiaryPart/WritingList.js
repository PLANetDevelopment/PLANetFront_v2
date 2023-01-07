// import React from 'react';
// import WritingItem from './WritingItem';


// const WritingList = ({writingList}) => {
//     return(
//       <>
//         {writingList.map((it)=>(
//         	<WritingItem key={it.id} {...it} />
//         ))}
//       </>
//     );
// }

// export default WritingList;

// {writingList.map((it)=>(
//   <Link to={`/postView/${it.id}`}>
//     <WritingItem key={it.id} {...it} />
//   </Link>
// ))}

//Route Test...

import React, { useState } from 'react';
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
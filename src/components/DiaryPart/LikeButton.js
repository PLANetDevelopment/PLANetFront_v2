import React, { useState } from 'react';

import {HeartOutlined, HeartFilled} from '@ant-design/icons';

function LikeButton(){
    const [isChecked, setIsChecked] = useState(false);
    const [notice, setNotice] = useState('');

    const ClickLikeBtn = () => {
        if(isChecked === 'true'){
            setIsChecked(false);
            setNotice('');
            console.log('check 상태가 트루')
        };
        if(isChecked === 'false'){
            setIsChecked(true);
            setNotice('1');
            console.log('check 상태가 펄스')
        };
    }

    return(
        <div>
            {isChecked ? 
            <HeartFilled style={{ color: 'red', fontSize: '20px'}} onClick={ClickLikeBtn} />
            : <HeartOutlined style={{ fontSize: '20px'}} onClick={ClickLikeBtn} /> }
            <p>{notice}</p>
        </div>
    );
}

export default LikeButton;
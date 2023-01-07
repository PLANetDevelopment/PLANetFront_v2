import React, { useState } from 'react';

const CommentAdd = ({ comment, index, editCommentList }) => {
    const [editing, setEditing] = useState(true);
    const [editCommentValue, setEditCommentValue] = useState('');

    const editComment = (e) => {
        setEditCommentValue(e.target.value);
    };

    const onClickEdit = (e) => {
        setEditing(!editing);
    };

    const onSubmit = (index, editCommentValue) => (e) => {
        e.preventDefault();
        setEditing(true);
        editCommentList(index, editCommentValue);
    };
};

export default CommentAdd;
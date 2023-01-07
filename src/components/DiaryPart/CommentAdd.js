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

    const onClickDelete = (e) => {
        return e.target.parentElement.parentElement.parentElement.remove();
    }

    const onSubmit = (index, editCommentValue) => (e) => {
        e.preventDefault();
        setEditing(true);
        editCommentList(index, editCommentValue);
    };

    return (
    <>
    <div>
        <ul>
            <li>
                <div>
                    <span>{comment}</span>
                    {editing ? (
                        <div>
                            <button onClick={onClickEdit} type="button">
                                edit
                            </button>
                            <button onClick={onClickDelete} type="button">
                                x
                            </button>
                        </div>
                    ) : (
                        <div>
                            <input
                              placeholder={comment}
                              onChange={editComment}
                              value={editCommentValue}
                            />
                            <button onClick={onSubmit(index, editCommentValue)}>수정 완료</button>
                        </div>
                    )}
                </div>
            </li>
        </ul>
    </div>
    </>
    );
};

export default CommentAdd;
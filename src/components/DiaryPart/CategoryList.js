import React, { useState } from "react";
import CategoryFilter from './CategoryFilter.js';

const categories = [
    {
        name: "전체",
        value: "all"
    },
    {
        name: "나의 플랜잇",
        value: "planet"
    },
    {
        name: "나의 친환경 이야기",
        value: "story"
    },
    {
        name: "Q&A",
        value: "qna"
    },
    {
        name: "정보공유",
        value: "sharing"
    },
    {
        name: "공지",
        value: "notice"
    },
];

const CategoryList = () => {
    const [category, setCategory] = useState("all");

    return (
        <div>
            <CategoryFilter
              categories = {categories}
              category = {category}
              setCategory = {setCategory} />
        </div>
    )
}

export default CategoryList;

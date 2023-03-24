import React from 'react';
import { Input } from 'antd';
import { SearchBox } from './style';
import { useRouter } from 'next/router';

const { Search } = Input;

const SearchInput = () =>{
    const router = useRouter();

    const onSearch = (value)=>{
        router.push(`/hashtag/${value}`);
    };

    return (
        <SearchBox>
            <Search placeholder="해시태그 검색" className='search_input' enterButton onSearch={onSearch} />
        </SearchBox>
    )
}

export default SearchInput;
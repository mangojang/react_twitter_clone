import React from 'react';
import Link from 'next/link';
import Proptypes from 'prop-types';

const PostCardContent = ({postData}) => {
    return (
        <div>
            {
                postData.split(/(#[^\s]+)/g).map((v)=>{
                    if(v.match(/#[^\s]+/)){
                        return <Link href={{pathname:'/hashtag/[tag]',query:{tag:v.slice(1)}}} key={v} legacyBehavior><a>{v}</a></Link>
                    }else{
                        return v;
                    }
                })
            }
        </div>
    );
};

PostCardContent.Proptypes ={
    postData: Proptypes.string.isRequired,
}

export default PostCardContent;
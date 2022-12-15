import React from 'react';
import { Button, Card, Form, Input, Upload, Avatar } from 'antd';
import { RetweetOutlined, HeartOutlined, EllipsisOutlined, MessageOutlined } from '@ant-design/icons';

const { Meta } = Card;

const { TextArea } = Input;

const dummy = {
    isLoggenIn: true,
    imagePaths: [],
    mainPosts: [{
        User: {
            id:1,
            nickname:'mangojang',
        },
        content:'얄리얄리얄라리얄라',
        createdAt: new Date()
    }]
}

const imageUploadProps = {
    action: '//jsonplaceholder.typicode.com/posts/',
    listType: 'picture',
    previewFile(file) {
      console.log('Your upload file:', file);
      // Your process logic. Here we just mock to the same file
      return fetch('https://next.json-generator.com/api/json/get/4ytyBoLK8', {
        method: 'POST',
        body: file,
      })
        .then((res) => res.json())
        .then(({ thumbnail }) => thumbnail);
    },
  };

const Home = () => {
    return (
        <div style={{paddingTop:'20px'}}>
            {dummy.isLoggenIn &&
                <Form encType='multipart/form-data'>
                    <TextArea placeholder="어떤 일이 있으셨나요?" maxLength={140} />
                    <div style={{display:'flex', justifyContent: 'space-between', marginTop: '10px', marginBottom: '10px'}}>
                        <Upload {...imageUploadProps}>
                            <Button>이미지 업로드</Button>
                        </Upload>
                        <Button type='primary' htmlType='submit'>짹짹</Button>
                    </div>
                    {dummy.imagePaths.map((v,i)=>{
                        return(
                            <div key={v} style={{display:'inline-block'}}>
                                <img src={'http://localhost:3000/'+v} style={{width:'200px'}} alt={v}/>
                                <div>
                                    <Button>제거</Button>
                                </div>
                            </div>
                        )
                    })}
                </Form>
            }
            {dummy.mainPosts.map((v,i)=>{
                return(
                    <Card 
                        key={+v.createdAt}
                        cover={v.img && <img alt='example' src={v.img}/>}
                        actions={[
                            <RetweetOutlined key="retweet" />,
                            <HeartOutlined key="heart" />,
                            <MessageOutlined key="message" />,
                            <EllipsisOutlined key="ellipsis" />,
                        ]}
                        
                    >
                        <Meta
                        avatar={<Avatar>{v.User.nickname}</Avatar>}
                        title={v.User.nickname}
                        description={v.content}
                        />
                    </Card>  
                )
            })}
        </div>
    );
};

export default Home;
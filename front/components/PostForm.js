import React from 'react';
import { Button, Form, Upload, Input } from 'antd';

const { TextArea } = Input;

const dummy = {
    imagePaths: [],
}

const PostForm = () => {
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

    return (
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
    );
};

export default PostForm;
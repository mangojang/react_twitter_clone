import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row} from 'antd';
import Link from 'next/link';
import LoginForm from '../LoginForm';
import UserProfile from '../UserProfile';
import { LOAD_MYINFO_REQUEST, LOAD_USER_REQUEST } from '../../reducers/user';
import { Container, Gnb, HomeIcon, Logo, LogoIcon, ProfileIcon, SideBarLeft, SideBarRight } from './style';
import SearchInput from '../SearchInput';


const AppLayout = ({children}) => {
    const {isLoggedIn, mine} = useSelector(state => state.user);
    const dispatch = useDispatch();

    // useEffect(()=>{
    //    if(!mine){
    //        dispatch({
    //            type: LOAD_MYINFO_REQUEST
    //        })
    //    }
    // },[]);

    
    const items =[
        {
            label: (
                <Link href="/" legacyBehavior><a>홈</a></Link>
            ),
            key: 'home',
        },
        {
            label: (
                <Link href="/profile" legacyBehavior><a>프로필</a></Link>
            ),
            key: 'profile',
        },
    ]
    

    return (
        <div>
            <Row>
                <SideBarLeft xs={3} sm={3} md={4} xl={6}>
                    <div>
                        <Logo><Link href="/" legacyBehavior><a><LogoIcon/></a></Link></Logo>
                        <Gnb>
                            <li><Link href="/"><div className='hover_area'><div className='gnb_icon'><HomeIcon /></div><div className='gnb_title'>홈</div></div></Link></li>
                            {mine?<li><Link href="/profile"><div className='hover_area'><div className='gnb_icon'><ProfileIcon /></div><div className='gnb_title'>프로필</div></div></Link></li> : null }
                            {mine? <li><UserProfile/></li> : null}
                        </Gnb>
                    </div>
                </SideBarLeft>
                <Col xs={21} sm={21} md={20} xl={18}>
                    <Container>
                        <div className='contents'>{children}</div>
                        <SideBarRight className='sidebar_right'>
                            <div>
                                {mine? <SearchInput/> : <LoginForm/>}
                                <p className='cmt'>본 사이트는 개인 포트폴리오용 사이트 입니다.</p>
                            </div>
                        </SideBarRight>
                    </Container>
                </Col>
            </Row>
        </div>
    );
};

export default AppLayout;
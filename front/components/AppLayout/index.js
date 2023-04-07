import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Row} from 'antd';
import Link from 'next/link';
import LoginForm from '../LoginForm';
import UserProfile from '../UserProfile';
import { Container, Gnb, HomeIcon, Logo, LogoIcon, ProfileIcon, SideBarLeft, SideBarRight } from './style';
import SearchInput from '../SearchInput';


const AppLayout = ({children}) => {
    const {mine} = useSelector(state => state.user);
   
    return (
        <div>
            <Row>
                <SideBarLeft xs={4} sm={3} md={4} xl={6}>
                    <div>
                        <Logo><Link href="/" legacyBehavior><a><LogoIcon/></a></Link></Logo>
                        <Gnb>
                            <li><Link href="/"><div className='hover_area'><div className='gnb_icon'><HomeIcon /></div><div className='gnb_title'>홈</div></div></Link></li>
                            {mine?<li><Link href="/profile"><div className='hover_area'><div className='gnb_icon'><ProfileIcon /></div><div className='gnb_title'>프로필</div></div></Link></li> : null }
                            {mine? <li><UserProfile/></li> : null}
                        </Gnb>
                    </div>
                </SideBarLeft>
                <Col xs={20} sm={21} md={20} xl={18}>
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
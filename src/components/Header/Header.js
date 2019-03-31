import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledNavigation = styled.nav`
	position: absolute;
	top: 25px;
	left: 50px;
	z-index: 20000000;
	text-align: left;
`;

const Title = styled.h1`
	font-size: 52px;
`;

const StyledLink = styled(Link)`
	text-decoration: none;
    font-size: 52px;
    color: #000000;
`;

const LowMenu = styled.a`
    font-size: 24px;
    color: #000000;
`;

const Header = () => {
    return (
        <StyledNavigation>
            <StyledLink to='/'>
                <u>MyKošice</u>
            </StyledLink>
            <p/>
            <LowMenu to='/user'>
                <u>user page</u>
            </LowMenu>
        </StyledNavigation>
    );
};

export default Header;

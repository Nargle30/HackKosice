import React, { useState } from 'react';
import styled from 'styled-components';

import Blind from './Blind/Blind';

const StyledPanel = styled.aside`
	box-sizing: border-box;
	position: absolute;
	transform: ${props => (props.isOpen ? 'translateX(0)' : 'translateX(calc(100%))')};
	transition: all 0.25s linear;
	z-index: 10;
	width: 30%;
	min-width: 350px;
	height: 100vh;
	right: 0;
	padding: 25px;
	background-color: #ccce;

	@media (max-width: ${`1000px`}) {
		left: ${props => (props.isOpen ? '0' : '25px')};
		bottom: 0;
		font-size: 0.9rem;
		min-width: 300px;
		border-bottom-right-radius: 0;
		border-bottom-left-radius: 0;
		width: 100%;
	}
`;

const ControlPanel = () => {
	const [isOpenMenu, setIsOpenMenu] = useState(false);

	const handleBlindClick = () => {
		setIsOpenMenu(!isOpenMenu);
	};

	return (
		<StyledPanel isOpen={isOpenMenu}>
			<Blind handleBlindClick={handleBlindClick} isOpen={isOpenMenu} />
			{/*{store.userId ? <Points store={store} /> : <Profile store={store} />}*/}
		</StyledPanel>
	);
}

export default ControlPanel;

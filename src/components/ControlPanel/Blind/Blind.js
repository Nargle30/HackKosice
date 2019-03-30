import React from 'react';
import styled from 'styled-components';

const StyledBlind = styled.span`
	width: 30px;
	height: 50px;
	background-color: #ccce;
	position: absolute;
	z-index: 10;
	top: calc(50% - 25px);
	left: -30px;

	@media (max-width: ${`500px`}) {
		left: ${props => (props.isOpen ? '0' : '-25px')};
		top: 75%;
		background-color: #aaae;
	}
`;

const Arrow = styled.img`
	width: 80%;
	height: 100%;
	transform: ${props => (props.isOpen ? 'rotate(-90deg)' : 'rotate(90deg)')};
`;

const Blind = props => {
	const { isOpen, handleBlindClick } = props;
	return (
		<StyledBlind isOpen={isOpen} onClick={handleBlindClick}>
			<Arrow isOpen={isOpen} src='arrow.svg' />
		</StyledBlind>
	);
};

export default Blind;

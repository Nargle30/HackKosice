import React, { useState } from 'react';
import styled from 'styled-components';

import Blind from './Blind/Blind';
import Topic from "../Topic/Topic";
import {connect} from "react-redux";
import Chat from "../Chat/Chat";

const StyledPanel = styled.aside`
	box-sizing: border-box;
	position: absolute;
	transform: ${props => (props.isOpen ? 'translateX(0)' : 'translateX(calc(100%))')};
	transition: all 0.25s linear;
	z-index: 100000;
	width: 30%;
	min-width: 350px;
	height: 100vh;
	right: 0;
	padding: 25px;
	background-color: #ccce;

	@media (max-width: ${`500px`}) {
		width: 100%;
	}
`;

const ControlPanel = ({topicData}) => {
	const [isOpenMenu, setIsOpenMenu] = useState(false);

	const handleBlindClick = () => {
		setIsOpenMenu(!isOpenMenu);
	};

	return (
		<StyledPanel isOpen={isOpenMenu}>
			<Blind handleBlindClick={handleBlindClick} isOpen={isOpenMenu} />
			{topicData ? <Chat /> :  <Topic />}
		</StyledPanel>
	);
}

const mapStateToProps = state => ({
	topicData: state.topic.data,
})

export default connect(mapStateToProps)(ControlPanel);

import React, { Component } from 'react';
import 'react-leaflet-markercluster/dist/styles.min.css';
import styled from 'styled-components';
import {connect} from "react-redux";

import './UserPage.css';
import {getUserInfo, selectUserIssues, selectMessages} from '../../helpers/firebase'

const UserPageLayout = styled.div`
	position: relative;
	background-color: #fff;
	padding: 50px;
	box-sizing: border-box;
	
	h1 {
		font-family: 'IBMPlexSans-Medium';
	}
`;

const UserBio = styled.div`
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: flex-start;
	margin-bottom: 20px;
	padding-left: 30px;
	box-sizing: border-box;

	img {
		border-radius: 50%;
		width: 60px;
		height: 60px;
		margin-right: 10px;
	}
`;

class UserPage extends Component {
	state = {
		topics: [],
		userId: 'HSp4BL6almcFwelsV5u9',
		info: {}
	};

	componentDidMount(){
		const {userId} = this.state;
		getUserInfo(userId).then(res => this.setState({info: res}))
		selectUserIssues(userId).then(res => this.setState({topics: res}));
	}

	showDialog = dialogId => {
		const {setDialogId, setStatus} = this.props;
		setStatus(true);
		setDialogId(dialogId);
		//this.props.setStatus()
	};

	renderCard = (item, ind) => {
		const date = new Date(null);
		date.setSeconds(item.date.seconds); // specify value for SECONDS here
		return (
			<div className="uk-card uk-card-default uk-width-1-2@m" key={ind}>
				<div className="uk-card-header">
					<div className="uk-grid-small uk-flex-middle uk-grid">
						<div className="uk-width-auto">
						</div>
						<div className="uk-width-expand">
							<h3 className="uk-card-title uk-margin-remove-bottom">{item.title}</h3>
							<p className="uk-text-meta uk-margin-remove-top">
								<time>{date.toLocaleDateString()}</time>
							</p>
						</div>
					</div>
				</div>
				<div className="uk-card-body">
					<p>{item.issue}</p>
				</div>
				<div className="uk-card-footer">
					<a className="uk-button uk-button-text" onClick={() => this.showDialog(item.dialog_id)}>View dialog</a>
				</div>
			</div>
		);
	};

	render() {
		const {topics, info} = this.state;
		return (
			<UserPageLayout>
				<h1>My Kosice</h1>
				<UserBio>
					<img src={info.url} />
					<p>{info.name}</p>
				</UserBio>
				{topics.map((topic, ind) => this.renderCard(topic, ind))}
			</UserPageLayout>
		)
	}
}

const mapDispatchToProps = dispatch => ({
	setStatus: data => dispatch.menu.setStatus(data),
	setDialogId: data => dispatch.menu.setDialogId(data),
});

export default connect(null, mapDispatchToProps)(UserPage);
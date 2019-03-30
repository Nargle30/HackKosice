import React, { Component } from 'react';
import 'react-leaflet-markercluster/dist/styles.min.css';
import styled from 'styled-components';

import './UserPage.css';

const texts = [
	{
		title: 'Problem',
		time: '2019-03-30T19:00',
		info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.'
	},
	{
		title: 'Problem',
		time: '2019-03-30T19:00',
		info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.'
	},
	{
		title: 'Problem',
		time: '2019-03-30T19:00',
		info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.'
	}
];

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

export class UserPage extends Component {
	showDialog = () => {

	};

	renderCard = item => {
		return (
			<div className="uk-card uk-card-default uk-width-1-2@m">
				<div className="uk-card-header">
					<div className="uk-grid-small uk-flex-middle uk-grid">
						<div className="uk-width-auto">
						</div>
						<div className="uk-width-expand">
							<h3 className="uk-card-title uk-margin-remove-bottom">{item.title}</h3>
							<p className="uk-text-meta uk-margin-remove-top">
								<time>{item.time}</time>
							</p>
						</div>
					</div>
				</div>
				<div className="uk-card-body">
					<p>{item.info}</p>
				</div>
				<div className="uk-card-footer">
					<a className="uk-button uk-button-text" onClick={this.showDialog()}>View dialog</a>
				</div>
			</div>
		);
	};

	render() {
		return (
			<UserPageLayout>
				<h1>My Kosice</h1>
				<UserBio>
					<img src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/09/12/11/naturo-monkey-selfie.jpg?w968h681" />
					<p>John Smith</p>
				</UserBio>
				{texts.map(val => this.renderCard(val))}
			</UserPageLayout>
		)
	}
}

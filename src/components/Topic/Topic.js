import React from 'react';
import get from 'lodash/get';
import {connect} from "react-redux";
import styled from 'styled-components';

import {getUserInfo, insertDialog} from "../../helpers/firebase";

const Error = styled.p`
    color: #bf3e3e;
`;
const Topic = ({setTopic, setCategory, isChatEnabled}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const title = get(e, 'target.title.value', '');
        const category = get(e, 'target.category.value', '');
        const issue = get(e, 'target.issue.value', '');
        getUserInfo('HSp4BL6almcFwelsV5u9').then(user => {
            insertDialog({
                title: title,
                creator_name: user.name,
                creator_logo: user.url,
                date: Date.now(),
                creator_type: "user",

                messages: [
                    {
                        text: issue,
                        time: Date.now(),
                        type: "text",
                        user_name: user.name,
                        user_logo: user.url,
                    }
                ]

            })
        });

        ;
        setTopic({title,category,issue});
    };

	const hangleSelect = e => {
		e.preventDefault();
		setCategory(e.target.value);
	};

    return (
        <form onSubmit={handleSubmit}>
            <fieldset className='uk-fieldset'>

                <legend className='uk-legend'>Your topic</legend>

                <div className="uk-margin">
                    <input className="uk-input uk-form-large uk-width-1-1" name='title' type="text" placeholder='Title' />
                </div>
                <div className='uk-margin'>
                    <select className='uk-select uk-form-large' style={{color: 'grey'}} name='category' onChange={val => hangleSelect(val)}>
                        <option value="" selected disabled hidden>Choose category...</option>
                        <option>Sport</option>
                        <option>Nature</option>
                        <option>Entertainment</option>
                        <option>Children</option>
                        <option>Problem</option>
						<option>Announce</option>
						<option>Idea</option>
                    </select>
                </div>

                <div className='uk-margin'>
                    <textarea className='uk-textarea uk-form-large' name='issue' rows='5' placeholder='Issue'></textarea>
                </div>
                {!isChatEnabled ? <Error>Choose category and put marker</Error> : ''}
                
                <div className='uk-margin'>
                    <input type='submit' value='Create topic' className="uk-button uk-button-primary uk-button-large uk-width-1-1" style={{backgroundColor: isChatEnabled ? 'rgb(0, 68, 139)' : '#7e7e7e'}} />
                </div>
                
            </fieldset>
        </form>
    );
}

const mapStateToProps = state => ({
	isChatEnabled: state.topic.isChatEnabled,
});

const mapDispatchToProps = dispatch => ({
	setTopic: data => dispatch.topic.setTopic(data),
	setCategory: data => dispatch.topic.setCategory(data),
});

export default connect(mapStateToProps, mapDispatchToProps)(Topic);
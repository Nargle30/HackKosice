import React from 'react';
import get from 'lodash/get';
import {connect} from "react-redux";

const Topic = ({setTopic, setCategory}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const title = get(e, 'target.title.value', '');
        const category = get(e, 'target.category.value', '');
        const issue = get(e, 'target.issue.value', '');
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
                
                <div className='uk-margin'>
                    <input type='submit' value='Create topic' className="uk-button uk-button-primary uk-button-large uk-width-1-1" style={{backgroundColor: 'rgb(0, 68, 139)'}} />
                </div>
                
            </fieldset>
        </form>
    );
}

const mapStateToProps = state => {

};

const mapDispatchToProps = dispatch => ({
	setTopic: data => dispatch.topic.setTopic(data),
	setCategory: data => dispatch.topic.setCategory(data),
});

export default connect(null, mapDispatchToProps)(Topic);
import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display:  flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 50px);
`;

const Title = styled.h3`
    display: inline-block;
    width: 100%;
`;

const Textarea = styled.textarea`
    display: inline-block;
    width: calc(100% - 2px);
    height: 200px;
    font-size: 28px;
    border: 1px solid #d00;
    background-color: white;
    resize: none;
    &::placeholder {
      color: #d00;
    }
`;

const TopicName = styled.input`
    display: inline-block;
    width: 100%;
    height: 50px;
    font-size: 28px;
    border: 1px solid #d00;
    background-color: white;
    &::placeholder {
      color: #d00;
    }
`;

const TopicCategory = styled.select`
    display: inline-block;
    width: calc(100% + 4px);
    height: 50px;
    font-size: 28px;
    border-radius: 0;
    -webkit-appearance: none;
    border: 1px solid #d00;
    background-color: white;
    color: #d00;
`;

const TopicSubmit = styled.input`
    display: inline-block;
    height: 50px;
    width: calc(100% + 4px);
    border: 1px solid #d00;
    background-color: white;
    font-size: 28px;
`;


const Topic = () => {
    return (
        <form>
            <fieldset className='uk-fieldset'>

                <legend className='uk-legend'>Your topic</legend>

                <div className="uk-margin">
                        <input className="uk-input uk-form-large uk-width-1-1" type="text" placeholder='Name' />
                </div>

                <div className='uk-margin'>
                    <select className='uk-select uk-form-large' style={{color: 'grey'}}>
                        <option value="" selected disabled hidden>Choose category...</option>
                        <option>Спорт</option>
                        <option>Природа</option>
                        <option>Развлечения</option>
                        <option>Дети</option>
                        <option>Проблема</option>
                        <option>Идея</option>
                    </select>
                </div>

                <div className='uk-margin'>
                    <textarea className='uk-textarea uk-form-large' rows='5' placeholder='Issue'></textarea>
                </div>
                
                <div className='uk-margin'>
                    <input type='submit' value='Create topic' className="uk-button uk-button-primary uk-button-large uk-width-1-1" />
                </div>
                
            </fieldset>
        </form>
    );
}

export default Topic;
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {connect} from "react-redux";
import format from 'date-fns/format'
import get from 'lodash/get';

import {
    ThemeProvider,
    AddIcon,
    EmojiIcon, IconButton,
    Message,
    MessageGroup,
    MessageList,
    MessageText, Row, SendButton,
    TextComposer, TextInput,
    defaultTheme, Bubble
} from "@livechat/ui-kit";
import {getUserInfo, selectMessages} from "../../helpers/firebase";

const customTheme = {
        ...defaultTheme,
        vars: {
            'primary-color': 'rgb(0, 68, 139)',
            'secondary-color': '#fbfbfb',
            'tertiary-color': 'white'
        },
        Message: {
            ...defaultTheme.Message,
            own: {
                ...defaultTheme.Message.own,
                Bubble: {
                    css: {
                        backgroundColor: 'var(--primary-color)',
                        color: 'white'
                    }
                },
            },
        },
}

const images = {
    sport: "https://firebasestorage.googleapis.com/v0/b/mykosice-bb2ed.appspot.com/o/sport.svg?alt=media&token=79b92d71-e8d4-4860-bc56-fd4ecbc3b263",
    nature: "https://firebasestorage.googleapis.com/v0/b/mykosice-bb2ed.appspot.com/o/nature.svg?alt=media&token=57d724c1-4769-4787-986d-54c1b8cbb252",
    entertainment: "https://firebasestorage.googleapis.com/v0/b/mykosice-bb2ed.appspot.com/o/entertainment.svg?alt=media&token=a862e908-bcc7-4f3c-a67b-04bc8557cba8",
    children: "https://firebasestorage.googleapis.com/v0/b/mykosice-bb2ed.appspot.com/o/children.svg?alt=media&token=b66a1525-b50d-45ce-8eb8-af1854edc39b",
    problem: "https://firebasestorage.googleapis.com/v0/b/mykosice-bb2ed.appspot.com/o/problem.svg?alt=media&token=38eec819-1f44-4a91-98cf-946abb64c871",
    announce: "https://firebasestorage.googleapis.com/v0/b/mykosice-bb2ed.appspot.com/o/announce.svg?alt=media&token=17f03c8e-3d8d-410e-bee1-c24818393644",
    idea: "https://firebasestorage.googleapis.com/v0/b/mykosice-bb2ed.appspot.com/o/idea.svg?alt=media&token=68f5a24e-d395-46bc-9eaa-850795bdcbc1"
};

const Avatar = styled.img`
  position: absolute;
  top: 20px;
  left: ${props => props.isOwn ? 'calc(100% - 20px)' : '0'};
  height: 20px;
  width: 20px;
  border-radius: 100%;
`;

const Msg = styled.div`
  position: relative;
`;

const Chat = ({topicData, dialogId}) => {
    const [userInfo, setUserInfo] = useState({});
    const [dialogInfo, setDialogInfo] = useState({});

    useEffect(() => {
        dialogId ? selectMessages(dialogId).then(res => setDialogInfo(res))
            : getUserInfo('HSp4BL6almcFwelsV5u9').then(res => setUserInfo(res));
    }, [topicData, dialogId]);

    return (
        <ThemeProvider theme={customTheme}>
            <span className='uk-legend uk-margin'>
                <img style={{height: '30px'}} src={dialogInfo.category ? images[dialogInfo.category] : images[topicData.category]} />
                {' '}
                {dialogInfo.title ? dialogInfo.title : topicData.title}
            </span>
            <div className="uk-margin">
            </div>
            <div style={{ width: '100%', height: 'calc(100vh - 200px)'}}>
                { dialogInfo.messages ?
                    <MessageList>
                        <MessageGroup>
                            {
                                dialogInfo.messages.map((msg) => (
                                    <Msg>
                                        <Avatar isOwn={msg.owner} src={msg.user_logo} />
                                        <Message date={format(msg.time.seconds * 1000, 'HH:mm MM/DD')} isOwn={msg.owner} authorName={msg.user_name}>
                                            <Bubble isOwn={msg.owner} radiusType='last' style={{borderRadius: '5px'}}>
                                                <MessageText>
                                                    {msg.text}
                                                </MessageText>
                                            </Bubble>
                                        </Message>
                                    </Msg>
                                ))
                            }
                        </MessageGroup>
                    </MessageList>
                    :
                    <MessageList>
                        <MessageGroup>
                            <Message date={format(Date.now(), 'HH:mm')} isOwn={true} authorName={userInfo.name}>
                                <Bubble isOwn={true} radiusType='last' style={{borderRadius: '5px'}}>
                                    <MessageText>
                                        {topicData.issue}
                                    </MessageText>
                                </Bubble>
                            </Message>
                            <Message date="21:38" isOwn={false} authorName="Helper">
                                <Bubble isOwn={false} style={{borderRadius: '5px'}}>
                                    <MessageText>
                                        Hello, wait a minute please.
                                    </MessageText>
                                </Bubble>
                            </Message>
                        </MessageGroup>
                    </MessageList>
                }
                <TextComposer defaultValue="">
                    <Row align="center">
                        <IconButton fit>
                            <AddIcon />
                        </IconButton>
                        <TextInput fill />
                        <SendButton fit />
                    </Row>

                    <Row verticalAlign="center" justify="right">
                        <IconButton fit>
                            <EmojiIcon />
                        </IconButton>
                    </Row>
                </TextComposer>
            </div>
        </ThemeProvider>
    )
};

const mapStateToProps = state => ({
    topicData: get(state, 'topic.data', {}),
    dialogId: state.menu.dialogId,
});

export default connect(mapStateToProps)(Chat);
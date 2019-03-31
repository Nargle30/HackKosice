import React, {useState, useEffect} from 'react';
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

const Chat = ({topicData, dialogId}) => {
    const [userInfo, setUserInfo] = useState({});
    const [dialogInfo, setDialogInfo] = useState({});

    useEffect(() => {
        dialogId ? selectMessages(dialogId).then(res => setDialogInfo(res))
            : getUserInfo('HSp4BL6almcFwelsV5u9').then(res => setUserInfo(res));
    }, [topicData, dialogId]);

    return (
        <ThemeProvider theme={customTheme}>
            <span className='uk-legend'>
                {dialogInfo ? dialogInfo.title : topicData.title}
            </span>
            <div className="uk-margin">
                {dialogInfo ? dialogInfo.category : topicData.category}
            </div>
            <div style={{ width: '100%', height: 'calc(100vh - 250px)'}}>
                { dialogInfo ?
                    <MessageList>
                        <MessageGroup>
                            {
                                dialogInfo.messages && dialogInfo.messages.map((msg, i) => (
                                    <Message date={format(msg.time.seconds * 1000, 'HH:mm MM/DD')} isOwn={msg.owner} authorName={msg.user_name}>
                                        <Bubble isOwn={msg.owner} radiusType='last' style={{borderRadius: '5px'}}>
                                            <MessageText>
                                                {msg.text}
                                            </MessageText>
                                        </Bubble>
                                    </Message>
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
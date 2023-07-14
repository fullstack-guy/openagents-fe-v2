// ChatToolbar.js
import React from 'react';
import {IconRecycle} from '@tabler/icons';
import {Button, Box} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {resetFeedMessages, addFeedMessage} from 'src/store/ChatSlice';
import {handleSupabaseError, supabase} from "../../supabase/supabase";
import axiosServices from "../../utils/axios";
import {hasError} from "../../store/AgentSourcesSlice";
import {showNotification} from "../../store/NotificationSlice";

const ChatToolbar = ({selectedFeed, session_id, setIsLoading}) => {
    const dispatch = useDispatch();
    const suggested_questions = ['Suggestion 1', 'Suggestion 2', 'Suggestion 3'];
    const feed_messages = useSelector((state) => state.chatReducer.messages);

    const onResetClick = async (e) => {
        if (feed_messages.length > 0 && e.target.tagName.toLowerCase() === "button" && e.target.textContent.trim() === "Reset") {
            dispatch(resetFeedMessages())
            try {
                const response = await supabase
                    .from('feed_chat_messages')
                    .delete()
                    .eq('session_id', session_id);
                handleSupabaseError(dispatch, response);
                if (response.error) {
                    // Handle the error if necessary
                }
            } catch (err) {
                // Handle the error if necessary
            }
        }
    };


    const handleSuggestedQuestionClick = async (e) => {
        const suggestion = e.target.innerText;
        setIsLoading(true);
        try {
            const response = await supabase
                .from('feed_chat_messages')
                .insert([
                    {
                        session_id: session_id,
                        message: suggestion,
                        sender: 'user',
                    },
                ])
                .select();
            handleSupabaseError(dispatch, response);
            if (response.data) {
                dispatch(addFeedMessage(response.data[0]));
            }
        } catch (err) {
            throw new Error(err);
        }

        try {
            const response = await axiosServices.post(`/chat`, {
                session_id: session_id,
                feed_id: selectedFeed.id,
                message: suggestion,
                related_news: selectedFeed.news,
            });
            dispatch(addFeedMessage(response.data.data));
        } catch (error) {
            dispatch(showNotification({
                severity: 'error',
                title: 'Fail',
                message: error.response.data.message,
            }));
            dispatch(hasError(error));
        }
        setIsLoading(false);
    };


    return (
        <>
            {feed_messages.length === 0 && selectedFeed.id && (
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
                        {suggested_questions.map((question, index) => (
                            <Button
                                key={index}
                                variant="outlined"
                                size="small"
                                onClick={handleSuggestedQuestionClick}
                            >
                                {question}
                            </Button>
                        ))}
                    </Box>
                    <Button onClick={onResetClick} color="primary" variant="outlined" size="small">
                        <IconRecycle/> Reset
                    </Button>
                </Box>
            )}
        </>
    );
};
export default ChatToolbar;

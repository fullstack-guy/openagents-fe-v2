import React, {useEffect} from 'react';
import {List} from '@mui/material';
import {useSelector, useDispatch} from 'react-redux';
import {
    selectAgent,
} from 'src/store/AgentSlice';
import {GET_AGENTS} from "src/services/AgentsService"
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import AgentListItem from './AgentListItem';
import AgentAdd from '../AgentAdd';
import {GET_KNOWLEDGE_SOURCES} from "../../../services/KnowledgeSourcesService";
import {supabase} from "src/supabase/supabase";


const AgentList = ({showrightSidebar}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GET_AGENTS(supabase, dispatch));
    }, [dispatch]);


    const agents = useSelector((state) => state.agentsReducer.agents);

    const selected_agent_id = useSelector((state) => state.agentsReducer.selected_agent_id);

    const handleClicked = (id) => {
        dispatch(selectAgent(id));
        showrightSidebar();
    };

    return (
        <>
            <AgentAdd/>
            <List>
                <Scrollbar sx={{height: {lg: 'calc(100vh - 100px)', md: '100vh'}, maxHeight: '800px'}}>
                    {agents.map((agent) => (
                        <AgentListItem
                            key={agent.id}
                            active={agent.id === selected_agent_id}
                            onContactClick={() => handleClicked(agent.id)}
                            agent={ agent}
                        />
                    ))}
                </Scrollbar>
            </List>
        </>
    );
};

export default AgentList;

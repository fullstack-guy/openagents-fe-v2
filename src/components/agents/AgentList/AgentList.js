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

const AgentList = ({showrightSidebar}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GET_AGENTS());
    }, [dispatch]);

    const getVisibleContacts = (agents, filter, agentSearch) => {
        switch (filter) {
            case 'show_all':
                return agents.filter(
                    (a) => !a.deleted && a.configs.name.toLocaleLowerCase().includes(agentSearch),
                );

            case 'frequent_agent':
                return agents.filter(
                    (a) =>
                        !a.deleted &&
                        a.frequentlyagented &&
                        a.configs.name.toLocaleLowerCase().includes(agentSearch),
                );

            case 'starred_agent':
                return agents.filter(
                    (a) => !a.deleted && a.starred && a.configs.name.toLocaleLowerCase().includes(agentSearch),
                );

            case 'engineering_department':
                return agents.filter(
                    (a) =>
                        !a.deleted &&
                        a.department === 'Engineering' &&
                        a.configs.name.toLocaleLowerCase().includes(agentSearch),
                );

            case 'support_department':
                return agents.filter(
                    (a) =>
                        !a.deleted &&
                        a.department === 'Support' &&
                        a.configs.name.toLocaleLowerCase().includes(agentSearch),
                );

            case 'sales_department':
                return agents.filter(
                    (a) =>
                        !a.deleted &&
                        a.department === 'Sales' &&
                        a.configs.name.toLocaleLowerCase().includes(agentSearch),
                );

            default:
                throw new Error(`Unknown filter: ${filter}`);
        }
    };


    const agents = useSelector((state) =>
        getVisibleContacts(
            state.agentsReducer.agents,
            state.agentsReducer.currentAgentFilter,
            state.agentsReducer.agentSearch,
        ),
    );

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
                            {...agent}
                        />
                    ))}
                </Scrollbar>
            </List>
        </>
    );
};

export default AgentList;

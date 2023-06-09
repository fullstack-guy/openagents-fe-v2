import React, {useEffect} from 'react';
import {List} from '@mui/material';
import {useSelector, useDispatch} from 'react-redux';
import {
    selectAgent,
    fetchAgents,
    deleteAgent,
} from 'src/store/AgentSlice';

import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import AgentListItem from './AgentListItem';
import AgentAdd from './AgentAdd';

const AgentList = ({showrightSidebar}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAgents());
    }, [dispatch]);

    const getVisibleContacts = (agents, filter, agentSearch) => {
        switch (filter) {
            case 'show_all':
                return agents.filter(
                    (a) => !a.deleted && a.agent_configs.name.toLocaleLowerCase().includes(agentSearch),
                );

            case 'frequent_agent':
                return agents.filter(
                    (a) =>
                        !a.deleted &&
                        a.frequentlyagented &&
                        a.agent_configs.name.toLocaleLowerCase().includes(agentSearch),
                );

            case 'starred_agent':
                return agents.filter(
                    (a) => !a.deleted && a.starred && a.agent_configs.name.toLocaleLowerCase().includes(agentSearch),
                );

            case 'engineering_department':
                return agents.filter(
                    (a) =>
                        !a.deleted &&
                        a.department === 'Engineering' &&
                        a.agent_configs.name.toLocaleLowerCase().includes(agentSearch),
                );

            case 'support_department':
                return agents.filter(
                    (a) =>
                        !a.deleted &&
                        a.department === 'Support' &&
                        a.agent_configs.name.toLocaleLowerCase().includes(agentSearch),
                );

            case 'sales_department':
                return agents.filter(
                    (a) =>
                        !a.deleted &&
                        a.department === 'Sales' &&
                        a.agent_configs.name.toLocaleLowerCase().includes(agentSearch),
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

    const active = useSelector((state) => state.agentsReducer.agentData);

    return (
        <>
            <AgentAdd/>
            <List>
                <Scrollbar sx={{height: {lg: 'calc(100vh - 100px)', md: '100vh'}, maxHeight: '800px'}}>
                    {agents.map((agent) => (
                        <AgentListItem
                            key={agent.id}
                            active={agent.id === active}
                            {...agent}
                            onContactClick={() => {
                                dispatch(selectAgent(agent.id));
                                showrightSidebar();
                            }}
                            onDeleteClick={() => dispatch(deleteAgent(agent.id))}
                        />
                    ))}
                </Scrollbar>
            </List>
        </>
    );
};

export default AgentList;

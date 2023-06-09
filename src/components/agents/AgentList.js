import React, { useEffect } from 'react';
import { List } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectAgent,
  fetchAgents,
  deleteAgent,
} from 'src/store/AgentSlice';

import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import AgentListItem from './AgentListItem';

const AgentList = ({ showrightSidebar }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAgents());
  }, [dispatch]);

  const getVisibleContacts = (contacts, filter, agentSearch) => {
    switch (filter) {
      case 'show_all':
        return contacts.filter(
          (c) => !c.deleted && c.name.toLocaleLowerCase().includes(agentSearch),
        );

      case 'frequent_contact':
        return contacts.filter(
          (c) =>
            !c.deleted &&
            c.frequentlycontacted &&
            c.name.toLocaleLowerCase().includes(agentSearch),
        );

      case 'starred_contact':
        return contacts.filter(
          (c) => !c.deleted && c.starred && c.name.toLocaleLowerCase().includes(agentSearch),
        );

      case 'engineering_department':
        return contacts.filter(
          (c) =>
            !c.deleted &&
            c.department === 'Engineering' &&
            c.name.toLocaleLowerCase().includes(agentSearch),
        );

      case 'support_department':
        return contacts.filter(
          (c) =>
            !c.deleted &&
            c.department === 'Support' &&
            c.name.toLocaleLowerCase().includes(agentSearch),
        );

      case 'sales_department':
        return contacts.filter(
          (c) =>
            !c.deleted &&
            c.department === 'Sales' &&
            c.name.toLocaleLowerCase().includes(agentSearch),
        );

      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  };


  const contacts = useSelector((state) =>
    getVisibleContacts(
      state.agentsReducer.agents,
      state.agentsReducer.currentAgentFilter,
      state.agentsReducer.agentSearch,
    ),
  );

  const active = useSelector((state) => state.agentsReducer.agentData);

  return (
    <List>
      <Scrollbar sx={{ height: { lg: 'calc(100vh - 100px)', md: '100vh' }, maxHeight: '800px' }}>
        {contacts.map((contact) => (
          <AgentListItem
            key={contact.id}
            active={contact.id === active}
            {...contact}
            onContactClick={() => {
              dispatch(selectAgent(contact.id));
              showrightSidebar();
            }}
            onDeleteClick={() => dispatch(deleteAgent(contact.id))}
          />
        ))}
      </Scrollbar>
    </List>
  );
};

export default AgentList;

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

  const getVisibleContacts = (contacts, filter, contactSearch) => {
    switch (filter) {
      case 'show_all':
        return contacts.filter(
          (c) => !c.deleted && c.firstname.toLocaleLowerCase().includes(contactSearch),
        );

      case 'frequent_contact':
        return contacts.filter(
          (c) =>
            !c.deleted &&
            c.frequentlycontacted &&
            c.firstname.toLocaleLowerCase().includes(contactSearch),
        );

      case 'starred_contact':
        return contacts.filter(
          (c) => !c.deleted && c.starred && c.firstname.toLocaleLowerCase().includes(contactSearch),
        );

      case 'engineering_department':
        return contacts.filter(
          (c) =>
            !c.deleted &&
            c.department === 'Engineering' &&
            c.firstname.toLocaleLowerCase().includes(contactSearch),
        );

      case 'support_department':
        return contacts.filter(
          (c) =>
            !c.deleted &&
            c.department === 'Support' &&
            c.firstname.toLocaleLowerCase().includes(contactSearch),
        );

      case 'sales_department':
        return contacts.filter(
          (c) =>
            !c.deleted &&
            c.department === 'Sales' &&
            c.firstname.toLocaleLowerCase().includes(contactSearch),
        );

      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  };
  const contacts = useSelector((state) =>
    getVisibleContacts(
      state.agentsReducer.contacts,
      state.agentsReducer.currentAgentFilter,
      state.agentsReducer.contactSearch,
    ),
  );

  const active = useSelector((state) => state.agentsReducer.contactContent);

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
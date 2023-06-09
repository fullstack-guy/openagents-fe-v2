import axios from 'src/utils/axios';
import {createSlice} from '@reduxjs/toolkit';
import user2 from "../assets/images/profile/user-2.jpg";
import user3 from "../assets/images/profile/user-3.jpg";

const API_URL = '/api/data/agents/ContactsData';

const initialState = {
    agents: [],
    selectedAgentId: 1,
    agentSearch: '',
    isAgentEditable: false,
    currentAgentFilter: 'show_all',
};

export const AgentSlice = createSlice({
    name: 'agents',
    initialState,
    reducers: {
        getAgents: (state, action) => {
            state.agents = action.payload;
        },
        searchAgent: (state, action) => {
            state.agentSearch = action.payload;
        },
        selectAgent: (state, action) => {
            state.selectedAgentId = action.payload;
        },
        deleteAgent: (state, action) => {
            const index = state.agents.findIndex((contact) => contact.id === action.payload);
            state.agents.splice(index, 1);
        },

        setAgentEditable: (state) => {
            state.isAgentEditable = !state.isAgentEditable;
        },
        setVisibilityFilter: (state, action) => {
            state.currentAgentFilter = action.payload;
        },
        updateAgent: {
            reducer: (state, action) => {
                state.agents = state.agents.map((contact) =>
                    contact.id === action.payload.id
                        ? {...contact, [action.payload.field]: action.payload.value}
                        : contact,
                );
            },
            prepare: (id, field, value) => {
                return {
                    payload: {id, field, value},
                };
            },
        },
    },
});

// Selector to get the selected agent's data
export const {
    
    getAgents,
    searchAgent,
    setAgentEditable,
    selectAgent,
    deleteAgent,
    updateAgent,
    setVisibilityFilter,
} = AgentSlice.actions;


export const fetchAgents = () => async (dispatch) => {
    try {
        dispatch(getAgents([{
            "id": 1,
            "image": user2,
            "department": "Engineering",
            "agent_template_id": 1,
            "role": "Website support",
            "status": "enabled",
            "name": "Othmane website support",
            "agent_configs": {
                "website_name": "Othmane Zoheir personal website",
                "brand_voice": "professional, friendly, and passionate",
                "contact_info": "Email: support@devco.com, Phone: 123-456-7890",
                "industry": "Software Development - Web Applications",
                "tone": "casual and friendly",
                "language": "technical jargon"
            }
        },
            {
                "id": 2,
                "image": user2,
                "department": "Engineering",
                "agent_template_id": 1,
                "role": "Website support",
                "status": "enabled",
                "name": "Elias",
                "agent_configs": {
                    "website_name": "Othmane Zoheir personal website",
                    "brand_voice": "professional, friendly, and passionate",
                    "contact_info": "Email: support@devco.com, Phone: 123-456-7890",
                    "industry": "Software Development - Web Applications",
                    "tone": "casual and friendly",
                    "language": "technical jargon"
                }
            }]));
    } catch (err) {
        throw new Error(err);
    }
};

export default AgentSlice.reducer;

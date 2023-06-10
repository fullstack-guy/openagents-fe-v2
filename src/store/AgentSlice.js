import axios from 'src/utils/axios';
import {createSlice} from '@reduxjs/toolkit';
import {BACKEND_URL} from "../configs";


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
        addAgent: (state, action) => {
            // The agent data will come in the payload
            state.agents.push(action.payload);
        },
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
        updateAgentConfig: (state, action) => {
            const updatedConfig = action.payload;
            const selectedAgent = state.agents.find(agent => agent.id === state.selectedAgentId);
            if (selectedAgent) {
                // Update the agent_configs of the selected agent
                selectedAgent.agent_configs = updatedConfig;
            }
        },
        getAgentConfig: (state, action) => {
            const {name} = action.payload;
            console.log("name", name)
            const selectedAgent = state.agents.find(agent => agent.id === state.selectedAgentId);
            if (selectedAgent) {
                return selectedAgent.agent_configs[name]
            }
        },

    },
});

// Selector to get the selected agent's data
export const {
    getAgents,
    addAgent,
    searchAgent,
    selectAgent,
    deleteAgent,
    setAgentEditable,
    updateAgentConfig,
    getAgentConfig,
    setVisibilityFilter,
} = AgentSlice.actions;


export const fetchAgents = () => async (dispatch) => {

    try {
        const response = await axios.get(BACKEND_URL + '/agents');
        dispatch(getAgents(response.data));
    } catch (err) {
        throw new Error(err);
    }
};

export default AgentSlice.reducer;

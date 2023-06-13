import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    agents: [],
    selected_agent_id: null,
    selected_agent_data: null,
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
        setAgents: (state, action) => {
            state.agents = action.payload;
        },
        searchAgent: (state, action) => {
            state.agentSearch = action.payload;
        },
        selectAgent: (state, action) => {
            state.selected_agent_id = action.payload;
            state.selected_agent_data = state.agents.find(agent => agent.id === action.payload);
        },
        setAgentEditable: (state) => {
            state.isAgentEditable = !state.isAgentEditable;
        },
        updateAgentConfig: (state, action) => {
            const updatedConfig = action.payload;
            const selectedAgent = state.agents.find(agent => agent.id === state.selected_agent_id);
            if (selectedAgent) {
                // Update the configs of the selected agent
                selectedAgent.configs = updatedConfig;
            }
        },
        getAgentConfig: (state, action) => {
            const {name} = action.payload;
            console.log("name", name)
            const selectedAgent = state.agents.find(agent => agent.id === state.selected_agent_id);
            if (selectedAgent) {
                return selectedAgent.configs[name]
            }
        },
    },
});

// Selector to get the selected agent's data
export const {
    setAgents,
    setAgentData,
    addAgent,
    searchAgent,
    selectAgent,
    setAgentEditable,
    updateAgentConfig,
    getAgentConfig,
} = AgentSlice.actions;


export default AgentSlice.reducer;

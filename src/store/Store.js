import {configureStore} from '@reduxjs/toolkit';
import CustomizerReducer from './CustomizerSlice';
import AnalyticsReducer from './AnalyticsSlice';
import AgentsReducer from './AgentSlice';

export const store = configureStore({
    reducer: {
        customizer: CustomizerReducer,
        analyticsReducer: AnalyticsReducer,
        agentsReducer: AgentsReducer
    },
});

export default store;

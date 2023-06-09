import {configureStore} from '@reduxjs/toolkit';
import CustomizerReducer from './CustomizerSlice';
import AnalyticsReducer from './AnalyticsSlice';
import AgentsReducer from './AgentSlice';
import NotificationReducer from './NotificationSlice';
import AgentSourcesReducer from './AgentSourcesSlice';
export const store = configureStore({
    reducer: {
        agentSourcesReducer: AgentSourcesReducer,
        notificationReducer: NotificationReducer,
        customizer: CustomizerReducer,
        analyticsReducer: AnalyticsReducer,
        agentsReducer: AgentsReducer
    },
});

export default store;

import {configureStore} from '@reduxjs/toolkit';
import CustomizerReducer from './CustomizerSlice';
import AnalyticsReducer from './AnalyticsSlice';
import AgentsReducer from './AgentSlice';
import NotificationReducer from './NotificationSlice';

export const store = configureStore({
    reducer: {
        notification: NotificationReducer,
        customizer: CustomizerReducer,
        analyticsReducer: AnalyticsReducer,
        agentsReducer: AgentsReducer
    },
});

export default store;

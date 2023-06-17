import axiosServices from "src/utils/axios";
import {showNotification} from "src/store/NotificationSlice";
import {hasError, setAgentSources, unlinkAgentSource} from "src/store/AgentSourcesSlice";


export const GET_KNOWLEDGE_SOURCES = (agent_id) => async (dispatch) => {
    try {
        let endpoint = '/knowledge_sources';
        if(agent_id) {
            endpoint += `?agent_id=${agent_id}`;
        }
        const response = await axiosServices.get(endpoint);
        console.log(response.data)
        dispatch(setAgentSources(response.data.data));
    } catch (error) {
        dispatch(hasError(error));
    }
};

export const DELETE_SOURCE_CONNECTION = (agentId, sourceId) => async (dispatch) => {
    try {
        const response = await axiosServices.delete(`/knowledge_sources/connections?agent_id=${agentId}&knowledge_source_id=${sourceId}`);
        dispatch(unlinkAgentSource(sourceId));
        console.log(response.data)
    } catch (error) {
        dispatch(showNotification({
            severity: 'error',
            title: 'Fail',
            message: error.response.data.message
        }));
        dispatch(hasError(error));
    }
};

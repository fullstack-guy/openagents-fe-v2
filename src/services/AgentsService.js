import {addAgent, setAgents} from "src/store/AgentSlice";
import axiosServices from 'src/utils/axios';
import {showNotification} from "../store/NotificationSlice";
import {createClient} from "@supabase/supabase-js";

export const GET_AGENTS = (supabase) => async (dispatch) => {

    try {
        const user1_login = {
            email: 'zozoheir@umich.edu',
            password: 'test[[[[22258',
        }
        const user2_login = {
            email: 'noemailnecessary@gmail.com',
            password: 'Randommm[][][[][',
        }
        const {user, user_error} = await supabase.auth.signInWithPassword(user1_login)

        // Create agent data
        const {new_agent, error} = await supabase.rpc('create_agent', {
            _uid: "417ddd7b-3342-4bcf-926d-887c01ca562c",
            _llm: "gpt_3_5_turbo",
            _image_url: "https://i.ibb.co/JKn3XH6/Screenshot-2023-05-15-at-2-33-24-PM.png",
            _agent_template_id: 1,
            _settings: [
                {
                    "group": "general",
                    "name": "name",
                    "value": "My Agent"
                },
                {
                    "group": "appearance",
                    "name": "display_name",
                    "value": "Othmane ZOZO"
                },
                {
                    "group": "general",
                    "name": "website_url",
                    "value": "othmane.info"
                }
            ]
        }, {single: true});


        const page = 2
        const perPage = 10

        const start = (page - 1) * perPage
        const end = start + perPage - 1

        const {data: agents, error2} = await supabase
            .from('agents')
            .select(`
                    id,
                    uid,
                    llm,
                    image_url,
                    agent_template_id,
                    agent_settings (group, name, value)
                  `)
            .range(start, end)
        if (error) {
            console.error(error)
        } else {
            console.log(agents)
        }
        console.log("Retrieved agents: ", agents)
        // policy:
        //dispatch(setAgents(data));
    } catch (err) {
        throw new Error(err);
    }
};

export const PUT_AGENTS = (agent_data) => async (dispatch) => {
    try {
        const response = await axiosServices.put('/agents', agent_data);
        dispatch(addAgent(response.data.data));
        dispatch(showNotification({
            severity: 'success',
            title: 'Success',
            message: 'Agent created successfully!'
        }));
    } catch (err) {
        throw new Error(err);
    }
};
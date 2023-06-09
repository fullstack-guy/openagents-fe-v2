import axios from 'src/utils/axios';
import {createSlice} from '@reduxjs/toolkit';
import user2 from "../assets/images/profile/user-2.jpg";
import user3 from "../assets/images/profile/user-3.jpg";

const API_URL = '/api/data/contacts/ContactsData';

const initialState = {
    contacts: [],
    contactContent: 1,
    contactSearch: '',
    editContact: false,
    currentAgentFilter: 'show_all',
};

export const AgentSlice = createSlice({
    name: 'agents',
    initialState,
    reducers: {
        getContacts: (state, action) => {
            state.contacts = action.payload;
        },
        SearchContact: (state, action) => {
            state.contactSearch = action.payload;
        },
        SelectContact: (state, action) => {
            state.contactContent = action.payload;
        },
        DeleteContact: (state, action) => {
            const index = state.contacts.findIndex((contact) => contact.id === action.payload);
            state.contacts.splice(index, 1);
        },
        toggleStarredContact: (state, action) => {
            state.contacts = state.contacts.map((contact) =>
                contact.id === action.payload ? {...contact, starred: !contact.starred} : contact,
            );
        },
        isEdit: (state) => {
            state.editContact = !state.editContact;
        },
        setVisibilityFilter: (state, action) => {
            state.currentAgentFilter = action.payload;
        },
        UpdateContact: {
            reducer: (state, action) => {
                state.contacts = state.contacts.map((contact) =>
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
        addContact: {
            reducer: (state, action) => {
                state.contacts.push(action.payload);
            },
            prepare: (
                id,
                firstname,
                lastname,
                image,
                department,
                company,
                phone,
                email,
                address,
                notes,
            ) => {
                return {
                    payload: {
                        id,
                        firstname,
                        lastname,
                        image,
                        department,
                        company,
                        phone,
                        email,
                        address,
                        notes,
                        frequentlycontacted: false,
                        starred: false,
                        deleted: false,
                    },
                };
            },
        },
    },
});

export const {
    getContacts,
    SearchContact,
    isEdit,
    SelectContact,
    DeleteContact,
    toggleStarredContact,
    UpdateContact,
    addContact,
    setVisibilityFilter,
} = AgentSlice.actions;

export const fetchContacts = () => async (dispatch) => {
    try {
        dispatch(getContacts([
            {
                id: 1,
                firstname: 'Georgeanna',
                lastname: 'Ramero',
                image: user2,
                department: 'Sales',
                company: 'Muller Inc',
                phone: '456-485-5623',
                email: 'qq739v47ggn@claimab.com',
                address: '19214 110th Rd, Saint Albans, NY, 1141',
                notes: 'Devolved Tangible Projection',
                frequentlycontacted: true,
                starred: true,
                deleted: false,
            },
            {
                id: 2,
                firstname: 'Cami',
                lastname: 'Macha',
                image: user3,
                department: 'Support',
                company: 'Zboncak LLC',
                phone: '999-895-9652',
                email: 'Camisad@claimab.com',
                address: '76 Hamilton Ave, Yonkers, NY, 10705',
                notes: 'Horizontal Bi-Directional Capability',
                frequentlycontacted: false,
                starred: false,
                deleted: false,
            }]));
    } catch (err) {
        throw new Error(err);
    }
};

export default AgentSlice.reducer;

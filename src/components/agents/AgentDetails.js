import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
    Box,
    Button,
    TextField,
    Typography,
    Avatar,
    Divider,
    IconButton,
    Stack,
    Grid,
    Tooltip,
} from '@mui/material';
import {
    isEdit,
    UpdateContact,
    DeleteContact,
    toggleStarredContact,
} from 'src/store/AgentSlice';
import BlankCard from 'src/components/shared/BlankCard';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import emailIcon from 'src/assets/images/breadcrumb/emailSv.png';
import AgentTabs from './AgentTabs';

const AgentDetails = () => {
    const contactDetail = useSelector(
        (state) => state.agentsReducer.contacts[state.agentsReducer.contactContent - 1],
    );
    const editContact = useSelector((state) => state.agentsReducer.editContact);
    const dispatch = useDispatch();

    const tableData = [
        {
            id: 1,
            title: 'Firstname',
            alias: 'firstname',
            gdata: contactDetail ? contactDetail.firstname : '',
            type: 'text',
        },
        {
            id: 2,
            title: 'Lastname',
            alias: 'lastname',
            gdata: contactDetail ? contactDetail.lastname : '',
            type: 'text',
        },
        {
            id: 3,
            title: 'Company',
            alias: 'company',
            gdata: contactDetail ? contactDetail.company : '',
            type: 'text',
        },
        {
            id: 4,
            title: 'Department',
            alias: 'department',
            gdata: contactDetail ? contactDetail.department : '',
            type: 'text',
        },
        {
            id: 5,
            title: 'Email',
            alias: 'email',
            gdata: contactDetail ? contactDetail.email : '',
            type: 'email',
        },
        {
            id: 6,
            title: 'Phone',
            alias: 'phone',
            gdata: contactDetail ? contactDetail.phone : '',
            type: 'phone',
        },
        {
            id: 7,
            title: 'Address',
            alias: 'address',
            gdata: contactDetail ? contactDetail.address : '',
            type: 'text',
        },
        {
            id: 8,
            title: 'Notes',
            alias: 'notes',
            gdata: contactDetail ? contactDetail.notes : '',
            type: 'text',
        },
    ];

    return (
        <>
            {/* ------------------------------------------- */}
            {/* Contact Detail Part */}
            {/* ------------------------------------------- */}
            {contactDetail && !contactDetail.deleted ? (
                <>
                    <Box sx={{overflow: 'auto'}}>
                        {!editContact ? (
                            <Box>
                                <Box p={3}>
                                    <Box display="flex"
                                         flexDirection={"column"}
                                         alignItems="center">
                                        <Avatar
                                            alt={contactDetail.image}
                                            src={contactDetail.image}
                                            sx={{width: '72px', height: '72px'}}
                                        />
                                        <Typography variant="h6" mb={0.5}>
                                            {contactDetail.firstname} {contactDetail.lastname}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary"
                                                    mb={0.5}>
                                            {contactDetail.department}
                                        </Typography>

                                    </Box>
                                    <AgentTabs></AgentTabs>
                                    <Grid container>
                                        <Grid item lg={6} xs={12} mt={4}>
                                            <Typography variant="body2" color="text.secondary">
                                                Phone Number
                                            </Typography>
                                            <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                                                {contactDetail.phone}
                                            </Typography>
                                        </Grid>
                                        <Grid item lg={6} xs={12} mt={4}>
                                            <Typography variant="body2" color="text.secondary">
                                                Email address
                                            </Typography>
                                            <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                                                {contactDetail.email}
                                            </Typography>
                                        </Grid>

                                    </Grid>
                                </Box>
                                <Box p={3} gap={1} display="flex">
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        size="medium"
                                        onClick={() => dispatch(isEdit())}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        color="error"
                                        variant="contained"
                                        size="medium"
                                        onClick={() => dispatch(DeleteContact(contactDetail.id))}
                                    >
                                        Delete
                                    </Button>
                                </Box>



                            </Box>


                        ) : (
                            <>
                                <BlankCard sx={{p: 0}}>
                                    <Scrollbar sx={{height: {lg: 'calc(100vh - 360px)', md: '100vh'}}}>
                                        <Box pt={1}>
                                            {tableData.map((data) => (
                                                <Box key={data.id} px={3} py={1.5}>
                                                    <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                                                        {data.title}
                                                    </Typography>
                                                    <TextField
                                                        id="firstname"
                                                        size="small"
                                                        fullWidth
                                                        type="text"
                                                        value={data.gdata}
                                                        onChange={(e) =>
                                                            dispatch(UpdateContact(contactDetail.id, data.alias, e.target.value))
                                                        }
                                                    />
                                                </Box>
                                            ))}
                                            <Box p={3}>
                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    onClick={() => dispatch(isEdit())}
                                                >
                                                    Save Contact
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Scrollbar>
                                </BlankCard>
                            </>
                        )}
                    </Box>
                </>
            ) : (
                <Box p={3} height="50vh" display={'flex'} justifyContent="center" alignItems={'center'}>
                    {/* ------------------------------------------- */}
                    {/* If no Contact  */}
                    {/* ------------------------------------------- */}
                    <Box>
                        <Typography variant="h4">Please Select a Contact</Typography>
                        <br/>
                        <img src={emailIcon} alt={emailIcon} width={'250px'}/>
                    </Box>
                </Box>
            )}
        </>
    );
};

export default AgentDetails;

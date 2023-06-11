import {useDispatch} from 'react-redux';
import {showNotification} from 'src/store/NotificationSlice';
import React from 'react';
import {useFormik} from 'formik';
import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Button,
    Stack,
    Divider,
} from '@mui/material';
import {Link} from 'react-router-dom';
import CustomCheckbox from '../../../components/forms/theme-elements/CustomCheckbox';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import AuthSocialButtons from './AuthSocialButtons';
import axiosServices from "src/utils/axios";
import {useNavigate} from "react-router-dom";


const AuthLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();  // Get the history object

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            remember: true
        },
        onSubmit: async (values) => {
            try {
                const response = await axiosServices.post('/login', values);
                dispatch(showNotification({
                    severity: 'success',
                    title: 'success',
                    message: response.data.message
                }));
                navigate("/home");

            } catch (error) {
                console.log(error.response)
                dispatch(showNotification({
                    severity: 'error',
                    title: 'Error',
                    message: error.response.data.message
                }));
            }
        }
        ,
    });


    return (
        <>
            <AuthSocialButtons title="Sign in with"/>
            <Box mt={3}>
                <Divider>
                    <Typography
                        component="span"
                        color="textSecondary"
                        variant="h6"
                        fontWeight="400"
                        position="relative"
                        px={2}
                    >
                        or sign in with
                    </Typography>
                </Divider>
            </Box>

            <form onSubmit={formik.handleSubmit}>
                <Stack>
                    <Box>
                        <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
                        <CustomTextField
                            id="email"
                            variant="outlined"
                            fullWidth
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                    </Box>
                    <Box>
                        <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
                        <CustomTextField
                            id="password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                    </Box>
                    <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
                        <FormGroup>
                            <FormControlLabel
                                control={<CustomCheckbox
                                    defaultChecked={formik.values.remember}
                                    onChange={formik.handleChange}
                                    name="remember"
                                />}
                                label="Remeber this Device"
                            />
                        </FormGroup>
                        <Typography
                            component={Link}
                            to="/auth/forgot-password"
                            fontWeight="500"
                            sx={{
                                textDecoration: 'none',
                                color: 'primary.main',
                            }}
                        >
                            Forgot Password ?
                        </Typography>
                    </Stack>
                </Stack>
                <Box>
                    <Button
                        color="primary"
                        variant="contained"
                        size="large"
                        fullWidth
                        type="submit"
                    >
                        Sign In
                    </Button>
                </Box>
            </form>
        </>)
};

export default AuthLogin;

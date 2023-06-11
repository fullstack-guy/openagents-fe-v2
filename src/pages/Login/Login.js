import React from 'react';
import {Link} from 'react-router-dom';
import {Grid, Box, Card, Stack, Typography} from '@mui/material';

// components
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/shared/logo/Logo';
import AuthLogin from 'src/views/authentication/authForms/AuthLogin';
import {useTheme} from '@mui/material/styles';
import {useSelector} from "react-redux";

const Login = () => {
    const theme = useTheme();
    return (
        <PageContainer title="Login"
                       description="this is Login page">
            <Box
                sx={{
                    position: 'relative',
                    '&:before': {
                        content: '""',
                        backgroundSize: '400% 400%',
                        animation: 'gradient 15s ease infinite',
                        position: 'absolute',
                        height: '100%',
                        width: '100%',
                    },
                }}
            >
                <Grid container
                      spacing={0}
                      justifyContent="center"
                      alignItems="center"
                      style={{
                          minHeight: '100vh',

                      }} // this makes sure your grid takes at least the full height of the viewport
                >
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        lg={5}
                        xl={5}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            border: "solid 1px " + theme.palette.divider,
                        }}
                    >
                        <Card elevation={9} sx={{
                            p: 4,
                            zIndex: 1,
                            width: '100%',
                            maxWidth: '500px',
                            backgroundColor: (theme) => theme.palette.background.default,

                        }}>
                            <Box display="flex" alignItems="center" justifyContent="center">
                                <Logo/>
                            </Box>
                            <AuthLogin
                                subtitle={
                                    <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
                                        <Typography color="textSecondary" variant="h6" fontWeight="500">
                                            New to Open Agents?
                                        </Typography>
                                        <Typography
                                            component={Link}
                                            to="/auth/register"
                                            fontWeight="500"
                                            sx={{
                                                textDecoration: 'none',
                                                color: 'primary.main',
                                            }}
                                        >
                                            Create an account
                                        </Typography>
                                    </Stack>
                                }
                            />
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
    );
};

export default Login;

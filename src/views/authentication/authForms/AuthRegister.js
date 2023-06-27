import React, { useCallback } from 'react';
import { Box, Typography, Button, Divider, Alert, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Form, useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import AuthSocialButtons from './AuthSocialButtons';
import useMounted from 'src/guards/authGuard/UseMounted';
import { supabase } from 'src/supabase/supabase';

const AuthRegister = ({ title, subtitle, subtext }) => {
  const mounted = useMounted();
  const navigate = useNavigate();

  const registerSchema = Yup.object().shape({
    username: Yup.string().required('username is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleSignUp = useCallback(async (email, password) => {
    await supabase.auth.signUp({
      email,
      password,
    })
  }, [])

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      policy: true,
      submit: null,
      acceptTerms: false,
    },

    validationSchema: registerSchema,

    onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
      try {
        await handleSignUp(values.email, values.password);
        navigate('/auth/login');
        if (mounted.current) {
          setStatus({ success: true });
          setSubmitting(true);
        }
      } catch (err) {
        if (mounted.current) {
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }
    },
  });
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}
      <AuthSocialButtons title="Sign up with" />

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
            or sign up with
          </Typography>
        </Divider>
      </Box>

      <Box>
        {errors.submit && (
          <Box mt={2}>
            <Alert severity="error">{errors.submit}</Alert>
          </Box>
        )}
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit}>
            <Stack mb={3}>
              <CustomFormLabel htmlFor="name">Name</CustomFormLabel>
              <CustomTextField
                id="name"
                variant="outlined"
                fullWidth
                {...getFieldProps('username')}
                error={Boolean(touched.username && errors.username)}
                helperText={touched.username && errors.username}
              />
              <CustomFormLabel htmlFor="email">Email Adddress</CustomFormLabel>
              <CustomTextField
                id="email"
                variant="outlined"
                fullWidth
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
              <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
              <CustomTextField
                id="password"
                type="password"
                variant="outlined"
                fullWidth
                {...getFieldProps('password')}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
            </Stack>
            <Box>
              <Button
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                type="submit"
                disabled={isSubmitting}
              >
                Sign Up
              </Button>
            </Box>
          </Form>
        </FormikProvider>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthRegister;

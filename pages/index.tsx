import { FormProvider, useForm } from 'react-hook-form';

import { NextPage } from 'next';

import {
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from '@mui/icons-material';
import { Button, Grid, IconButton, Typography } from '@mui/material';

import styled from '@emotion/styled';

import { Form } from '_/components/form';
import useUiStore from '_/store/ui/store';

import { userAuthFormSchema } from '@/user/auth/schema';
import { useUserAuth } from '@/user/auth/service';
import { UserAuth } from '@/user/auth/types';
import { zodResolver } from '@hookform/resolvers/zod';

const Container = styled.main`
  &,
  main {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  main {
    justify-content: center;
    align-items: center;
  }

  footer {
    padding: 1rem;
    display: flex;
    justify-content: flex-end;
  }
`;

const Home: NextPage = () => {
  const { switchThemeMode, themeMode } = useUiStore();
  const userAuthForm = useForm<UserAuth.Input>({
    resolver: zodResolver(userAuthFormSchema),
  });

  const [login] = useUserAuth();

  const handleLogin = async (data: UserAuth.Input): Promise<void> => {
    try {
      const response = await login({
        variables: { data },
      });

      console.log(response);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container>
      <FormProvider {...userAuthForm}>
        <Form.Container onSubmit={handleLogin}>
          <Grid item xs={12}>
            <Typography variant="h4" component="h1" textAlign="center">
              Bem-vindo ao The Helper
            </Typography>
            <Typography component="p" textAlign="center">
              Antes de tudo, faça login para continuar:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Form.Input label="E-mail" type="email" name="email" />
          </Grid>
          <Grid item xs={12}>
            <Form.Input label="Senha" type="password" name="password" />
          </Grid>
          <Grid item xs={4}>
            <Button type="submit" variant="outlined" fullWidth>
              Login
            </Button>
          </Grid>
        </Form.Container>
      </FormProvider>
      <footer>
        <IconButton size="large" color="inherit" onClick={switchThemeMode}>
          {themeMode === 'dark' ? (
            <LightModeIcon color="disabled" />
          ) : (
            <DarkModeIcon color="disabled" />
          )}
        </IconButton>
      </footer>
    </Container>
  );
};

export default Home;

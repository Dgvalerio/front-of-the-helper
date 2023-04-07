import { useForm } from 'react-hook-form';

import { NextPage } from 'next';

import {
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';

import styled from '@emotion/styled';

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserAuth.Input>({
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
      <Grid container justifyContent="center" alignItems="center" flex={1}>
        <Grid item xs={6}>
          <Grid
            container
            component="form"
            justifyContent="flex-end"
            spacing={4}
            onSubmit={handleSubmit(handleLogin)}
          >
            <Grid item xs={12}>
              <Typography variant="h4" component="h1" textAlign="center">
                Bem-vindo ao The Helper
              </Typography>
              <Typography component="p" textAlign="center">
                Antes de tudo, faça login para continuar:
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="E-mail"
                type="email"
                fullWidth
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Senha"
                type="password"
                fullWidth
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={4}>
              <Button type="submit" variant="outlined" fullWidth>
                Login
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
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

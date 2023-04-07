import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { Button, Grid, Typography } from '@mui/material';

import { Form } from '@components/form';
import Loading from '@components/loading';

import useAuthVerify from '@hooks/use-auth-verify';

import useUiStore from '@store/ui/store';
import { Load } from '@store/ui/types';
import useUserStore from '@store/user/store';

import { routes, RouteTypes } from '@utils/routes';

import { userAuthFormSchema } from '@/user/auth/schema';
import { useUserAuth } from '@/user/auth/service';
import { UserAuth } from '@/user/auth/types';
import { zodResolver } from '@hookform/resolvers/zod';

const Home: NextPage = () => {
  const pass = useAuthVerify(RouteTypes.Protected);
  const router = useRouter();

  const { setUser } = useUserStore();
  const { enableLoad, disableLoad } = useUiStore();

  const userAuthForm = useForm<UserAuth.Input>({
    resolver: zodResolver(userAuthFormSchema),
  });

  const [login] = useUserAuth();

  const handleLogin = async (data: UserAuth.Input): Promise<void> => {
    enableLoad(Load.Login);

    try {
      const response = await login({
        variables: { data },
      });

      if (response.data) {
        setUser(response.data.login.user);
        await router.push(routes.configurations());
      }
    } catch (e) {
      toast.error(`Falha ao realizar login: ${e}`);
    } finally {
      disableLoad(Load.Login);
    }
  };

  useEffect(() => disableLoad(Load.RedirectToLogin), [disableLoad]);

  if (!pass) return <Loading />;

  return (
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
  );
};

export default Home;

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

import { Routes, routes, RouteTypes } from '@utils/routes';

import { userCreateFormSchema } from '@/user/create/schema';
import { useUserCreate } from '@/user/create/service';
import { UserCreate } from '@/user/create/types';
import { zodResolver } from '@hookform/resolvers/zod';

const SignUp: NextPage = () => {
  const pass = useAuthVerify(RouteTypes.Protected);
  const router = useRouter();

  const { enableLoad, disableLoad } = useUiStore();

  const userCreateForm = useForm<UserCreate.Input>({
    resolver: zodResolver(userCreateFormSchema),
  });

  const [userCreate] = useUserCreate();

  const handleCreate = async (data: UserCreate.Input): Promise<void> => {
    enableLoad(Load.SignUp);

    try {
      const response = await userCreate({
        variables: { data },
      });

      if (response.data) {
        toast.success('Cadastro realizado com sucesso!');
        await router.push(routes.login());
      }
    } catch (e) {
      toast.error(`Falha ao realizar o cadastro: ${e}`);
    } finally {
      disableLoad(Load.SignUp);
    }
  };

  const toLogin = (): void => void router.push(Routes.Login);

  useEffect(() => disableLoad(Load.RedirectToLogin), [disableLoad]);

  if (!pass) return <Loading />;

  return (
    <FormProvider {...userCreateForm}>
      <Form.Container onSubmit={handleCreate} justifyContent="space-between">
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" textAlign="center">
            Cadastro
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Form.Input label="Nome" type="text" name="name" />
        </Grid>
        <Grid item xs={12}>
          <Form.Input label="E-mail" type="email" name="email" />
          <Typography variant="caption" color="text.secondary">
            Utilize o mesmo e-mail da sua conta do Github.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Form.Input label="Senha" type="password" name="password" />
        </Grid>
        <Grid item xs={12}>
          <Form.Input
            label="Confirmação de senha"
            type="password"
            name="passwordConfirmation"
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            type="button"
            variant="outlined"
            fullWidth
            style={{
              color: 'rgba(170, 170, 170, 0.4)',
              borderColor: 'rgba(170, 170, 170, 0.4)',
            }}
            onClick={toLogin}
          >
            Voltar
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button type="submit" variant="outlined" fullWidth color="primary">
            Cadastrar
          </Button>
        </Grid>
      </Form.Container>
    </FormProvider>
  );
};

export default SignUp;

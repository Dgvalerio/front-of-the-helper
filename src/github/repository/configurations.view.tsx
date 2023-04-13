import {
  FC,
  ReactNode,
  SyntheticEvent,
  useEffect,
  useMemo,
  useState,
} from 'react';
import * as React from 'react';
import { toast } from 'react-toastify';

import { ApolloError } from '@apollo/client';

import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import {
  Autocomplete,
  Grid,
  IconButton,
  Skeleton,
  TextField,
  Typography,
} from '@mui/material';

import { errorHandler } from '@utils/error-handler';

import { useGithubBranchCreate } from '@/github/branch/create/service';
import { useGithubBranchLoad } from '@/github/branch/load/service';
import { useGithubRepositoryCreate } from '@/github/repository/create/service';
import { useGithubRepositoryDelete } from '@/github/repository/delete/service';
import { useGithubRepositoryLoad } from '@/github/repository/load/service';
import { useGithubRepositoryRead } from '@/github/repository/read/service';
import { GithubRepositoryRead } from '@/github/repository/read/types';

const List: FC<{
  repositories: GithubRepositoryRead.Output[];
  reload(): void;
}> = ({ repositories, reload }) => {
  const [deleteRepository] = useGithubRepositoryDelete();

  const handleDelete = async (fullName: string): Promise<void> => {
    try {
      await deleteRepository({ variables: { data: { fullName } } });
      await reload();
    } catch (e) {
      const error = e as ApolloError;

      toast.error(error.message || `Falha ao deleter um repositório: ${error}`);
    }
  };

  return (
    <>
      {repositories.map((repo, idx) => (
        <Grid item xs={12} container spacing={1} key={idx}>
          <Grid item xs={7}>
            <TextField
              label="Repositório"
              size="small"
              value={repo.fullName}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Branch"
              size="small"
              value={repo.branch?.name}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={1}>
            <IconButton
              style={{
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: 4,
                paddingTop: 7,
                paddingBottom: 7,
              }}
              aria-label="Apagar repositório"
              onClick={handleDelete.bind(null, repo.fullName)}
            >
              <RemoveIcon color="disabled" />
            </IconButton>
          </Grid>
        </Grid>
      ))}
    </>
  );
};

const ListSkeleton: FC<{ length?: number }> = ({ length }) => (
  <>
    {[...new Array(length || 3)].map((_, i) => (
      <Grid item xs={12} container spacing={1} key={i}>
        <Grid item xs={7}>
          <Skeleton width="100%" height={40} sx={{ transform: 'none' }} />
        </Grid>
        <Grid item xs={4}>
          <Skeleton width="100%" height={40} sx={{ transform: 'none' }} />
        </Grid>
        <Grid item xs={1}>
          <Skeleton width="42px" height={40} sx={{ transform: 'none' }} />
        </Grid>
      </Grid>
    ))}
  </>
);

const RepositorySelect: FC<{
  repository: string;
  setRepository(repository: string): void;
  setBranch(branch: string): void;
}> = ({ repository, setRepository, setBranch }) => {
  const { data, loading, error } = useGithubRepositoryLoad();

  const handleRepositoryChange = async (
    _: SyntheticEvent,
    repository: string
  ): Promise<void> => {
    try {
      setRepository(repository);
      setBranch('');
    } catch (e) {
      errorHandler(e);
    }
  };

  const options = useMemo(() => {
    if (!data || loading) return [];

    return data.loadGithubRepositories.map((repo) => repo.fullName);
  }, [data, loading]);

  useEffect(() => errorHandler(error), [error]);

  if (loading)
    return (
      <Grid item xs={7}>
        <Skeleton width="100%" height={40} sx={{ transform: 'none' }} />
      </Grid>
    );

  return (
    <Grid item xs={7}>
      <Autocomplete
        color="primary"
        inputValue={repository}
        onInputChange={handleRepositoryChange}
        disablePortal
        options={options}
        renderInput={(params): ReactNode => (
          <TextField {...params} label="Repositório" size="small" />
        )}
      />
    </Grid>
  );
};

const BranchSelect: FC<{
  repository: string;
  branchName: string;
  setBranch(branch: string): void;
}> = ({ repository, branchName, setBranch }) => {
  const [loadBranches, { data, loading, error }] = useGithubBranchLoad();

  const handleBranchChange = async (
    _: SyntheticEvent,
    newValue: string
  ): Promise<void> => {
    try {
      setBranch(newValue);
    } catch (e) {
      errorHandler(e);
    }
  };

  const branchOptions = useMemo(() => {
    if (!data || loading) return [];

    return data.loadGithubBranches.map((branch) => branch.name);
  }, [data, loading]);

  useEffect(() => errorHandler(error), [error]);

  useEffect(() => {
    if (repository) {
      void loadBranches({ variables: { data: { repository } } });
    }
  }, [loadBranches, repository]);

  if (loading)
    return (
      <Grid item xs={4}>
        <Skeleton width="100%" height={40} sx={{ transform: 'none' }} />
      </Grid>
    );

  return (
    <Grid item xs={4}>
      <Autocomplete
        color="primary"
        inputValue={branchName}
        onInputChange={handleBranchChange}
        disablePortal
        options={branchOptions}
        renderInput={(params): ReactNode => (
          <TextField {...params} label="Branch" size="small" />
        )}
      />
    </Grid>
  );
};

const Form: FC<{ reload(): void }> = ({ reload }) => {
  const [repository, setFullName] = useState<string>('');
  const [branchName, setBranchName] = useState<string>('');

  const [createRepository] = useGithubRepositoryCreate();
  const [setBranch] = useGithubBranchCreate();

  const handleCreate = async (): Promise<void> => {
    try {
      await createRepository({ variables: { data: { fullName: repository } } });
      await setBranch({
        variables: { data: { repository, branch: branchName } },
      });

      reload();
      setBranchName('');
      setFullName('');
    } catch (e) {
      const error = e as ApolloError;

      toast.error(error.message || `Falha ao criar repositório: ${error}`);
    }
  };

  return (
    <Grid item xs={12} container spacing={1}>
      <RepositorySelect
        repository={repository}
        setRepository={setFullName}
        setBranch={setBranchName}
      />
      <BranchSelect
        repository={repository}
        branchName={branchName}
        setBranch={setBranchName}
      />
      <Grid item xs={1}>
        <IconButton
          style={{
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: 4,
            paddingTop: 7,
            paddingBottom: 7,
          }}
          aria-label="Adicionar repositório"
          onClick={handleCreate}
          disabled={!(repository && branchName)}
        >
          <AddIcon color="disabled" />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export const RepositoryConfigurations: FC = () => {
  const { data, loading, error, refetch } = useGithubRepositoryRead();

  useEffect(() => errorHandler(error), [error]);

  return (
    <Grid container spacing={1} px={8}>
      <Grid
        item
        xs={3}
        style={{ borderRight: '1px solid rgba(255, 255, 255, 0.1)' }}
        paddingRight={2}
      >
        <Typography variant="h5" component="h2" textAlign="right">
          Repositórios
        </Typography>
      </Grid>
      <Grid item xs={9} container spacing={1}>
        {loading ? (
          <ListSkeleton length={data?.getAllGithubRepositories.length} />
        ) : (
          <List
            repositories={data?.getAllGithubRepositories || []}
            reload={refetch}
          />
        )}
        <Grid item xs={12} py={1} />
        <Form reload={refetch} />
      </Grid>
    </Grid>
  );
};

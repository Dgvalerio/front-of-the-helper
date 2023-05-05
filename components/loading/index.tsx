import { FC, useCallback, useEffect, useState } from 'react';

import { Fade, Typography } from '@mui/material';

import Styles from '@components/loading/styles';

const WithText: FC<{ texts: string[] }> = ({ texts }) => {
  const [fade, setFade] = useState(true);
  const [current, setCurrent] = useState(0);

  const updateMessage = useCallback(
    (): NodeJS.Timeout =>
      setTimeout(() => {
        setFade(false);
        setTimeout(() => {
          setCurrent(() => (current + 1) % texts.length);
          setFade(true);
        }, 200);
      }, 2000),
    [current, texts]
  );

  useEffect(() => {
    const timeout = updateMessage();

    return () => clearTimeout(timeout);
  }, [updateMessage]);

  return (
    <>
      <Styles.Container>
        <div id="clock" aria-label="Loading">
          <div id="hour-hand" />
          <div id="minute-hand" />
        </div>
        <div id="text">
          <Fade in={fade} unmountOnExit>
            <Typography>{texts[current]}</Typography>
          </Fade>
        </div>
      </Styles.Container>
    </>
  );
};

const Loading: FC<{ texts?: string[] }> = ({ texts }) => {
  if (!texts) {
    return (
      <Styles.Container>
        <div id="clock" aria-label="Loading">
          <div id="hour-hand" />
          <div id="minute-hand" />
        </div>
      </Styles.Container>
    );
  }

  return <WithText texts={texts} />;
};

export default Loading;

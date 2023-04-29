import styled from '@emotion/styled';

export const AppointmentListContainer = styled.div`
  display: flex;
  flex: 2;

  @media (min-width: ${({ theme }): number => theme.breakpoints.values.xl}px) {
    flex: 4;
  }
`;

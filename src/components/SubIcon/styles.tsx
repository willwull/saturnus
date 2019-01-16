import styled from "styled-components";
import { lighten } from "polished";

type Props = {
  size: number;
};

const getSize = (props: Props) => `${props.size}px`;

export const Icon = styled.img`
  width: ${getSize};
  height: ${getSize};
  border-radius: 50%;
  background: ${props => props.color || lighten(0.1, props.theme.primary)};
`;

export const FallBackIcon = styled.div`
  width: ${getSize};
  height: ${getSize};
  border-radius: 50%;
  background: ${props => props.color || lighten(0.1, props.theme.primary)};
`;

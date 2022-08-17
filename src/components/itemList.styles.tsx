import styled from "styled-components";

export const SetColumn = styled.li<{ newIndex: number; index: number; }> `
  width: 24rem;
  height: 3.5em;
  position: absolute;
  top: ${(props) => 4.5 + 3.5 * (props.newIndex ? props.newIndex : props.index)}em;
  left: 50%;
  transform: translateX(-50%);
  transition:${(props) => (props.newIndex ? "all .5s ease-out" : null)};
  display: flex;
  align-items: center;
`;

export const ItemIndex = styled.p`
  width: 2.25em;
`;

export const Picture = styled.div<{ imageLink: string; }> `
  margin-right: 1.125em;
  background-image: url(${(props) => props.imageLink});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 1.3125em;
  border: 1px solid #171717;
`;

export const Score = styled.p`
  flex-grow: 1;
  text-align: right;
  font-variant-numeric: tabular-nums;
  &:after {
    content: "pt";
    margin-left: 0.25em;
  };
`;

import styled from "styled-components";

interface ButtonProps {
  img: string
}

 export const Button = styled.button<ButtonProps>`  
  padding: 0;
  margin: 5px;
  background: center/100% url(${props => props.img}) no-repeat;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  color: #010140;
  &:hover {
    transform: scale(1.2);
  }
`;

import React from "react";
import styled from "styled-components";

interface ModalProps {
  active: boolean;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ active, children }) => {
  if (!active) {
    return null;
  }
  return (
    <StyledModal>
      <Content>{children}</Content>
    </StyledModal>
  );
};

const StyledModal = styled.div`
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  padding: 20px;
  border-radius: 12px;
  background-color: #ebf5ee;
`;

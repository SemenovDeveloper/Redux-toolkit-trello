import styled from "styled-components";
import { useForm } from "react-hook-form";
import { StyledInput } from "ui/StyledInput";

interface FormProps {
  children?: React.ReactNode;
  onHandleClick: () => void
  placeholder:string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Form : React.FC<FormProps> = ({ onHandleClick, placeholder, value, onChange}) => {
  const {
    register,
    formState: {errors},
  } = useForm();

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onHandleClick();
   }

  return (
    <form onSubmit={onSubmit}>
      <StyledInput
        {...register("value")}
        type='text'
        onChange={onChange}
        placeholder={placeholder}
        defaultValue={value}
        ></StyledInput>
      <SubmitButton>OK</SubmitButton>
    </form>
  );
};

const SubmitButton = styled.button`
  padding: 0;
  margin: 5px;
  font-size: 14px;
  border: 1px solid black;
  border-radius: 5px;
  width: 25px;
  height: 25px;
  cursor: pointer;
  color: #010140;
  &:hover {
    opacity: 0.5;
  }
`;
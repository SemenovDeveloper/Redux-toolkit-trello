import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { StyledInput } from "ui/StyledInput";

interface FormProps {
  children?: React.ReactNode;
  onHandleClick: (value: string) => void;
  placeholder: string;
  defaultValue: string;
}

type FormValues = {
  inputValue: string;
  ID?: string
};

export const Form: React.FC<FormProps> = ({
  onHandleClick,
  placeholder,
  defaultValue,
}) => {

  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) =>
    onHandleClick(data.inputValue);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StyledInput
        defaultValue={defaultValue}
        placeholder={placeholder}
        {...register("inputValue")}
      />
      <SubmitButton type="submit">ok</SubmitButton>
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

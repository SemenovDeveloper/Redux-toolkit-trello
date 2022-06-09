import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { StyledInput } from "ui";
import { Button } from 'ui'
import saveIcon from 'images/saveIcon.svg'

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
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledInput
        defaultValue={defaultValue}
        placeholder={placeholder}
        {...register("inputValue")}
      />
      <Button img={saveIcon}/>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
`

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';

import { ValidationCustomInput } from '../validation-custom-input/validation-custom-input';
import { registrationUserAction } from '../../../store/slices/loader-slice';

export const RegistrationForm = ({
  formSchema,
  inputs,
  placeholders,
  descriptions,
  additionalHint,
  setStepRegistration,
  stepRegistration,
  userDataForm,
  setUserDataForm,
  textBtn,
  maskPhone,
}) => {
  const dispatch = useDispatch();

  const [isBlured, setIsBlured] = useState(false);

  const [firstInput, secondInput] = inputs;
  const [firstPlaceholder, secondPlaceholder] = placeholders;
  const [firstDescription, secondDescription] = descriptions;

  const usernameDescription = ['Используйте для логина ', 'латинский алфавит', ' и ', 'цифры'];
  const passDescription = ['Пароль ', 'не менее 8 символов', ', ', 'с заглавной буквой', ' и ', 'цифрой'];

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
  } = useForm({
    criteriaMode: 'all',
    shouldFocusError: true,
    mode: 'all',
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (data) => {
    setStepRegistration(stepRegistration === 3 ? 1 : stepRegistration + 1);
    setUserDataForm({ ...userDataForm, [firstInput]: data[firstInput], [secondInput]: data[secondInput] });

    if (stepRegistration > 2) {
      await dispatch(
        registrationUserAction({ ...userDataForm, [firstInput]: data[firstInput], [secondInput]: data[secondInput] })
      );
    }
  };

  return (
    <form
      className="wrapper-registration container-personal-cabinet-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate="novalidate"
      data-test-id="register-form"
    >
      <div className="container-registration-inputs container-personal-cabinet-inputs">
        <Controller
          name={firstInput}
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <ValidationCustomInput
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              inputRef={ref}
              errors={errors}
              input={firstInput}
              placeholder={firstPlaceholder}
              description={firstInput === 'username' ? usernameDescription : firstDescription}
              additionalHint={additionalHint}
              maskPhone={maskPhone}
              dirtyFields={dirtyFields}
              isBlured={isBlured}
              setIsBlured={setIsBlured}
            />
          )}
        />

        <Controller
          name={secondInput}
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <ValidationCustomInput
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              inputRef={ref}
              errors={errors}
              input={secondInput}
              placeholder={secondPlaceholder}
              description={secondInput === 'password' ? passDescription : secondDescription}
              additionalHint={additionalHint}
              dirtyFields={dirtyFields}
              isBlured={isBlured}
              setIsBlured={setIsBlured}
            />
          )}
        />
      </div>

      <button
        className={`registration-btn personal-cabinet-form-btn ${isValid ? 'primary' : 'disabled'}`}
        type="submit"
        disabled={!isValid}
      >
        {textBtn}
      </button>
    </form>
  );
};

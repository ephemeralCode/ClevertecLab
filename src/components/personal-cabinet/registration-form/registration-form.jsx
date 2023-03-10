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
  maskPhone,
}) => {
  const dispatch = useDispatch();

  const [firstInput, secondInput] = inputs;
  const [firstPlaceholder, secondPlaceholder] = placeholders;
  const [firstDescription, secondDescription] = descriptions;

  const usernameDescription = ['Используйте для логина ', 'латинский алфавит', ' и ', 'цифры'];
  const passDescription = ['Пароль ', 'не менее 8 символов', ', ', 'с заглавной буквой', ' и ', 'цифрой'];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: 'all',
    shouldFocusError: true,
    mode: 'all',
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (data) => {
    setStepRegistration(stepRegistration + 1);
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
      data-test-id="register-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate="novalidate"
    >
      <div className="container-registration-inputs container-personal-cabinet-inputs">
        <Controller
          name={firstInput}
          control={control}
          render={({ field }) => (
            <ValidationCustomInput
              field={field}
              errors={errors}
              input={firstInput}
              placeholder={firstPlaceholder}
              description={firstInput === 'username' ? usernameDescription : firstDescription}
              additionalHint={additionalHint}
              maskPhone={maskPhone}
            />
          )}
        />

        <Controller
          name={secondInput}
          control={control}
          render={({ field }) => (
            <ValidationCustomInput
              field={field}
              errors={errors}
              input={secondInput}
              placeholder={secondPlaceholder}
              description={secondInput === 'password' ? passDescription : secondDescription}
              additionalHint={additionalHint}
            />
          )}
        />
      </div>

      <button className="registration-btn personal-cabinet-form-btn primary" type="submit">
        {stepRegistration > 2 ? 'Зарегистрироваться' : 'Следующий шаг'}
      </button>
    </form>
  );
};

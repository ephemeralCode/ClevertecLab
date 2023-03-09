import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import MaskedInput from 'react-text-mask';

import { ValidationCustomInput } from '../validation-custom-input/validation-custom-input';
import { registrationUserAction } from '../../../store/slices/loader-slice';

export const RegistrationForm = ({
  formSchema,
  inputs,
  placeholders,
  descriptions,
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
    formState: { errors, dirtyFields },
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
    <form className="wrapper-registration" data-test-id="register-form" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Controller
          name={firstInput}
          control={control}
          render={({ field }) =>
            firstInput === 'phone' ? (
              <label className="container-registration-input">
                <MaskedInput
                  style={{
                    borderBottom: `1px solid ${errors[firstInput] ? '#F42C4F' : '#bfc4c9'}`,
                  }}
                  name="phone"
                  mask={maskPhone}
                  placeholderChar="x"
                  className="registration-input"
                  type="tel"
                  placeholder={firstPlaceholder}
                  guide={true}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />

                <div className="registration-input-error">
                  {errors[firstInput]?.message ? (
                    <span style={{ color: 'red' }}>{errors[firstInput]?.message}</span>
                  ) : (
                    <p>{firstDescription}</p>
                  )}
                </div>
              </label>
            ) : (
              <ValidationCustomInput
                field={field}
                errors={errors}
                dirtyFields={dirtyFields}
                input={firstInput}
                placeholder={firstPlaceholder}
                description={firstInput === 'username' ? usernameDescription : firstDescription}
              />
            )
          }
        />

        <Controller
          name={secondInput}
          control={control}
          render={({ field }) => (
            <ValidationCustomInput
              field={field}
              errors={errors}
              dirtyFields={dirtyFields}
              input={secondInput}
              placeholder={secondPlaceholder}
              description={secondInput === 'password' ? passDescription : secondDescription}
            />
          )}
        />
      </div>

      <button className="registration-btn primary" type="submit">
        Следующий шаг
      </button>
    </form>
  );
};

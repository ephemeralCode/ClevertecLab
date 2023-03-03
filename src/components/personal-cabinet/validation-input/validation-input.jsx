import './validation-input.css';

export const ValidationInput = ({ register, validationErrorMessage, errors }) => (
  <label className="container-personal-cabinet-input">
    <input
      style={{
        borderBottom: `1px solid ${errors?.identifier || validationErrorMessage ? '#F42C4F' : '#bfc4c9'}`,
      }}
      className="personal-cabinet-input"
      placeholder="Логин"
      {...register('identifier', {
        required: 'Поле не может быть пустым',
      })}
      autoComplete="identifier"
    />
    <div className="personal-cabinet-input-error">
      {errors?.identifier?.message && <p>Поле не может быть пустым</p>}
    </div>
  </label>
);

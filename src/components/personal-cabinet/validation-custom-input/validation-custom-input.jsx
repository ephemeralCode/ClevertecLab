/* eslint-disable complexity */
import { useState } from 'react';
import MaskedInput from 'react-text-mask';

import IconEyeClosed from '../../../assets/icons/btn/icon-eye-closed.svg';
import IconEyeOpen from '../../../assets/icons/btn/icon-eye-open.svg';
import IconChecked from '../../../assets/icons/btn/icon-checked.svg';

import './validation-custom-input.css';

export const ValidationCustomInput = ({
  field,
  errors,
  input,
  placeholder,
  description,
  additionalHint,
  maskPhone,
}) => {
  const [isOpenEye, setIsOpenEye] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isPassword = input === 'password' || input === 'passwordConfirmation' ? true : false;

  return (
    <div className="container-validation-input">
      <div className="wrapper-validation-input">
        {input === 'phone' ? (
          <MaskedInput
            name="phone"
            className={`validation-input ${errors[input] ? 'error' : ''}`}
            mask={maskPhone}
            placeholderChar="x"
            type="tel"
            guide={true}
            required={true}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
        ) : (
          <input
            name={input}
            className={`validation-input ${errors[input] ? 'error' : ''}`}
            onFocus={(e) => {
              setIsFocused(false);
              field.onBlur(e);
            }}
            onChange={(e) => {
              field.onChange(e);
            }}
            onBlur={() => field.onBlur(additionalHint && errors[input]?.message && field.value && setIsFocused(true))}
            type={`${isPassword ? (isOpenEye ? 'text' : 'password') : 'text'}`}
            ref={field.ref}
            required={true}
          />
        )}

        <label className="validation-input-placeholder">{placeholder}</label>

        {field.value && isPassword && (
          <button
            className="validation-input-btn-visible-password"
            onClick={() => setIsOpenEye(!isOpenEye)}
            type="button"
          >
            {!errors[input]?.message && (
              <img className="validation-input-icon-checked" data-test-id="checkmark" src={IconChecked} alt="" />
            )}

            <img
              data-test-id={isOpenEye ? 'eye-opened' : 'eye-closed'}
              src={isOpenEye ? IconEyeOpen : IconEyeClosed}
              alt=""
            />
          </button>
        )}
      </div>

      <div className="container-validation-input-description">
        {!errors[input]?.message && (
          <p className="validation-input-description" data-test-id="hint">
            {description}
          </p>
        )}
      </div>

      <div className="container-validation-input-error">
        {!additionalHint && field.value && !isFocused && (
          <span className="validation-input-error" data-test-id="hint">
            {errors[input]?.message}
          </span>
        )}

        {!additionalHint && !field.value && !isFocused && (
          <span className="validation-input-error" data-test-id="hint">
            {errors[input]?.message}
          </span>
        )}

        {additionalHint && !field.value && !isFocused && (
          <span className="validation-input-error" data-test-id="hint">
            {errors[input]?.message}
          </span>
        )}

        {additionalHint &&
          field.value &&
          errors[input]?.types?.matches?.length &&
          !isFocused &&
          description.map((item, i) =>
            errors[input]?.types?.matches?.includes(item) ? (
              // eslint-disable-next-line react/no-array-index-key
              <span className="validation-input-error" data-test-id="hint" key={i}>
                {item}
              </span>
            ) : (
              item
            )
          )}

        {isFocused && field.value && (
          <span className="validation-input-error" data-test-id="hint">
            {description}
          </span>
        )}
      </div>
    </div>
  );
};

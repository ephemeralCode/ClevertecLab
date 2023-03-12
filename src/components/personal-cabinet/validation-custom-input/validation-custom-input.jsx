/* eslint-disable complexity */
import { useState } from 'react';
import MaskedInput from 'react-text-mask';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import IconEyeClosed from '../../../assets/icons/btn/icon-eye-closed.svg';
import IconEyeOpen from '../../../assets/icons/btn/icon-eye-open.svg';
import IconChecked from '../../../assets/icons/btn/icon-checked.svg';

import { selectValidationErrorMessage } from '../../../store/slices/loader-slice';

import './validation-custom-input.css';

export const ValidationCustomInput = ({
  value,
  onChange,
  onBlur,
  errors,
  input,
  placeholder,
  description,
  additionalHint,
  maskPhone,
  dirtyFields,
  inputRef,
  isBlured,
  setIsBlured,
}) => {
  const { pathname: path } = useLocation();
  const errorMessage = useSelector(selectValidationErrorMessage);

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
            onChange={onChange}
            onBlur={onBlur}
          />
        ) : (
          <input
            name={input}
            className={`validation-input ${errors[input] ? 'error' : ''}`}
            onFocus={(e) => {
              setIsFocused(true);

              onBlur(e);
            }}
            onChange={(e) => {
              onChange(e);

              if (input === 'passwordConfirmation') {
                setIsBlured(true);
              }
            }}
            onBlur={(e) => {
              setIsFocused(false);
              setIsBlured(false);
              onBlur(e);
            }}
            type={`${isPassword ? (isOpenEye ? 'text' : 'password') : 'text'}`}
            ref={inputRef}
            required={true}
          />
        )}

        <label className="validation-input-placeholder">{placeholder}</label>

        {value && isPassword && (
          <button
            className="validation-input-btn-visible-password"
            onClick={() => setIsOpenEye(!isOpenEye)}
            type="button"
          >
            {!errors[input]?.message && input === 'password' && path !== '/auth' && (
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

      <div className="container-validation-input-hints">
        <div className="container-validation-input-description">
          {errorMessage && path !== '/auth' && (
            <span className="validation-input-error" data-test-id="hint">
              error
            </span>
          )}

          {!errors[input]?.message && (
            <p className="validation-input-description" data-test-id="hint">
              {description}
            </p>
          )}
        </div>

        {additionalHint && (
          <span className="container-validation-input-error" data-test-id="hint">
            {value &&
              errors[input]?.types?.matches?.length &&
              isFocused &&
              description.map((item, i) =>
                errors[input]?.types?.matches?.includes(item) ? (
                  // eslint-disable-next-line react/no-array-index-key
                  <span className="validation-input-error" data-test-id="hint" key={i}>
                    {item}
                  </span>
                ) : (
                  // eslint-disable-next-line react/no-array-index-key
                  <span data-test-id="hint" key={i}>
                    {item}
                  </span>
                )
              )}
          </span>
        )}

        {!dirtyFields[input] && (
          <span className="validation-input-error" data-test-id="hint">
            {errors[input]?.message}
          </span>
        )}

        {input !== 'passwordConfirmation' && !additionalHint && dirtyFields[input] && (
          <span className="validation-input-error" data-test-id="hint">
            {errors[input]?.message}
          </span>
        )}

        {input === 'passwordConfirmation' && !additionalHint && dirtyFields[input] && !isBlured && (
          <span className="validation-input-error" data-test-id="hint">
            {errors[input]?.message}
          </span>
        )}

        {additionalHint && !isFocused && !value && errors[input]?.types?.matches?.length && (
          <span className="validation-input-description" data-test-id="hint">
            {description}
          </span>
        )}

        {additionalHint && !isFocused && value && errors[input]?.types?.matches?.length && (
          <span className="validation-input-error" data-test-id="hint">
            {description}
          </span>
        )}

        {additionalHint && isFocused && dirtyFields[input] && errors[input]?.types?.matches?.length && !value && (
          <span className="validation-input-description" data-test-id="hint">
            {description}
          </span>
        )}
      </div>
    </div>
  );
};

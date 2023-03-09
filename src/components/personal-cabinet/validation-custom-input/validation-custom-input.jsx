/* eslint-disable complexity */
import { useState } from 'react';

import IconEyeClosed from '../../../assets/icons/btn/icon-eye-closed.svg';
import IconEyeOpen from '../../../assets/icons/btn/icon-eye-open.svg';
import IconChecked from '../../../assets/icons/btn/icon-checked.svg';

import './validation-custom-input.css';

export const ValidationCustomInput = ({ field, errors, dirtyFields, input, placeholder, description }) => {
  const [isOpenEye, setIsOpenEye] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isUsername = input === 'username' ? true : false;
  const isPassword = input === 'password' ? true : false;

  return (
    <label className="container-registration-input">
      <input
        style={{
          borderBottom: `1px solid ${errors[input] ? '#F42C4F' : '#bfc4c9'}`,
        }}
        className="registration-input"
        onFocus={() => {
          setIsFocused(false);
        }}
        onChange={(e) => {
          field.onChange(e);
        }}
        onBlur={() =>
          field.onBlur((isPassword || isUsername) && errors[input]?.message && field.value && setIsFocused(true))
        }
        placeholder={placeholder}
        type={`${isPassword ? (isOpenEye ? 'text' : 'password') : 'text'}`}
        ref={field.ref}
      />

      <div className="registration-input-error">
        {!errors[input]?.message && <p>{description}</p>}

        {!(isPassword || isUsername) && !field.value && !isFocused && (
          <span style={{ color: 'red' }}>{errors[input]?.message}</span>
        )}

        {(isPassword || isUsername) && !field.value && !isFocused && (
          <span style={{ color: 'red' }}>{errors[input]?.message}</span>
        )}

        {(isPassword || isUsername) && field.value && errors[input]?.types?.matches?.length && !isFocused && (
          <p>
            {description.map((item, i) =>
              errors[input]?.types?.matches?.includes(item) ? (
                // eslint-disable-next-line react/no-array-index-key
                <span data-test-id="hint" key={i} style={{ color: 'red' }}>
                  {item}
                </span>
              ) : (
                item
              )
            )}
          </p>
        )}

        {isFocused && field.value && <span style={{ color: 'red' }}>{description}</span>}
      </div>

      {dirtyFields?.password && isPassword && (
        <button className="registration-btn-visible-password" onClick={() => setIsOpenEye(!isOpenEye)} type="button">
          {!errors[input]?.message && (
            <img className="icon-checked" data-test-id="checkmark" src={IconChecked} alt="" />
          )}

          <img
            data-test-id={isOpenEye ? 'eye-opened' : 'eye-closed'}
            src={isOpenEye ? IconEyeOpen : IconEyeClosed}
            alt=""
          />
        </button>
      )}
    </label>
  );
};

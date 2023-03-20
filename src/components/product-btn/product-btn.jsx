/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedProduct, selectUserData, setUserData } from '../../store/slices/loader-slice';
import {
  setIdBookingBook,
  setTypeModalWindowProduct,
  toggleOpenReviewProduct,
} from '../../store/slices/navigation-slice';

export const ProductBtn = ({ product }) => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);

  const [stateBooking, setStateBooking] = useState('');
  const [typeBtn, setTypeBtn] = useState('');

  const bookedTill = new Date(product?.delivery?.dateHandedTo);
  const btnDate = `${String(bookedTill.getDate()).padStart(2, '0')}.${String(bookedTill.getMonth() + 1).padStart(
    2,
    '0'
  )}`;
  const userId = JSON.parse(localStorage.getItem('USER_DATA'))?.id || userData.id;

  const btnModalWindowHadler = () => {
    if (typeBtn === 'disabled') return;
    const typeModalWindow = typeBtn === 'primary' ? 'booking' : 'repeatBooking';

    dispatch(toggleOpenReviewProduct(true));
    dispatch(setTypeModalWindowProduct(typeModalWindow));
    dispatch(setIdBookingBook(product));
  };

  useEffect(() => {
    if (product.booking === null) {
      setStateBooking('Забронировать');
      setTypeBtn('primary');
    }

    if (product.delivery !== null) {
      setStateBooking(`Занята до ${btnDate}`);
      setTypeBtn('disabled');
    }

    if (product.booking !== null && userId === product?.booking?.customerId) {
      setStateBooking('Забронирована');
      setTypeBtn('secondary');
    }

    if (product.booking !== null && userId !== product?.booking?.customerId) {
      setStateBooking('Забронирована');
      setTypeBtn('disabled');
    }
  }, [product]);

  return (
    <button
      className={`btn-book ${typeBtn}`}
      type="button"
      onClick={(e) => {
        btnModalWindowHadler();
        e.preventDefault();
      }}
      disabled={typeBtn === 'disabled'}
      data-test-id="booking-button"
    >
      {stateBooking}
    </button>
  );
};

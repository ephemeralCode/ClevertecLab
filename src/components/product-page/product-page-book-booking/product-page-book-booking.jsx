/* eslint-disable no-lonely-if */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import 'dayjs/locale/ru';
import dayjs from 'dayjs';
import React, { useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as IconArrow } from '../../../assets/icons/general/icon-menu-arrow.svg';

import {
  bookingBookAction,
  deleteBookingBook,
  getSelectedProduct,
  productsAction,
  reBookingBook,
  selectUserData,
} from '../../../store/slices/loader-slice';
import { selectIdBookingBook, toggleOpenReviewProduct } from '../../../store/slices/navigation-slice';

import './product-page-book-booking.css';

export const ProductPageBookBooking = ({ newBooking }) => {
  dayjs.locale('ru');

  const { id } = useParams();
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const idBookingBook = useSelector(selectIdBookingBook);

  const userId = JSON.parse(localStorage.getItem('USER_DATA'))?.id || userData.id;
  const orderBooking = !newBooking && new Date(idBookingBook?.booking?.dateOrder);

  const [selectedDate, setSelectedDate] = useState(newBooking ? dayjs() : dayjs(orderBooking));
  const [selectedDay, setSelectedDay] = useState(newBooking ? null : dayjs(orderBooking));

  const currentDay = useMemo(() => (newBooking ? dayjs().toDate() : orderBooking), []);

  const firstDayOfTheMonth = useMemo(() => selectedDate.clone().startOf('month'), [selectedDate]);

  const firstDayOfFirstWeekOfMonth = useMemo(() => dayjs(firstDayOfTheMonth).startOf('week'), [firstDayOfTheMonth]);

  const stateBtn = newBooking ? selectedDay === null : selectedDay.date() === orderBooking.getDate();

  const generateFirstDayOfEachWeek = useCallback(
    (day) => {
      const dates = [day];

      for (let i = 1; i < 6; i++) {
        const date = day.clone().add(i, 'week');

        if (date.month() > selectedDate.month() || date.year() > selectedDate.year()) break;
        dates.push(date);
      }

      return dates;
    },
    [selectedDate]
  );

  const generateWeek = useCallback((day) => {
    const dates = [];

    for (let i = 0; i < 7; i++) {
      const date = day.clone().add(i, 'day').toDate();

      dates.push(date);
    }

    return dates;
  }, []);

  const generateWeeksOfTheMonth = useMemo(() => {
    const firstDayOfEachWeek = generateFirstDayOfEachWeek(firstDayOfFirstWeekOfMonth);

    return firstDayOfEachWeek.map((date) => generateWeek(date));
  }, [generateFirstDayOfEachWeek, firstDayOfFirstWeekOfMonth, generateWeek]);

  const getDayCalendar = (day, dayIndex) => {
    let classStr = 'calendarDayCell';
    const getCurrentDate = currentDay.getDate();
    const nextDay =
      currentDay.getDay() === 5
        ? currentDay.getDate(getCurrentDate) + 3
        : currentDay.getDay() === 6
        ? currentDay.getDate(getCurrentDate) + 2
        : currentDay.getDate() + 1;
    const activeDate = selectedDay?.date() === day.getDate();
    const daysOff = day.getDay() === 0 || day.getDay() === 6;
    const isSameMonth = dayjs(currentDay).isSame(day, 'month');
    const isSameDay = dayjs(currentDay).isSame(day, 'date');
    const isActive = day.getDate() === nextDay || (day.getDate() === getCurrentDate && !daysOff && isSameMonth);

    if (isSameDay) {
      classStr += ' today';
    }

    if (day.getDate() === nextDay && isSameMonth) {
      classStr += ' nextDay';
    }

    if (!isSameDay) {
      classStr += ' default';
    }

    if (selectedDate.month() === day.getMonth() && daysOff) {
      classStr += ' daysOff';
    }

    if (newBooking) {
      if (activeDate && isSameMonth) {
        classStr += ' active';
      }
    }

    if (!newBooking) {
      if (selectedDay.date() === day.getDate()) {
        classStr += ' active';
      }
    }

    return (
      <p
        className={`${classStr}`}
        key={dayIndex}
        onClick={(e) => isActive && setSelectedDay(selectedDate.date(e.target.textContent))}
        data-test-id="day-button"
      >
        {day.getDate()}
      </p>
    );
  };

  const onSubmitBooking = async (order, dateOrder, book, customer) => {
    const resultAction = await dispatch(bookingBookAction({ order, dateOrder, book, customer }));

    if (bookingBookAction.fulfilled.match(resultAction)) {
      if (id) {
        dispatch(getSelectedProduct(id));
      } else {
        dispatch(productsAction());
      }
      dispatch(toggleOpenReviewProduct(false));
    } else {
      dispatch(toggleOpenReviewProduct(false));
    }
  };

  const onSubmitRepeatBooking = async (bookingId, order, dateOrder, book, customer) => {
    const data = {
      order,
      dateOrder,
      book,
      customer,
    };

    const resultAction = await dispatch(reBookingBook({ bookingId, data }));

    if (reBookingBook.fulfilled.match(resultAction)) {
      if (id) {
        dispatch(getSelectedProduct(id));
      } else {
        dispatch(productsAction());
      }

      dispatch(toggleOpenReviewProduct(false));
    } else {
      dispatch(toggleOpenReviewProduct(false));
    }
  };

  const onSubmitDeleteBooking = async (bookingId) => {
    const resultAction = await dispatch(deleteBookingBook(bookingId));

    if (deleteBookingBook.fulfilled.match(resultAction)) {
      if (id) {
        dispatch(getSelectedProduct(id));
      } else {
        dispatch(productsAction());
      }

      dispatch(toggleOpenReviewProduct(false));
    } else {
      dispatch(toggleOpenReviewProduct(false));
    }
  };

  return (
    <React.Fragment>
      <div className="container-product-page-book-booking-title">
        <h3 className="product-page-book-booking-title" data-test-id="modal-title">
          {newBooking ? 'Выбор даты бронирования' : 'Изменение даты бронирования'}
        </h3>
      </div>

      <div className="wrapper-product-page-book-booking">
        <div className="container-calendar" data-test-id="calendar">
          <header className="container-calendar-toggle-month">
            <select
              className="calendar-select"
              onChange={(e) => setSelectedDate(dayjs().month(e.target.selectedIndex))}
              value={selectedDate.month()}
              data-test-id="month-select"
            >
              {Array(12)
                .fill(0)
                .map((_, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <option className="option-month" value={i} key={i}>
                    {`${dayjs().month(i).format('MMMM')} ${selectedDate.year()}`}
                  </option>
                ))}
            </select>

            <div className="container-calendar-btns-toggle-month">
              <button
                className="container-calendar-btn-icon-arrow"
                type="button"
                onClick={() => setSelectedDate((date) => date.subtract(1, 'month'))}
                data-test-id="button-prev-month"
              >
                <IconArrow className="calendar-btn-icon-arrow prev" />
              </button>
              <button
                className="container-calendar-btn-icon-arrow"
                type="button"
                onClick={() => setSelectedDate((date) => date.add(1, 'month'))}
                data-test-id="button-next-month"
              >
                <IconArrow className="calendar-btn-icon-arrow next" />
              </button>
            </div>
          </header>

          <section className="container-calendar-days">
            <ul className="weekDaysWrapper">
              {generateWeeksOfTheMonth[0].map((day, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <li className="weekDayCell" key={`week-day-${index}`}>
                  {dayjs(day).format('dd')}
                </li>
              ))}
            </ul>

            <ul>
              {generateWeeksOfTheMonth.map((week, weekIndex) => (
                // eslint-disable-next-line react/no-array-index-key
                <li className="calendar-content-wrapper" key={`week-${weekIndex}`}>
                  {week.map((day, dayIndex) => getDayCalendar(day, dayIndex))}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <div className="container-product-page-book-booking-btn">
        <button
          className={`product-page-book-booking-btn ${stateBtn ? 'disabled' : 'primary'}`}
          type="submit"
          disabled={stateBtn}
          onClick={() => {
            if (newBooking) {
              onSubmitBooking(true, selectedDay?.add(3, 'hour')?.toDate(), idBookingBook?.id, userId);
            } else {
              onSubmitRepeatBooking(
                idBookingBook?.booking?.id,
                true,
                selectedDay?.add(3, 'hour')?.toDate(),
                idBookingBook?.id,
                userId
              );
            }
          }}
          data-test-id="booking-button"
        >
          Забронировать
        </button>
      </div>

      {idBookingBook.booking !== null && (
        <div className="container-product-page-book-booking-btn">
          <button
            className="product-page-book-booking-btn secondary"
            type="submit"
            onClick={() => {
              onSubmitDeleteBooking(idBookingBook?.booking?.id);
            }}
            data-test-id="booking-cancel-button"
          >
            Отменить бронь
          </button>
        </div>
      )}
    </React.Fragment>
  );
};

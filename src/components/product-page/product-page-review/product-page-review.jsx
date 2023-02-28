import { ReactComponent as IconMenuArrow } from '../../../assets/icons/general/icon-menu-arrow.svg';
import userImage from '../../../assets/images/page-product/user-image.png';
import { StarRating } from '../../product-general/star-rating/star-rating';

import './product-page-review.css';

export const ProductPageReview = ({ isOpenReview, onToggleReview }) => (
  <div className="container-page-product-review">
    <div className="container-page-product-review-title">
      <button
        className="btn-page-product-review"
        type="button"
        onClick={onToggleReview}
        data-test-id="button-hide-reviews"
      >
        <h3 className="page-product-review-title">
          Отзывы <span className="page-product-review-amount">3</span>
        </h3>

        <IconMenuArrow className={`page-product-review-title-arrow ${isOpenReview ? 'active' : ''}`} />
      </button>
    </div>

    <div className={`wrapper-page-product-reviews ${isOpenReview ? 'active' : ''}`}>
      <div className="wrapper-page-product-review">
        <div className="container-page-product-review-user-info">
          <img className="page-product-review-user-img" src={userImage} alt="current user" />

          <div className="wrapper-page-product-review-user">
            <p className="page-product-review-user-name">Иван Иванов</p>
            <p className="page-product-review-date">5 января 2019</p>
          </div>
        </div>

        <div className="page-product-review-star-rate">
          <StarRating amount={4} />
        </div>
      </div>

      <div className="wrapper-page-product-review">
        <div className="container-page-product-review-user-info">
          <img className="page-product-review-user-img" src={userImage} alt="current user" />

          <div className="wrapper-page-product-review-user">
            <p className="page-product-review-user-name">Николай Качков</p>
            <p className="page-product-review-date">20 июня 2018</p>
          </div>
        </div>

        <div className="page-product-review-star-rate">
          <StarRating amount={4} />
        </div>

        <p className="page-product-review-comment">
          Учитывая ключевые сценарии поведения, курс на социально-ориентированный национальный проект не оставляет шанса
          для анализа существующих паттернов поведения. Для современного мира внедрение современных методик
          предоставляет широкие возможности для позиций, занимаемых участниками в отношении поставленных задач. Как уже
          неоднократно упомянуто, сделанные на базе интернет-аналитики выводы будут в равной степени предоставлены сами
          себе. Вот вам яркий пример современных тенденций — глубокий уровень погружения создаёт предпосылки для
          своевременного выполнения сверхзадачи. И нет сомнений, что акционеры крупнейших компаний, инициированные
          исключительно синтетически, превращены в посмешище, хотя само их существование приносит несомненную пользу
          обществу.
        </p>
      </div>

      <div className="wrapper-page-product-review">
        <div className="container-page-product-review-user-info">
          <img className="page-product-review-user-img" src={userImage} alt="current user" />

          <div className="wrapper-page-product-review-user">
            <p className="page-product-review-user-name">Екатерина Беляева</p>
            <p className="page-product-review-date">18 февраля 2018</p>
          </div>
        </div>

        <div className="page-product-review-star-rate">
          <StarRating amount={4} />
        </div>
      </div>
    </div>
  </div>
);

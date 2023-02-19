import './product-page-detailed-info.css'

export const ProductPageDetailedInfo = ({ product }) => (
    <table className="container-page-product-detailed-info-group">
        <tbody className="wrapper-page-product-detailed-info-group-first">
            <tr className="container-page-product-detailed-info-point">
                <td>
                    <span className="page-product-detailed-info-point-first">Издательство</span>
                </td>
                
                <td>
                    <span className="page-product-detailed-info-point-second">{product?.publish}</span>
                </td>
            </tr>

            <tr className="container-page-product-detailed-info-point">
                <td>
                    <span className="page-product-detailed-info-point-first">Год издания</span>
                </td>

                <td>
                    <span className="page-product-detailed-info-point-second">{product?.issueYear}</span>
                </td>
            </tr>

            <tr className="container-page-product-detailed-info-point">
                <td>
                    <span className="page-product-detailed-info-point-first">Страниц</span>
                </td>

                <td>
                    <span className="page-product-detailed-info-point-second">{product?.pages}</span>
                </td>
            </tr>

            <tr className="container-page-product-detailed-info-point">
                <td>
                    <span className="page-product-detailed-info-point-first">Переплёт</span>
                </td>

                <td>
                    <span className="page-product-detailed-info-point-second">{product?.cover}</span>
                </td>
            </tr>

            <tr className="container-page-product-detailed-info-point">
                <td>
                    <span className="page-product-detailed-info-point-first">Формат</span>
                </td>

                <td>
                    <span className="page-product-detailed-info-point-second">{product?.format}</span>
                </td>
            </tr>
        </tbody>

        <tbody className="wrapper-page-product-detailed-info-group-second">
            <tr className="container-page-product-detailed-info-point">
                <td>
                    <span className="page-product-detailed-info-point-first">Жанр</span>
                </td>

                <td>
                    <span className="page-product-detailed-info-point-second">{product?.categories}</span>
                </td>
            </tr>

            <tr className="container-page-product-detailed-info-point">
                <td>
                    <span className="page-product-detailed-info-point-first">Вес</span>
                </td>

                <td>
                    <span className="page-product-detailed-info-point-second">{`${product?.weight} г.`}</span>
                </td>
            </tr>

            <tr className="container-page-product-detailed-info-point">
                <td>
                    <span className="page-product-detailed-info-point-first">ISBN</span>
                </td>

                <td>
                    <span className="page-product-detailed-info-point-second">{product?.ISBN}</span>
                </td>
            </tr>

            <tr className="container-page-product-detailed-info-point">
                <td>
                    <span className="page-product-detailed-info-point-first">Изготовитель</span>
                </td>

                <td>
                    <span className="page-product-detailed-info-point-second">{product?.producer}</span>
                </td>
            </tr>
        </tbody>
    </table>
)
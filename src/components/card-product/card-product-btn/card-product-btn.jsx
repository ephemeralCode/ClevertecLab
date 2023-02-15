export const CardProductBtn = ({ isBooked, groupCardProducts }) => {
    const bookedTill = new Date((isBooked?.dateOrder))
    
    return (
        <button className={`btn-book ${groupCardProducts} ${isBooked?.order ? 'disabled' : 'primary'}`} type='button'>
            {
                isBooked?.order ?
                    `Занято до ${String(bookedTill.getDay()).padStart(2, '0')}.${String(bookedTill.getMonth()).padStart(2, '0')}`

                    :

                    'Забронировать'
            }
        </button>
    )
}
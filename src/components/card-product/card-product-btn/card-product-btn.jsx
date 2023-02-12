export const CardProductBtn = ({ bookedTill, isBooked, groupCardProducts }) => {
    const dateBooked = new Date((bookedTill).split(' ')[0])

    return (
        <button className={`btn-book ${groupCardProducts} ${isBooked ? 'disabled' : 'primary'}`} type='button'>
            {
                isBooked ?
                    `Занято до ${String(dateBooked.getDay()).padStart(2, '0')}.${String(dateBooked.getMonth()).padStart(2, '0')}`

                    :

                    'Забронировать'
            }
        </button>
    )
}
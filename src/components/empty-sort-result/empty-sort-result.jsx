import './empty-sort-result.css'

export const EmptySortResult = ({ content }) => {
    const text = 'В этой категории книг ещё нет'

    return (
        <p className='main-content-empty-sort-result'>{text}</p>
    )
}
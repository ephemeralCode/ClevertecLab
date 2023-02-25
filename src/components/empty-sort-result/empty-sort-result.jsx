import './empty-sort-result.css'

export const EmptySortResult = ({ content, dataTestId }) => {
    const text = content === 'category' ? 'В этой категории книг ещё нет' : 'По запросу ничего не найдено'

    return (
        <p className='main-content-empty-sort-result' data-test-id={dataTestId}>{text}</p>
    )
}
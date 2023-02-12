import './btn-group.css'

export const BtnGroup = ({ active, groupValue, setGroupCardProducts, dataTestId, icon }) => (
    <button 
        className={`btn-group ${active ? 'btn-group-active' : 'btn-group-default'}`}
        type='button'
        onClick={() => setGroupCardProducts(groupValue)}
        
        data-test-id={dataTestId}
    >
        { icon }
    </button>
)
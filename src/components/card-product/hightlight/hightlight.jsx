import './hightlight.css'

export const Hightlight = ({ filter, str }) => {
    const regexp = new RegExp(filter, 'ig')
    const matchValue = str.match(regexp)
  
    if (matchValue) {
        return str.split(regexp).map((item, i, arr) => {
            if (i < arr.length - 1) {
                const arrSymbol = matchValue.shift()

                // eslint-disable-next-line react/no-array-index-key
                return <>{item}<span className='hightlight' key={i} data-test-id='highlight-matches'>{arrSymbol}</span></>
            }

            return item
      })
    }

    return str
}
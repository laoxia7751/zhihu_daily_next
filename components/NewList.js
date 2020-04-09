import Link from 'next/link'

const NewList = (props) => {
    return (
        <ul className="new_list">
            {
                props.list.map(item=>
                    <li key={item.id}>
                        <Link href={'/details?id='+item.id}>
                            <a>
                            <div className="info">
                                <h4>{item.title}</h4>
                                <p>{item.hint}</p>
                            </div>
                            <div className="img">
                                <img src={item.images[0]} alt={item.title}/>
                            </div>
                            </a>
                        </Link>
                    </li>
                )
            }
            
        </ul>
    )
}

export default NewList
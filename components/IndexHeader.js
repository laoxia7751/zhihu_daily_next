
const indexHeader = (props) => {

    return (
        <div className="header">
            <div className="date">
                <span className="day">{props.date.substr(-2,2)}</span>
                <span className="month">{parseInt(props.date.substr(4,2))}月</span>
            </div>
            <div className="title">知乎日报</div>
            <div 
                className="avatar" 
                style={{'backgroundImage': 'url(https://pic4.zhimg.com/da8e974dc_im.jpg)'}}
            >
            </div>
        </div>
    )
}

export default indexHeader
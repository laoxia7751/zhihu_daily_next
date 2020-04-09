import { Carousel } from 'antd-mobile';
import Link from 'next/link'
import { getRgbColor } from '../utils'

const IndexBanner = (props) => {
  let { list } = props
  return (
    <Carousel
      autoplay={false}
      infinite
      dotStyle={{ background: 'rgba(255,255,255,0.7)', borderRadius: '4px' }}
      dotActiveStyle={{ background: '#ffffff', width: '30px', borderRadius: '4px' }}
      beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
      afterChange={index => console.log('slide to', index)}
    >
      {list.map(item => (
        <Link key={item.id} href={'/details?id='+item.id}>
        <a
          style={{ display: 'block', width: '100%', height: 'auto', position: 'relative' }}
        >
          <img
            src={item.image}
            alt={item.title}
            style={{ width: '100%', verticalAlign: 'top', display: 'block', height: '100vw' }}
          />
          <div
            className="banner_info"
            style={{ background: `linear-gradient(0deg, ${getRgbColor(item.image_hue, 0.4)} 0%, ${getRgbColor(item.image_hue, 0)} 100%)` }}>
            <h2>{item.title}</h2>
            <p>{item.hint}</p>
          </div>
        </a>
        </Link>
      ))}
    </Carousel>
  )
}

export default IndexBanner;
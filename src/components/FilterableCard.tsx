import type { FC } from 'react';
import { language } from '../consts/message';

interface Props {
  thumbnail: string;
  title: string;
  description: string;
  href: string;
}

export const FilterableCard: FC<Props> = ({thumbnail, title, description, href}) => {
  return (
    <div className='card mb-3'>
      <img src={thumbnail} alt={title}
        className='card-img-top object-fit-cover'
        style={{maxHeight: '9rem'}} 
      />
      <div className='card-body'>
        <h5 className='card-title'>{ title }</h5>
        <p className='card-text'>{ description }</p>
        <a href={href} className='btn btn-primary'>{ language.SHOW_POST }</a>
      </div>

    </div>
  )
}
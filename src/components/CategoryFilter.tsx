import { useState, type ChangeEvent, type FC } from 'react';
import type { Category } from '../consts/variables';

interface Props {
  categories: Category[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CategoryFilter: FC<Props> = ({ categories, onChange }) => {

  return (
    <div className="offcanvas offcanvas-start" tabIndex={-1} id="offcanvas" aria-labelledby="offcanvasLabel">
    <div className="offcanvas-header">
      <h5 className="offcanvas-title" id="offcanvasLabel">Off canvas</h5>
      <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div className="offcanvas-body">
      <ul className="list-group">
        {
          categories.map(category => (
            <li className="list-group-item d-flex align-items-center" key={category.id}>
              <input 
                type="checkbox" 
                className="form-check-input me-1"
                value={category.id}
                id={category.id}
                onChange={onChange}
              />
              <label htmlFor={category.id} className="form-check-label">{ category.name }</label>
              <span className="badge bg-primary rounded-pill ms-auto"> { category.count } </span>
            </li>
          ))
        }
      </ul>
    </div>
  </div>
  );
};

export default CategoryFilter;
import { use, useEffect, type ChangeEvent, type FC } from "react";
import { FilterableCard } from "./FilterableCard";
import type { CardProps } from "../consts/variables";
import CategoryFilter from "./CategoryFilter";
import type { Category } from "../consts/variables";
import { useState } from "react";

interface Props {
  posts: CardProps[];
}

const getCategories = (posts: CardProps[]) => {
  const categoryMap: Category[] = [];
  posts.forEach(post => {
    const matchedCategory = categoryMap.find(category => category.id == post.category.id);
    if (matchedCategory) {
      matchedCategory.count++;
    } else {
      categoryMap.push({ name: post.category.name, count: 1, id: post.category.id });
    }
  });
  
  return categoryMap;
}

const FilterablePosts: FC<Props> = ({posts}) => {
  const [checkedCategories, setCheckedCategories] = useState<string[]>([]);
  const [filteredPosts, setPosts] = useState<CardProps[]>(posts);

  useEffect (() => {
    const resutls = posts.filter(post => {
      if (checkedCategories.length <= 0)
        return true;
      return checkedCategories.includes(post.category.id)
    })
    setPosts(resutls)
  }, [checkedCategories])

  const setCategories = (e: ChangeEvent<HTMLInputElement>) => {
    const id = e.target.value;
    let categories = []
    if (checkedCategories.includes(id)) {
      categories = checkedCategories.filter(cat => cat !== id)

      setCheckedCategories(categories);
    }
    else {
      categories = [...checkedCategories, id]
      setCheckedCategories(categories);
    }
  }

  return (
    <div className="row w-100">
      {/* <CategoryFilter categories={getCategories(posts)} onChange={setCategories} />
      {
        filteredPosts.map(post => (
          <div className="col-lg-3 col-md-6 col-sm-12" key={post.title}>
            <FilterableCard
              thumbnail={post.thumbnail}
              title={post.title}
              description={post.description}
              href={`/UnityContent/${post.directory}/${post.slug}`}
            />
          </div>
        ))
      } */}
    </div>
  )
}

export default FilterablePosts;
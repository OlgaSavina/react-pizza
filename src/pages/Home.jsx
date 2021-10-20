import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Categories, SortPopup, PizzaBlock, LoadingBlock } from "../components";
import { setCategory, setSortBy } from "../redux/actions/filters";
import { fetchPizzas } from "../redux/actions/pizzas";
import { addPizzaToCart } from "../redux/actions/cart";


function Home() {
  const dispatch = useDispatch();
  const  items  = useSelector(({ pizzas}) => pizzas.items);
  const  cartItems  = useSelector(({ cart}) => cart.items);
  const  isLoaded  = useSelector(({ pizzas}) => pizzas.isLoaded);
  const  {category, sortBy}  = useSelector(({ filters}) => filters);
  React.useEffect(() => {

  
      dispatch(fetchPizzas(sortBy,category));
    

  
  }, [sortBy, category]);
  
  const onSelectCategory  = React.useCallback(index => {
    dispatch(setCategory(index));

  },[]);

  const onSelectSortType  = React.useCallback(type => {
    dispatch(setSortBy(type));
  },[]);


  const handleAddPizzaToCart = (obj) => {
    dispatch(addPizzaToCart(obj));

  };
 
 


  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory ={category}
          onClickCategory={onSelectCategory}
          items={["Мясные", "Вегетерианские", "Гриль", "Острые", "Закрытые"]}
        />
        <SortPopup activeSortType ={sortBy.type} onClickSortType = {onSelectSortType}
          items={[
            { name: "популярности", type: "popular", order:'desc' },
            { name: "цене", type: "price", order:'desc' },
            { name: "алфавиту", type: "name",order:'asc' },
          ]}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoaded 
        ? items.map((obj) => 
        <PizzaBlock 
        onClickAddPizza={handleAddPizzaToCart} 
        key={obj.id} 
        addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
        isLoading ={true} 
        {...obj} 
        />)
        : Array(10)
        .fill(0)
        .map((_,index)=> <LoadingBlock key={index} />)}
      </div>
    </div>
  );
}

export default Home;

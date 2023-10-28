import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);
  console.log(items);
  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      .then((data) => {
        setItems(data);
      });
  }, []);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  // add a new item
  const handleAddItem = (newItem) => {
    setItems((previtems) => [...previtems, newItem]);
  };

  // update item
  const handleUpdateItem = (updatedItem) => {
    const newItems = items.map((item) => {
      if (updatedItem.id === item.id) {
        return updatedItem;
      } else {
        return item;
      }
    });
    setItems(newItems);
  };

  // delete item
  const handleDeleteItem = (id) => {
    const deleteItem = items.filter((item) => item.id !== id);
    setItems(deleteItem);
  };
  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;

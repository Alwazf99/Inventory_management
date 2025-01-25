import React, { useState } from "react";
import InventoryTable from "./components/InventoryTable";
import AddEditItemModal from "./components/AddEditItemModal";
import FilterBar from "./components/FilterBar";

const App = () => {
  const [inventory, setInventory] = useState([
    { id: 1, name: "Item 1", category: "Electronics", quantity: 5 },
    { id: 2, name: "Item 2", category: "Clothing", quantity: 20 },
  ]);
  const [filteredCategory, setFilteredCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [modalData, setModalData] = useState({ isOpen: false, item: null });

  // Add or Edit item
  const handleSaveItem = (item) => {
    if (item.id) {
      setInventory((prev) =>
        prev.map((i) => (i.id === item.id ? item : i))
      );
    } else {
      setInventory((prev) => [
        ...prev,
        { ...item, id: Date.now() },
      ]);
    }
    setModalData({ isOpen: false, item: null });
  };

  // Delete item
  const handleDeleteItem = (id) => {
    setInventory((prev) => prev.filter((item) => item.id !== id));
  };

  // Filter items by category
  const filteredInventory = filteredCategory
    ? inventory.filter((item) => item.category === filteredCategory)
    : inventory;

  // Sort items by quantity
  const sortedInventory = [...filteredInventory].sort((a, b) =>
    sortOrder === "asc" ? a.quantity - b.quantity : b.quantity - a.quantity
  );

  return (
    <div className="app">
      <h1>Inventory Management</h1>
      <FilterBar
        categories={[...new Set(inventory.map((item) => item.category))]}
        setFilteredCategory={setFilteredCategory}
        setSortOrder={setSortOrder}
      />
      <InventoryTable
        inventory={sortedInventory}
        onEdit={(item) => setModalData({ isOpen: true, item })}
        onDelete={handleDeleteItem}
      />
      <button onClick={() => setModalData({ isOpen: true, item: null })}>
        Add Item
      </button>
      {modalData.isOpen && (
        <AddEditItemModal
          item={modalData.item}
          onSave={handleSaveItem}
          onClose={() => setModalData({ isOpen: false, item: null })}
        />
      )}
    </div>
  );
};

export default App;

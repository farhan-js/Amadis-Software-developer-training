import { useEffect, useState } from "react";
import ClothingForm from "../components/ClothingForm";
import WardrobeList from "../components/WardrobeList";

export interface ClothingItem {
  id: number;
  name: string;
  category: string;
  warmth: string;
  rainFriendly: boolean;
}

export default function WardrobePage() {
  // Load wardrobe from Local Storage
  const [wardrobe, setWardrobe] = useState<ClothingItem[]>(() => {
    const savedWardrobe = localStorage.getItem("wardrobe");
    return savedWardrobe ? JSON.parse(savedWardrobe) : [];
  });

  // Currently editing item
  const [editingItem, setEditingItem] = useState<ClothingItem | null>(null);

  // Save whenever wardrobe changes
  useEffect(() => {
    localStorage.setItem("wardrobe", JSON.stringify(wardrobe));
  }, [wardrobe]);

  // Add Clothing
  const addClothing = (item: ClothingItem) => {
    setWardrobe((prev) => [...prev, item]);
  };

  // Delete Clothing
  const deleteClothing = (id: number) => {
    setWardrobe((prev) => prev.filter((item) => item.id !== id));

    // If the deleted item is being edited, cancel editing
    if (editingItem?.id === id) {
      setEditingItem(null);
    }
  };

  // Update Clothing
  const updateClothing = (updatedItem: ClothingItem) => {
    setWardrobe((prev) =>
      prev.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );

    setEditingItem(null);
  };

  return (
    <div className="space-y-8">
      {/* Page Heading */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">
          Manage Your Wardrobe
        </h1>

        <p className="text-gray-500 mt-2">
          Add, edit and manage your clothing items.
        </p>
      </div>

      {/* Form & List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ClothingForm
          onAddClothing={addClothing}
          onUpdateClothing={updateClothing}
          editingItem={editingItem}
        />

        <WardrobeList
          wardrobe={wardrobe}
          onDelete={deleteClothing}
          onEdit={setEditingItem}
        />
      </div>
    </div>
  );
}
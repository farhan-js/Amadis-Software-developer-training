// import { useEffect, useState } from "react";
// import ClothingForm from "../components/ClothingForm";
// import WardrobeList from "../components/WardrobeList";

// export interface ClothingItem {
//   id: number;
//   name: string;
//   category: string;
//   warmth: string;
//   rainFriendly: boolean;
// }

// export default function WardrobePage() {
//   // Load wardrobe from Local Storage
//   const [wardrobe, setWardrobe] = useState<ClothingItem[]>(() => {
//     const savedWardrobe = localStorage.getItem("wardrobe");
//     return savedWardrobe ? JSON.parse(savedWardrobe) : [];
//   });

//   // Currently editing item
//   const [editingItem, setEditingItem] = useState<ClothingItem | null>(null);

//   // Save whenever wardrobe changes
//   useEffect(() => {
//     localStorage.setItem("wardrobe", JSON.stringify(wardrobe));
//   }, [wardrobe]);

//   // Add Clothing
//   const addClothing = (item: ClothingItem) => {
//     setWardrobe((prev) => [...prev, item]);
//   };

//   // Delete Clothing
//   const deleteClothing = (id: number) => {
//     setWardrobe((prev) => prev.filter((item) => item.id !== id));

//     // If the deleted item is being edited, cancel editing
//     if (editingItem?.id === id) {
//       setEditingItem(null);
//     }
//   };

//   // Update Clothing
//   const updateClothing = (updatedItem: ClothingItem) => {
//     setWardrobe((prev) =>
//       prev.map((item) =>
//         item.id === updatedItem.id ? updatedItem : item
//       )
//     );

//     setEditingItem(null);
//   };

//   return (
//     <div className="space-y-8">
//       {/* Page Heading */}
//       <div className="text-center">
//         <h1 className="text-3xl font-bold">
//           Manage Your Wardrobe
//         </h1>

//         <p className="text-gray-500 mt-2">
//           Add, edit and manage your clothing items.
//         </p>
//       </div>

//       {/* Form & List */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <ClothingForm
//           onAddClothing={addClothing}
//           onUpdateClothing={updateClothing}
//           editingItem={editingItem}
//         />

//         <WardrobeList
//           wardrobe={wardrobe}
//           onDelete={deleteClothing}
//           onEdit={setEditingItem}
//         />
//       </div>
//     </div>
//   );
// }

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

  // Save wardrobe to Local Storage
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
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-purple-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block bg-white px-8 py-6 rounded-3xl shadow-lg">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              👕 My Wardrobe
            </h1>

            <p className="mt-3 text-gray-600 text-lg">
              Add, edit and organize your clothes with ease.
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">

          <div className="bg-white rounded-2xl shadow-md p-5 text-center">
            <p className="text-gray-500 font-medium">
              Total Clothes
            </p>

            <h2 className="text-4xl font-bold text-blue-600 mt-2">
              {wardrobe.length}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 text-center">
            <p className="text-gray-500 font-medium">
              Categories
            </p>

            <h2 className="text-4xl font-bold text-purple-600 mt-2">
              {
                new Set(
                  wardrobe.map((item) => item.category)
                ).size
              }
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 text-center">
            <p className="text-gray-500 font-medium">
              Rain Friendly
            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-2">
              {
                wardrobe.filter(
                  (item) => item.rainFriendly
                ).length
              }
            </h2>
          </div>

        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left */}
          <div className="bg-white rounded-3xl shadow-xl border border-blue-100 p-6">
            <ClothingForm
              onAddClothing={addClothing}
              onUpdateClothing={updateClothing}
              editingItem={editingItem}
            />
          </div>

          {/* Right */}
          <div className="bg-white rounded-3xl shadow-xl border border-purple-100 p-6">
            <WardrobeList
              wardrobe={wardrobe}
              onDelete={deleteClothing}
              onEdit={setEditingItem}
            />
          </div>

        </div>

      </div>
    </div>
  );
}
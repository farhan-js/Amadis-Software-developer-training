// import { useEffect, useMemo, useState } from "react";
// import WeatherForm from "../components/WeatherForm";
// import OutfitCard from "../components/OutfitCard";

// export interface ClothingItem {
//   id: number;
//   name: string;
//   category: string;
//   warmth: string;
//   rainFriendly: boolean;
// }

// export default function OutfitPage() {
//   const [wardrobe, setWardrobe] = useState<ClothingItem[]>([]);
//   const [temperature, setTemperature] = useState("");
//   const [rain, setRain] = useState(false);
//   const [suggestionIndex, setSuggestionIndex] = useState(0);

//   // Load wardrobe from Local Storage
//   useEffect(() => {
//     const data = localStorage.getItem("wardrobe");

//     if (data) {
//       setWardrobe(JSON.parse(data));
//     }
//   }, []);

//   // Reset suggestion when weather changes
//   useEffect(() => {
//     setSuggestionIndex(0);
//   }, [temperature, rain]);

//   // Filter wardrobe based on weather
//   const filteredWardrobe = useMemo(() => {
//     return wardrobe.filter((item) => {
//       // Rain
//       if (rain && !item.rainFriendly) {
//         return false;
//       }

//       // No temperature entered
//       if (temperature === "") {
//         return true;
//       }

//       const temp = Number(temperature);

//       // Hot Weather
//       if (temp > 28) {
//         return item.warmth === "Light";
//       }

//       // Moderate Weather
//       if (temp >= 18 && temp <= 28) {
//         return (
//           item.warmth === "Light" ||
//           item.warmth === "Medium"
//         );
//       }

//       // Cold Weather
//       return (
//         item.warmth === "Medium" ||
//         item.warmth === "Warm"
//       );
//     });
//   }, [wardrobe, temperature, rain]);

//   // Separate clothing categories
//   const tops = filteredWardrobe.filter(
//     (item) => item.category === "Top"
//   );

//   const bottoms = filteredWardrobe.filter(
//     (item) => item.category === "Bottom"
//   );

//   const jackets = filteredWardrobe.filter(
//     (item) => item.category === "Jacket"
//   );

//   const shoes = filteredWardrobe.filter(
//     (item) => item.category === "Shoes"
//   );

//   // Find missing categories
//   const missingItems: string[] = [];

//   if (tops.length === 0) {
//     missingItems.push("Top");
//   }

//   if (bottoms.length === 0) {
//     missingItems.push("Bottom");
//   }

//   if (shoes.length === 0) {
//     missingItems.push("Shoes");
//   }

//   if (
//     temperature !== "" &&
//     Number(temperature) < 18 &&
//     jackets.length === 0
//   ) {
//     missingItems.push("Jacket");
//   }

//   // Generate outfit
//   const outfit = useMemo(() => {
//     if (missingItems.length > 0) {
//       return null;
//     }

//     const top =
//       tops[suggestionIndex % tops.length];

//     const bottom =
//       bottoms[suggestionIndex % bottoms.length];

//     const shoe =
//       shoes[suggestionIndex % shoes.length];

//     let jacket = null;

//     if (
//       temperature !== "" &&
//       Number(temperature) < 18
//     ) {
//       jacket =
//         jackets[suggestionIndex % jackets.length];
//     }

//     return {
//       top,
//       bottom,
//       jacket,
//       shoe,
//     };
//   }, [
//     tops,
//     bottoms,
//     shoes,
//     jackets,
//     suggestionIndex,
//     temperature,
//     missingItems,
//   ]);

//   const suggestAnother = () => {
//     setSuggestionIndex((prev) => prev + 1);
//   };

//   return (
//     <div className="space-y-8">
//       {/* Heading */}
//       <div className="text-center">
//         <h1 className="text-3xl font-bold">
//           Today's Outfit Suggestion
//         </h1>

//         <p className="text-gray-500 mt-2">
//           Enter today's weather and get a suitable outfit.
//         </p>
//       </div>

//       {/* Layout */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <WeatherForm
//           temperature={temperature}
//           setTemperature={setTemperature}
//           rain={rain}
//           setRain={setRain}
//         />

//         <OutfitCard
//           outfit={outfit}
//           temperature={Number(temperature)}
//           missingItems={missingItems}
//           onSuggestAnother={suggestAnother}
//         />
//       </div>
//     </div>
//   );
// }



import { useEffect, useMemo, useState } from "react";
import WeatherForm from "../components/WeatherForm";
import OutfitCard from "../components/OutfitCard";

export interface ClothingItem {
  id: number;
  name: string;
  category: string;
  warmth: string;
  rainFriendly: boolean;
}

export default function OutfitPage() {
  const [wardrobe, setWardrobe] = useState<ClothingItem[]>([]);
  const [temperature, setTemperature] = useState("");
  const [rain, setRain] = useState(false);
  const [suggestionIndex, setSuggestionIndex] = useState(0);

  // Load wardrobe from Local Storage
  useEffect(() => {
    const data = localStorage.getItem("wardrobe");

    if (data) {
      setWardrobe(JSON.parse(data));
    }
  }, []);

  // Reset suggestion whenever weather changes
  useEffect(() => {
    setSuggestionIndex(0);
  }, [temperature, rain]);

  // Filter wardrobe based on weather
  const filteredWardrobe = useMemo(() => {
    return wardrobe.filter((item) => {
      // Rain check
      if (rain && !item.rainFriendly) {
        return false;
      }

      // If no temperature entered
      if (temperature === "") {
        return true;
      }

      const temp = Number(temperature);

      // Hot Weather
      if (temp > 28) {
        return item.warmth === "Light";
      }

      // Pleasant Weather
      if (temp >= 18 && temp <= 28) {
        return (
          item.warmth === "Light" ||
          item.warmth === "Medium"
        );
      }

      // Cold Weather
      return (
        item.warmth === "Medium" ||
        item.warmth === "Warm"
      );
    });
  }, [wardrobe, temperature, rain]);

  // Categories
  const tops = filteredWardrobe.filter(
    (item) => item.category === "Top"
  );

  const bottoms = filteredWardrobe.filter(
    (item) => item.category === "Bottom"
  );

  const jackets = filteredWardrobe.filter(
    (item) => item.category === "Jacket"
  );

  const shoes = filteredWardrobe.filter(
    (item) => item.category === "Shoes"
  );

  // Missing Items
  const missingItems: string[] = [];

  if (tops.length === 0) missingItems.push("Top");
  if (bottoms.length === 0) missingItems.push("Bottom");
  if (shoes.length === 0) missingItems.push("Shoes");

  if (
    temperature !== "" &&
    Number(temperature) < 18 &&
    jackets.length === 0
  ) {
    missingItems.push("Jacket");
  }

  // Outfit Suggestion
  const outfit = useMemo(() => {
    if (missingItems.length > 0) {
      return null;
    }

    const top =
      tops[suggestionIndex % tops.length];

    const bottom =
      bottoms[suggestionIndex % bottoms.length];

    const shoe =
      shoes[suggestionIndex % shoes.length];

    let jacket = null;

    if (
      temperature !== "" &&
      Number(temperature) < 18
    ) {
      jacket =
        jackets[suggestionIndex % jackets.length];
    }

    return {
      top,
      bottom,
      jacket,
      shoe,
    };
  }, [
    tops,
    bottoms,
    shoes,
    jackets,
    suggestionIndex,
    temperature,
    missingItems,
  ]);

  const suggestAnother = () => {
    setSuggestionIndex((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-blue-50 to-purple-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block bg-white px-8 py-6 rounded-3xl shadow-lg">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              🌤️ Weather Outfit Advisor
            </h1>

            <p className="mt-3 text-gray-600 text-lg">
              Enter today's weather and receive a personalized outfit recommendation.
            </p>
          </div>
        </div>

        {/* Weather Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

          <div className="bg-white rounded-2xl shadow-md p-5 text-center">
            <p className="text-gray-500 font-medium">
              Wardrobe Items
            </p>

            <h2 className="text-4xl font-bold text-blue-600 mt-2">
              {wardrobe.length}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 text-center">
            <p className="text-gray-500 font-medium">
              Temperature
            </p>

            <h2 className="text-4xl font-bold text-orange-500 mt-2">
              {temperature === ""
                ? "--"
                : `${temperature}°C`}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 text-center">
            <p className="text-gray-500 font-medium">
              Weather
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {rain ? "🌧️ Rainy" : "☀️ Dry"}
            </h2>
          </div>

        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <div className="bg-white rounded-3xl shadow-xl border border-cyan-100 p-6">
            <WeatherForm
              temperature={temperature}
              setTemperature={setTemperature}
              rain={rain}
              setRain={setRain}
            />
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-purple-100 p-6">
            <OutfitCard
              outfit={outfit}
              temperature={Number(temperature)}
              missingItems={missingItems}
              onSuggestAnother={suggestAnother}
            />
          </div>

        </div>

      </div>
    </div>
  );
}
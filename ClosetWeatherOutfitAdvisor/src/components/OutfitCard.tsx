import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface ClothingItem {
  id: number;
  name: string;
  category: string;
  warmth: string;
  rainFriendly: boolean;
}

interface Outfit {
  top: ClothingItem;
  bottom: ClothingItem;
  jacket: ClothingItem | null;
  shoe: ClothingItem;
}

interface OutfitCardProps {
  outfit: Outfit | null;
  temperature: number;
  missingItems: string[];
  onSuggestAnother: () => void;
}

export default function OutfitCard({
  outfit,
  temperature,
  missingItems,
  onSuggestAnother,
}: OutfitCardProps) {
  // Not enough items
  if (!outfit) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Today's Outfit</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="rounded-md border border-red-300 bg-red-50 p-4">
            <p className="font-semibold text-red-600">
              Cannot create a complete outfit.
            </p>

            <p className="text-sm text-gray-600 mt-2">
              Your wardrobe is missing the following item(s):
            </p>

            <ul className="list-disc list-inside mt-3 text-sm">
              {missingItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <p className="text-sm text-gray-500 mt-4">
              Please add the missing clothing item(s) to your wardrobe.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Outfit</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Top */}
        <div className="rounded-md border p-4">
          <h3 className="font-semibold">👕 Top</h3>
          <p>{outfit.top.name}</p>
        </div>

        {/* Bottom */}
        <div className="rounded-md border p-4">
          <h3 className="font-semibold">👖 Bottom</h3>
          <p>{outfit.bottom.name}</p>
        </div>

        {/* Jacket */}
        {temperature < 18 && outfit.jacket && (
          <div className="rounded-md border p-4">
            <h3 className="font-semibold">🧥 Jacket</h3>
            <p>{outfit.jacket.name}</p>
          </div>
        )}

        {/* Shoes */}
        <div className="rounded-md border p-4">
          <h3 className="font-semibold">👟 Shoes</h3>
          <p>{outfit.shoe.name}</p>
        </div>

        <Button className="w-full" onClick={onSuggestAnother}>
          Suggest Another Outfit
        </Button>
      </CardContent>
    </Card>
  );
}

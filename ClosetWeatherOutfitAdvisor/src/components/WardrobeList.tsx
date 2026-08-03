import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import type { ClothingItem } from "../pages/WardrobePage";

interface WardrobeListProps {
  wardrobe: ClothingItem[];
  onDelete: (id: number) => void;
  onEdit: (item: ClothingItem) => void;
}

export default function WardrobeList({
  wardrobe,
  onDelete,
  onEdit,
}: WardrobeListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Wardrobe</CardTitle>
      </CardHeader>

      <CardContent>
        {wardrobe.length === 0 ? (
          <p className="text-center text-gray-500">
            No clothing items added yet.
          </p>
        ) : (
          <div className="space-y-4">
            {wardrobe.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border rounded-lg p-4"
              >
                {/* Item Details */}
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-600">
                    <strong>Category:</strong> {item.category}
                  </p>

                  <p className="text-sm text-gray-600">
                    <strong>Warmth:</strong> {item.warmth}
                  </p>

                  <p className="text-sm text-gray-600">
                    <strong>Rain Friendly:</strong>{" "}
                    {item.rainFriendly ? "Yes" : "No"}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => onEdit(item)}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={() => onDelete(item.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
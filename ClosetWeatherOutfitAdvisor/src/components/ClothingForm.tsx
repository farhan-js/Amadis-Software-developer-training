import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";
import type { ClothingItem } from "../pages/WardrobePage";

interface ClothingFormProps {
  onAddClothing: (item: ClothingItem) => void;
  onUpdateClothing: (item: ClothingItem) => void;
  editingItem: ClothingItem | null;
}

export default function ClothingForm({
  onAddClothing,
  onUpdateClothing,
  editingItem,
}: ClothingFormProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [warmth, setWarmth] = useState("");
  const [rainFriendly, setRainFriendly] = useState(false);

  // Fill the form when editing
  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name);
      setCategory(editingItem.category);
      setWarmth(editingItem.warmth);
      setRainFriendly(editingItem.rainFriendly);
    } else {
      clearForm();
    }
  }, [editingItem]);

  const clearForm = () => {
    setName("");
    setCategory("");
    setWarmth("");
    setRainFriendly(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !category || !warmth) {
      alert("Please fill all fields.");
      return;
    }

    if (editingItem) {
      onUpdateClothing({
        id: editingItem.id,
        name,
        category,
        warmth,
        rainFriendly,
      });
    } else {
      onAddClothing({
        id: Date.now(),
        name,
        category,
        warmth,
        rainFriendly,
      });
    }

    clearForm();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {editingItem ? "Edit Clothing Item" : "Add Clothing Item"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Clothing Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Clothing Name</Label>

            <Input
              id="name"
              placeholder="Enter clothing name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Category</Label>

            <Select
              value={category}
              onValueChange={(value) => {
                if (value) {
                  setCategory(value);
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Top">Top</SelectItem>
                <SelectItem value="Bottom">Bottom</SelectItem>
                <SelectItem value="Jacket">Jacket</SelectItem>
                <SelectItem value="Shoes">Shoes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Warmth */}
          <div className="space-y-2">
            <Label>Warmth Level</Label>

            <Select
              value={warmth}
              onValueChange={(value) => {
                if (value) {
                  setWarmth(value);
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Warmth Level" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Light">Light</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Warm">Warm</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Rain Friendly */}
          <div className="flex items-center justify-between">
            <Label>Rain Friendly</Label>

            <Switch checked={rainFriendly} onCheckedChange={setRainFriendly} />
          </div>

          <Button type="submit" className="w-full">
            {editingItem ? "Update Clothing" : "Add Clothing"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

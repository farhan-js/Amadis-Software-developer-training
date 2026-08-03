import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

interface WeatherFormProps {
  temperature: string;
  setTemperature: React.Dispatch<React.SetStateAction<string>>;
  rain: boolean;
  setRain: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function WeatherForm({
  temperature,
  setTemperature,
  rain,
  setRain,
}: WeatherFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Weather</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Temperature */}
        <div className="space-y-2">
          <Label htmlFor="temperature">
            Temperature (°C)
          </Label>

          <Input
            id="temperature"
            type="number"
            placeholder="Enter temperature"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
          />
        </div>

        {/* Rain Switch */}
        <div className="flex items-center justify-between">
          <Label htmlFor="rain">
            Is it raining?
          </Label>

          <Switch
            id="rain"
            checked={rain}
            onCheckedChange={setRain}
          />
        </div>

        {/* Weather Summary */}
        <div className="rounded-md border p-4 bg-gray-50">
          <h3 className="font-semibold mb-2">
            Weather Summary
          </h3>

          <p>
            <strong>Temperature:</strong>{" "}
            {temperature === "" ? "--" : `${temperature}°C`}
          </p>

          <p>
            <strong>Rain:</strong>{" "}
            {rain ? "Yes 🌧️" : "No ☀️"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
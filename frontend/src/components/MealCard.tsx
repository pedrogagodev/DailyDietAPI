import { Circle } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface MealCardProps {
  dateTime: string;
  name: string;
  description: string;
  isOnDiet: boolean;
}

export function MealCard({
  dateTime,
  name,
  description,
  isOnDiet,
}: MealCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <p className="text-sm text-gray-500">{dateTime}</p>
          <div className="flex flex-col gap-2">
            <h3 className="font-bold">{name}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
        <Circle size={24} fill={isOnDiet ? "#00c951" : "#e7000b"} className="text-white" />
      </CardContent>
    </Card>
  );
}

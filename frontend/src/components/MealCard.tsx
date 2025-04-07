import { Circle } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface MealCardProps {
  dateTime: string;
  name: string;
  description: string;
  isOnDiet: boolean;
  id: string;
}

export function MealCard({
  dateTime,
  name,
  description,
  isOnDiet,
  id,
}: MealCardProps) {
  const navigate = useNavigate();

  const handleClickEdit = () => {
    navigate(`/dashboard/meals/${id}`);
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Card className="hover:bg-gray-100 hover:cursor-pointer">
          <CardContent className="flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <p className="text-sm text-gray-500">{dateTime}</p>
              <div className="flex flex-col gap-2">
                <h3 className="font-bold">{name}</h3>
                <p className="text-sm text-gray-500">{description}</p>
              </div>
            </div>
            <Circle
              size={24}
              fill={isOnDiet ? "#00c951" : "#e7000b"}
              className="text-white"
            />
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-2 items-start">
        <DialogHeader className="flex flex-col gap-2 items-start">
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription className="flex flex-col gap-2 items-start">
            <span>{description}</span>
            <span>Date time: {dateTime}</span>
            <span>Is on diet? {isOnDiet ? "Yes" : "No"}</span>
          </DialogDescription>
        </DialogHeader>

        <DialogClose className="flex justify-end gap-2 mt-6">
          <Button onClick={handleClickEdit}>Edit</Button>
          <Button variant="destructive">Delete</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

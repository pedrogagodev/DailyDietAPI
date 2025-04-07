import { mealsService } from "@/services/mealsService";
import { queryClient } from "@/services/query-client";
import { useMutation } from "@tanstack/react-query";
import { Circle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
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
  mealTime: string;
  name: string;
  description: string;
  isOnDiet: boolean;
  id: string;
}

export function MealCard({
  mealTime,
  name,
  description,
  isOnDiet,
  id,
}: MealCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickEdit = () => {
    navigate(`/dashboard/meals/${id}`);
  };

  const { mutate } = useMutation({
    mutationFn: () => mealsService.deleteMeal({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me", "listMeals"],
      });
      queryClient.invalidateQueries({
        queryKey: ["me", "getSequence"],
      });
      toast.success("Successfully deleted");
      setIsDialogOpen(false);
    },
  });
  const handleClickDelete = () => {
    mutate();
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Card className="hover:bg-gray-100 hover:cursor-pointer">
          <CardContent className="flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <p className="text-sm text-gray-500">{mealTime.slice(0, 5)}</p>
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
            <span>Date time: {mealTime.slice(0, 5)}</span>
            <span>Is on diet? {isOnDiet ? "Yes" : "No"}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-4 mt-4">
          <DialogClose>
            <Button onClick={handleClickEdit}>Edit</Button>
          </DialogClose>
          <Dialog>
            <DialogTrigger>
              <Button variant="destructive">Delete</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Meal</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this meal?
                </DialogDescription>
              </DialogHeader>
              <DialogClose className="flex justify-end gap-2 mt-6">
                <Button variant="destructive" onClick={handleClickDelete}>
                  Delete
                </Button>
                <Button>Cancel</Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </div>
      </DialogContent>
    </Dialog>
  );
}

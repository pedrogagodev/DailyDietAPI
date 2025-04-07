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
        <Card className="hover:bg-primary/5 hover:cursor-pointer">
          <CardContent className="flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <p className="text-gray-500 dark:text-primary font-bold">
                {mealTime.slice(0, 5)}
              </p>
              <div className="flex flex-col gap-2 ml-4">
                <h3 className="text-lg font-bold">{name}</h3>
                <p className="text-sm text-gray-500 dark:text-primary ">
                  {description}
                </p>
              </div>
            </div>
            <Circle
              size={24}
              fill={isOnDiet ? "#4caf50" : "#c62828"}
              className="text-white"
            />
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-2 items-start">
        <DialogHeader className="flex flex-col gap-2 items-start">
          <DialogTitle className="text-xl font-bold mb-4 md:text-2xl">{name}</DialogTitle>
          <DialogDescription className="flex flex-col gap-4 items-start">
            <span className="md:text-lg">{description}</span>
            <span className="md:text-lg"><span className="font-bold">Date time:</span> {mealTime.slice(0, 5)}</span>
            <span className="md:text-lg"><span className="font-bold">Is on diet:</span> {isOnDiet ? "Yes" : "No"}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-4 mt-4">
          <DialogClose>
            <Button onClick={handleClickEdit} className="font-bold md:px-8">Edit</Button>
          </DialogClose>
          <Dialog>
            <DialogTrigger>
              <Button variant="destructive" className="font-bold md:px-6">Delete</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold mb-4 md:text-2xl">Delete Meal</DialogTitle>
                <DialogDescription className="md:text-lg">
                  Are you sure you want to delete this meal?
                </DialogDescription>
              </DialogHeader>
              <DialogClose className="flex justify-end gap-2 mt-6">
                <Button variant="destructive" onClick={handleClickDelete} className="font-bold md:px-8">
                  Delete
                </Button>
                <Button className="font-bold md:px-8">Cancel</Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMealsQuery } from "@/hooks/useMealsQuery";
import { mealsService } from "@/services/mealsService";
import { queryClient } from "@/services/query-client";
import type { EditMealParams } from "@/types/editMeal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { z } from "zod";

const editMealSchema = z.object({
  name: z.string().min(1, { message: "Please, provide a meal name" }),
  description: z.string().nullable(),
  isOnDiet: z.boolean({
    message: "Please, provide a valid value for isOnDiet",
  }),
  mealTime: z.string(),
});

export function EditMeal() {
  const navigate = useNavigate();
  const { data } = useMealsQuery();
  const { mealId } = useParams<{ mealId: string }>();

  const pageWithMeal = data?.pages.find(page =>
    page.meals.some(meal => meal.id === mealId)
  );
  const meal = pageWithMeal?.meals.find(meal => meal.id === mealId);

  const form = useForm<z.infer<typeof editMealSchema>>({
    resolver: zodResolver(editMealSchema),
    defaultValues: {
      name: meal?.name ?? "",
      description: meal?.description ?? "",
      isOnDiet: meal?.isOnDiet ?? false,
      mealTime: meal?.mealTime.slice(0, 5) ?? "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: EditMealParams) => {
      return mealsService.editMeal(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me", "listMeals", "infinity"],
      });
      queryClient.invalidateQueries({
        queryKey: ["me", "getSequence"],
      });
      queryClient.invalidateQueries({
        queryKey: ["me", "mealsOnDiet"],
      });
      queryClient.invalidateQueries({
        queryKey: ["me", "mealsOffDiet"],
      });
      queryClient.invalidateQueries({
        queryKey: ["me", "totalMeals"],
      });
    },
  });

  const handleSubmit = form.handleSubmit(async data => {
    try {
      await mutation.mutateAsync({
        name: data.name,
        description: data.description ?? undefined,
        isOnDiet: data.isOnDiet,
        id: mealId ?? "",
        mealTime: data.mealTime,
      });
      toast.success("Successfully edited");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to edit");
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-20 flex items-center justify-center"
    >
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={() => navigate("/dashboard")}
      />
      <Card className="relative w-full mx-10 p-6 rounded-md shadow-lg z-30">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Edit Meal</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-bold">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Breakfast" type="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-bold">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="A simple breakfast with toast, eggs, and coffee"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mealTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-bold">Date</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isOnDiet"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-bold">
                      Is on diet?
                    </FormLabel>
                    <FormControl>
                      <div className="flex space-x-2">
                        <Button
                          type="button"
                          variant={field.value === true ? "default" : "outline"}
                          onClick={() => field.onChange(true)}
                          className="font-bold px-6"
                        >
                          Yes
                        </Button>
                        <Button
                          type="button"
                          variant={
                            field.value === false ? "default" : "outline"
                          }
                          onClick={() => field.onChange(false)}
                          className="font-bold px-7"
                        >
                          No
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end space-x-4 mt-10">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="font-bold px-7"
                  isLoading={mutation.isPending}
                >
                  Edit
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}

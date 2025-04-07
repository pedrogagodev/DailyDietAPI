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
import { createMeal } from "@/services/mealsService/createMeal";
import { queryClient } from "@/services/query-client";
import type { CreateMealParams } from "@/types/createMeal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { z } from "zod";

const createMealSchema = z.object({
  name: z.string().min(1, { message: "Please, provide a meal name" }),
  description: z.string().nullable(),
  isOnDiet: z.boolean({
    message: "Please, provide a valid value for isOnDiet",
  }),
});

export function CreateMeal() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof createMealSchema>>({
    resolver: zodResolver(createMealSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: CreateMealParams) => {
      return createMeal(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me", "listMeals"],
      });
    },
  });

  const handleSubmit = form.handleSubmit(async data => {
    try {
      await mutation.mutateAsync({
        name: data.name,
        description: data.description ?? undefined,
        isOnDiet: data.isOnDiet,
      });
      toast.success("Successfully created");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to create");
    }
  });

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center">
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={() => navigate("/dashboard")}
      />
      <Card className="relative w-full mx-10 bg-white p-6 rounded-md shadow-lg z-30">
        <CardHeader>
          <CardTitle>Create new Meal</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
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
                    <FormLabel>Description</FormLabel>
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
                name="isOnDiet"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Is on diet?</FormLabel>
                    <FormControl>
                      <div className="flex space-x-2">
                        <Button
                          type="button"
                          variant={field.value === true ? "default" : "outline"}
                          onClick={() => field.onChange(true)}
                        >
                          Yes
                        </Button>
                        <Button
                          type="button"
                          variant={
                            field.value === false ? "default" : "outline"
                          }
                          onClick={() => field.onChange(false)}
                        >
                          No
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end space-x-2">
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
                  className="font-bold"
                  isLoading={mutation.isPending}
                >
                  Create
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

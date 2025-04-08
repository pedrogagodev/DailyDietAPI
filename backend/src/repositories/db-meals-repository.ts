import type { Meal } from "@/core/entities/meal";
import type {
  CreateMealData,
  MealsRepository,
  UpdateMealData,
} from "@/core/repositories/meals-repository";
import { query } from "@/infra/database/connection";

export class MethodsMealsRepository implements MealsRepository {
  async create({
    userId,
    name,
    description,
    isOnDiet,
    mealTime,
  }: CreateMealData): Promise<Meal> {
    const result = await query(
      `
            INSERT INTO meals (user_id, name, description, is_on_diet, meal_time)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
            `,
      [userId, name, description ?? null, isOnDiet, mealTime]
    );

    const meal = result.rows[0];
    return {
      id: meal.id,
      userId: meal.user_id,
      name: meal.name,
      description: meal.description,
      mealTime: meal.meal_time,
      isOnDiet: meal.is_on_diet,
      createdAt: meal.created_at,
      updatedAt: meal.updated_at,
    };
  }
  async findById(id: string): Promise<Meal | null> {
    const result = await query(
      `
            SELECT * FROM meals
            WHERE id = $1
            `,
      [id]
    );

    const meal = result.rows[0];
    return {
      id: meal.id,
      userId: meal.user_id,
      name: meal.name,
      description: meal.description,
      mealTime: meal.meal_time,
      isOnDiet: meal.is_on_diet,
      createdAt: meal.created_at,
      updatedAt: meal.updated_at,
    };
  }
  async findByUserIdAndId(userId: string, id: string): Promise<Meal | null> {
    const result = await query(
      `
            SELECT * FROM meals
            WHERE user_id = $1 AND id = $2
            `,
      [userId, id]
    );

    const meal = result.rows[0];
    return {
      id: meal.id,
      userId: meal.user_id,
      name: meal.name,
      description: meal.description,
      mealTime: meal.meal_time,
      isOnDiet: meal.is_on_diet,
      createdAt: meal.created_at,
      updatedAt: meal.updated_at,
    };
  }
  async listByUserId(
    userId: string,
    options: { limit: number; offset: number } = { limit: 20, offset: 0 }
  ): Promise<Meal[]> {
    const result = await query(
      `
        SELECT * FROM meals
        WHERE user_id = $1
        ORDER BY created_at DESC
        LIMIT $2 OFFSET $3
      `,
      [userId, options.limit, options.offset]
    );

    const meals = result.rows;
    return meals.map(meal => ({
      id: meal.id,
      userId: meal.user_id,
      name: meal.name,
      description: meal.description,
      mealTime: meal.meal_time,
      isOnDiet: meal.is_on_diet,
      createdAt: meal.created_at,
      updatedAt: meal.updated_at,
    }));
  }
  async update(id: string, data: UpdateMealData): Promise<Meal> {
    const result = await query(
      `
            UPDATE meals
            SET name = $1, description = $2, is_on_diet = $3
            WHERE id = $4
            RETURNING *
            `,
      [data.name ?? null, data.description ?? null, data.isOnDiet ?? null, id]
    );

    const meal = result.rows[0];
    return {
      id: meal.id,
      userId: meal.user_id,
      name: meal.name,
      description: meal.description,
      mealTime: meal.meal_time,
      isOnDiet: meal.is_on_diet,
      createdAt: meal.created_at,
      updatedAt: meal.updated_at,
    };
  }
  async delete(id: string): Promise<void> {
    await query(
      `
            DELETE FROM meals
            WHERE id = $1
            `,
      [id]
    );
  }
  async countByUserId(userId: string): Promise<number> {
    const result = await query(
      `
        SELECT COUNT(*) FROM meals
        WHERE user_id = $1
        `,
      [userId]
    );

    return Number(result.rows[0].count);
  }
  async countOnDietByUserId(userId: string): Promise<number> {
    const result = await query(
      `
        SELECT COUNT(*) FROM meals
        WHERE user_id = $1 AND is_on_diet = true
        `,
      [userId]
    );

    return Number(result.rows[0].count);
  }
  async countOffDietByUserId(userId: string): Promise<number> {
    const result = await query(
      `
        SELECT COUNT(*) FROM meals
        WHERE user_id = $1 AND is_on_diet = false
        `,
      [userId]
    );

    return Number(result.rows[0].count);
  }
  async getLongestOnDietSequence(userId: string): Promise<number> {
    console.log(userId);
    const result = await query(
      `WITH sequences_initiated AS (
        SELECT 
          id, 
          is_on_diet, 
          created_at,
          CASE 
            WHEN is_on_diet = true 
                 AND (
                      LAG(is_on_diet) OVER (ORDER BY created_at) = false 
                      OR LAG(is_on_diet) OVER (ORDER BY created_at) IS NULL
                 )
            THEN 't' 
            ELSE 'f' 
          END AS start_sequence
        FROM meals
        WHERE user_id = $1
      ),
      groups_cte AS (
        SELECT 
          id, 
          is_on_diet, 
          created_at,
          start_sequence,
          SUM(CASE WHEN start_sequence = 't' THEN 1 ELSE 0 END) 
            OVER (ORDER BY created_at) AS group_number
        FROM sequences_initiated
      ),
      sizes AS (
        SELECT 
          group_number,  
          COUNT(*) AS sequence_size
        FROM groups_cte
        WHERE is_on_diet = true
        GROUP BY group_number
      )
      SELECT COALESCE(MAX(sequence_size), 0) AS largest_sequence
      FROM sizes;
      `,
      [userId]
    );
    return result.rows[0].largest_sequence;
  }
}

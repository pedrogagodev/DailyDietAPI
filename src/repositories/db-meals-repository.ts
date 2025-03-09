import type { Meal } from "@/core/entities/meal";
import type { CreateMealData, MealsRepository, UpdateMealData } from "@/core/repositories/meals-repository";
import { query } from "@/infra/database/connection";

export class MethodsMealsRepository implements MealsRepository {
    async create({userId, name, description, isOnDiet}: CreateMealData): Promise<Meal> {
        const result = await query(`
            INSERT INTO meals (user_id, name, description, is_on_diet)
            VALUES ($1, $2, $3, $4)
            RETURNING *
            `,
        [userId, name, description ?? null, isOnDiet]
        )

        return result.rows[0]
    }
    findById(id: string): Promise<Meal | null> {
        throw new Error("Method not implemented.");
    }
    findByUserIdAndId(userId: string, id: string): Promise<Meal | null> {
        throw new Error("Method not implemented.");
    }
    listByUserId(userId: string): Promise<Meal[]> {
        throw new Error("Method not implemented.");
    }
    update(id: string, data: UpdateMealData): Promise<Meal> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): void {
        throw new Error("Method not implemented.");
    }
    countByUserId(UserId: string): Promise<number> {
        throw new Error("Method not implemented.");
    }
    countOnDietByUserId(UserId: string): Promise<number> {
        throw new Error("Method not implemented.");
    }
    countOffDietByUserId(UserId: string): Promise<number> {
        throw new Error("Method not implemented.");
    }
    getLongestOnDietSequence(UserId: string): Promise<number> {
        throw new Error("Method not implemented.");
    }
    
}
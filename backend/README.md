# DailyDietAPI

## Project Description
The **DailyDietAPI** is a RESTful API designed to assist users in managing their daily meals and tracking compliance with their diet plans. It allows users to create, update, delete, and list meals, while also providing metrics such as total meals, meals within/outside the diet, and the best streak of diet-compliant meals.

## Functional Requirements
### User Management
- [x] Create new users
- [x] Identify user across requests (authentication)
  
### Meal Management
- [x] Create meals with details (name, description, date/time, diet compliance)
- [x] Update meal information
- [x] Delete meals
- [x] List all meals for a specific user
- [x] View details of a specific meal

### User Metrics
- [x] Calculate total number of registered meals 
- [x] Calculate total number of meals within diet plan 
- [x] Calculate total number of meals outside diet plan 
- [x] Calculate the best streak of consecutive meals within diet plan 
## Non-Functional Requirements
- **Technology Stack:**
  - Node.js with Fastify framework
  - TypeScript for type safety
  - PostgreSQL database
- **Architecture:**
  - Clean Architecture principles
  - Separation of concerns
  - Good system design practices
- **Security:**
  - Authentication mechanism
  - Data privacy (users access only their own data)
- **Performance:**
  - Optimized database queries
  - Proper indexing for frequent data access
- **Maintainability:**
  - Well-structured, documented code
  - Consistent coding patterns
- **Tests:**
  - Unit tests for components and business logic
  - Integration tests for endpoints
  - Database tests for data persistence
  - Minimum 80% test coverage
  - Automated testing in the workflow

## Business Rules
### User Data Access Control:
  - [x] Users can only view/edit/delete their own meals 
  - [x] Data isolation between users
### Meal Information Requirements:
  - [x] Meals must be linked to a user 
  - [x] Required fields: name, description, date/time, diet compliance
### Metric Calculation:
  - [x] Streak: consecutive diet-compliant meals 
  - [x] Best streak: longest sequence of diet-compliant meals 
### Data Integrity:
  - [X] Referential integrity between users and meals
  - [ ] Consistent date/time format

## API Endpoints
- **User Management:**
  - `POST /register`: Create a new user
  - `POST /login`: Authenticate and return a token
  - `PATCH /token/refresh`: Refresh a user token
  - `GET /me`: Get user profile
  - `PUT /me`: Edit user profile
  - `PUT /me/password`: Changes user password

- **Meal Management:**
  - `POST /me/meals`: Create a new meal
  - `GET /me/meals`: List user's meals
  - `GET /me/meals/{mealId}`: Get meal details
  - `PUT /me/meals/{mealId}`: Update a meal
  - `DELETE /me/meals/{mealId}`: Delete a meal

- **User Metrics:**
  - `GET /me/meals/total`: Total meals count
  - `GET /me/meals/on-diet`: Meals within diet count
  - `GET /me/meals/off-diet`: Meals outside diet count
  - `GET /me/meals/longest-on-diet-sequence`: Best diet streak

## Installation and Setup
1. Clone the repository:
   ```
   git clone https://github.com/pedrogagodev/DailyDietAPI
   ```
2. Install dependencies:
   ```
   cd DailyDietAPI && npm install
   ```
3. Set up PostgreSQL database

4. Configure environment variables in a .env file

5. Start the server:
   ```
    npm run
    // or
    yarn start
    ```

## Environment Variables

- DATABASE_URL: PostgreSQL connection string

- SECRET_KEY: JWT authentication secret


## Error Handling

The API uses standard HTTP status codes (e.g., 400, 401, 404, 500) and returns JSON error responses:

```json

{
  "message": "Description of the error"
}

```

## Running Tests

Run tests with:

```
npm run test
&&
npm run test:e2e
```

## Contribution Guidelines

1. Fork the repository

2. Create a feature/bugfix branch

3. Write tests for new features

4. Submit a pull request with a clear description

5. Await review and merge

## License

Licensed under the MIT License (LICENSE).

## TODO
  
- [X] **Create E2E Tests**: Implement end-to-end tests to validate the full application flow.

- [ ] **Develop the Frontend Application**:
  - [ ] Build login and registration pages
  - [ ] Create a meal management interface (list, add, edit, delete)
  - [ ] Design a metrics dashboard

- [ ] **Use date_time Input**: Integrate a date/time picker in the frontend for user-friendly meal input.
    
- [ ] **Add current_sequence Metric**: Calculate the current streak of diet-compliant meals.
    
- [ ] **Integrate Stripe for Paid Features**: Make longest_sequence and current_sequence premium features requiring a Stripe subscription or one-time payment.

- [ ] **Add "Forgot My Password" Logic**: Implement a password reset flow (e.g., email link).
    
- [ ] **Add Calorie Counter**: Consume an external API (e.g., Nutritionix) to calculate meal calories.

- [ ] **Add Notifications**: Send reminders to log meals toast notifications.





















# Endpoints

## /expenses

| Request Type | Params | Description         |
| ------------ | ------ | ------------------- |
| GET          | /      | get expenses        |
| POST         | /      | Create expense      |
| GET          | /:id   | get expense with id |
| PATCH        | /:id   | update expense      |
| DELETE       | /:id   | delete expense      |

### [Schema](../db/models/expense.js)

#### expense

| Name        | Type                     | Required | Note                        |
| ----------- | ------------------------ | -------- | --------------------------- |
| date        | Date                     | true     |                             |
| note        | String                   | false    | maxLength: 520, default: '' |
| category    | mongoose.Schema.ObjectId | True     |                             |
| amount      | Number                   | True     |                             |
| paymentType | string                   | True     | ["Cash", "Credit Card"]     |

## /categories

| Request Type | Params | Description          |
| ------------ | ------ | -------------------- |
| GET          | /      | get Categories       |
| POST         | /      | Create Category      |
| GET          | /:id   | get Category with id |
| PATCH        | /:id   | update Category      |
| DELETE       | /:id   | delete Category      |

### [Schema](../db/models/category.js)

#### category

| Name        | Type   | Required | Note                        |
| ----------- | ------ | -------- | --------------------------- |
| title       | String | true     | maxLength: 128              |
| description | String | false    | maxLength: 520, default: "" |
| color       | string | false    | minlength & maxlength: 7    |

## /auth

| Request Type | Params           | Description                                 |
| ------------ | ---------------- | ------------------------------------------- |
| GET          | /google          | redirects to google login                   |
| GET          | /google/callback | not used by user, required for google login |
| GET          | /logout/:token   | logs out user with specified token          |

## /user

| Request Type | Params | Description        |
| ------------ | ------ | ------------------ |
| GET          | /name  | Returns username   |
| GET          | /photo | Returns user photo |

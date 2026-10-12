# Workspace Memory & Rules (Navttc Course & NodeMart Learning)

## Source Session & Context
- Referenced session transcript: `C:\Users\mhkpl\.claude\projects\d--Programming-Development-NavtccCourse-navttc-course\96c0f5ed-9dff-48d7-b844-079e3e80fc98.jsonl`
- Active Backend Project: `D:\Programming-Development\NextSkill-learning\nodemart\nodemart-backend`
- Course Reference: `d:\Programming-Development\NavtccCourse\navttc_course` (classes 01 to 41)
- Sibling Project: `D:\Programming-Development\NextSkill-learning\task-02`

---

## User Communication & Collaboration Guidelines

### 1. Language & Tone
- User writes in Roman Urdu mixed naturally with English technical terms.
- Always reply in Roman Urdu/English matching his style. Keep technical terms, file paths, and code syntax in English.

### 2. Punctuation Rules
- Do NOT use em-dashes (`—`).
- Use commas, colons, parentheses, or separate sentences instead.

### 3. Teaching Workflow (Crucial)
- NEVER edit or modify project code files directly unless explicitly asked by the user.
- The user writes every line personally in their own editor.
- Explain code line-by-line or chunk-by-chunk with the rationale directly accompanying the code.
- Provide one focused step at a time. Wait for user feedback before proceeding to the next step.
- Every explanation must be standalone and complete. Never use cross-references like "we did this before in task-02" or "as seen in class 32".
- Point out optimizations and best practices whenever relevant.

---

## NodeMart Learning Roadmap & Current Status

### Completed Milestones:
1. **Step 1**: Raw `http` module server (`http.createServer`, manual routing, headers).
2. **Step 2**: Express server setup (`express()`, routing, default 404 handling).
3. **Step 3**: Middleware architecture (custom logger, `next()`, `express.json()`).
4. **Step 4**: File-based storage for products (`fs/promises`, full CRUD: GET, POST, PUT, DELETE, `products.json`, model/controller/routes).
5. **Step 5**: Users resource & authentication foundations (`bcrypt` password hashing, signup/login, `users.json`).
6. **Step 6**: JWT generation on login (`jsonwebtoken`, `cors`, signing tokens).
7. **Step 7**: Authorization middleware (`verifyToken.js` with `jwt.verify`, protected POST/PUT/DELETE product routes).

### Current Next Milestone:
- **Step 8**: Environment variables & secrets management using `dotenv`.
  - Move hardcoded `SECRET_KEY = 'nodemart_secret_key'` from `controllers/users.js` and `middleware/verifyToken.js` into `.env`.
  - Set up `dotenv.config()` in `index.js`.
  - Access secret via `process.env.SECRET_KEY`.

# Backend Developer Interview Questions (Express.js & TypeScript)
এই গাইডে Node.js, Express.js এবং TypeScript ব্যাকএন্ড ডেভেলপারদের জন্য লেভেল ০ (একেবারে বেসিক) থেকে লেভেল ৪ (উচ্চ-স্তরের সিস্টেম ডিজাইন এবং আর্কিটেকচার) পর্যন্ত ইন্টারভিউ প্রশ্নাবলী বাংলা ও ইংরেজিতে দেওয়া হয়েছে।

---

## 🌟 Level 0: Basics (JavaScript, Node.js & TypeScript Fundamentals)
*এই প্রশ্নগুলো প্রার্থীর JavaScript/TypeScript এবং Node.js রানটাইম এনভায়রনমেন্টের ভিত্তি যাচাই করার জন্য।*

### 1. What is Node.js, and how does its architecture work? (Node.js কি এবং এর আর্কিটেকচার কিভাবে কাজ করে?)
*   **Answer Key (English):** Node.js is an open-source, cross-platform runtime environment built on Chrome's V8 JavaScript engine. It uses an asynchronous, event-driven, non-blocking I/O model, making it lightweight and efficient.
*   **উত্তর সংকেত (Bengali):** Node.js একটি ওপেন-সোর্স, ক্রস-প্ল্যাটফর্ম রানটাইম এনভায়রনমেন্ট যা Chrome-এর V8 জাভাস্ক্রিপ্ট ইঞ্জিনের উপর ভিত্তি করে তৈরি। এটি একটি অ্যাসিনক্রোনাস (asynchronous), ইভেন্ট-ড্রিভেন (event-driven) এবং নন-ব্লকিং (non-blocking) I/O মডেল ব্যবহার করে কাজ করে, যা একে হালকা এবং অত্যন্ত দক্ষ করে তোলে।
*   **Key concepts to look for:** Event Loop, V8 Engine, Libuv (C++ library that handles asynchronous operations and thread pool), Single-threaded event loop model.

### 2. Explain the Node.js Event Loop and its main phases. (Node.js Event Loop এবং এর প্রধান ধাপগুলো ব্যাখ্যা করুন।)
*   **Answer Key (English):** The Event Loop allows Node.js to perform non-blocking I/O operations despite JavaScript being single-threaded.
*   **উত্তর সংকেত (Bengali):** Event Loop জাভাস্ক্রিপ্ট সিঙ্গেল-থ্রেডেড হওয়া সত্ত্বেও Node.js-কে নন-ব্লকিং I/O অপারেশন পরিচালনা করার সুবিধা দেয়।
*   **Phases (ধাপসমূহ):**
    1.  **Timers:** Executes callbacks scheduled by `setTimeout()` and `setInterval()`. (`setTimeout` এবং `setInterval`-এর মাধ্যমে শিডিউল করা কলব্যাকগুলো এক্সিকিউট করে।)
    2.  **Pending Callbacks:** Executes I/O callbacks deferred to the next loop iteration (e.g., TCP errors). (পরবর্তী লুপের জন্য স্থগিত থাকা I/O কলব্যাক যেমন TCP এরর হ্যান্ডলিং এক্সিকিউট করে।)
    3.  **Idle, Prepare:** Used internally by Node.js. (অভ্যন্তরীণভাবে Node.js দ্বারা ব্যবহৃত হয়।)
    4.  **Poll:** Retrieves new I/O events; executes I/O-related callbacks. (নতুন I/O ইভেন্ট গ্রহণ করে এবং I/O সম্পর্কিত কলব্যাক রান করে।)
    5.  **Check:** Executes `setImmediate()` callbacks. (`setImmediate()` কলব্যাকগুলো এক্সিকিউট করে।)
    6.  **Close Callbacks:** Executes close callbacks, e.g., `socket.on('close', ...)`. (ক্লোজ কলব্যাক যেমন সকেট বন্ধের ইভেন্টগুলো রান করে।)
*   *Note: `process.nextTick()` and microtask queues (Promise resolve/reject callbacks) are processed immediately after the current phase completes, before moving to the next phase.*

### 3. What is the difference between `let`, `const`, and `var`? (`let`, `const` এবং `var`-এর মধ্যে পার্থক্য কি?)
*   **Answer Key (English & Bengali):**
    *   `var`: Function-scoped, can be redeclared and updated, hoisted to the top of their scope and initialized with `undefined`. (ফাংশন-স্কোপড, পুনরায় ডিক্লেয়ার এবং আপডেট করা যায়, হোস্টিংয়ের সময় `undefined` দিয়ে ইনিশিয়ালাইজ হয়।)
    *   `let`: Block-scoped (`{}`), can be updated but not redeclared within its block, hoisted but not initialized (temporal dead zone). (ব্লক-স্কোপড, আপডেট করা সম্ভব কিন্তু একই ব্লকে পুনরায় ডিক্লেয়ার করা যায় না, হোস্টিং হলেও ইনিশিয়ালাইজ হয় না।)
    *   `const`: Block-scoped, cannot be updated or redeclared, must be initialized at declaration. Object/array properties of `const` variables can still be mutated. (ব্লক-স্কোপড, আপডেট বা পুনরায় ডিক্লেয়ার করা যায় না, ডিক্লেয়ার করার সময় মান নির্ধারণ বা ইনিশিয়ালাইজ করতে হয়। তবে `const` অবজেক্ট বা অ্যারের ভেতরের উপাদান পরিবর্তন করা যায়।)

### 4. What are the key differences between `interface` and `type` alias in TypeScript? (TypeScript-এ `interface` এবং `type` অ্যালিয়াসের মূল পার্থক্যগুলো কি কি?)
*   **Answer Key (English & Bengali):** Both can be used to define shapes of objects and contracts, but they have subtle differences (উভয়ই অবজেক্টের শেপ বা স্ট্রাকচার ডিফাইন করতে ব্যবহৃত হয়, তবে কিছু পার্থক্য রয়েছে):
    *   **Declaration Merging:** Multiple interfaces with the same name will merge automatically. Type aliases cannot be redeclared with the same name. (একই নামের একাধিক interface স্বয়ংক্রিয়ভাবে মার্জ হয়ে যায়। কিন্তু একই নামে একাধিক type alias ডিক্লেয়ার করা যায় না।)
    *   **Extending:** Interfaces extend other interfaces using the `extends` keyword. Type aliases extend others using intersection types (`&`). (ইন্টারফেস অন্য ইন্টারফেসকে `extends` কীওয়ার্ড দিয়ে এক্সটেন্ড করে। টাইপ অ্যালিয়াস ইন্টারসেকশন `&` ব্যবহার করে এক্সটেন্ড করে।)
    *   **Capabilities:** Types can define primitives, unions (`type status = 'idle' | 'loading'`), tuples, and mapped types. Interfaces are strictly for describing objects/classes. (Type দিয়ে প্রিমিটিভ ডেটা, ইউনিয়ন, টাপল তৈরি করা যায়। Interface মূলত অবজেক্ট বা ক্লাসের গঠন বর্ণনা করার জন্য সীমাবদ্ধ।)

### 5. Explain the difference between `unknown` and `any` types in TypeScript. (TypeScript-এ `unknown` এবং `any` টাইপের মধ্যে পার্থক্য বুঝিয়ে বলুন।)
*   **Answer Key (English & Bengali):**
    *   `any` essentially turns off type checking. You can perform any operation, read any property, and assign `any` to any other type. (`any` মূলত টাইপ চেকিং বন্ধ করে দেয়। আপনি যেকোনো অপারেশন চালাতে পারেন, প্রপার্টি রিড করতে পারেন এবং একে যেকোনো টাইপে অ্যাসাইন করতে পারেন।)
    *   `unknown` is a type-safe counterpart to `any`. Anything can be assigned to `unknown`, but you cannot perform any operations on a variable of type `unknown` or assign it to other types without first performing type narrowing (using `typeof`, `instanceof`, or type guards). (`unknown` হলো `any`-এর টাইপ-সেফ সংস্করণ। যেকোনো কিছু এতে অ্যাসাইন করা যায়, কিন্তু টাইপ ন্যারোইং বা নিশ্চিত না করে এর ওপর কোনো অপারেশন চালানো বা অন্য টাইপে অ্যাসাইন করা যায় না।)

---

## 🚀 Level 1: Express.js Fundamentals
*এই প্রশ্নগুলো Express-এর রাউটিং, মিডলওয়্যার এবং সাধারণ আর্কিটেকচার নিয়ে আলোচনা করে।*

### 6. What is a Middleware in Express, and how does it work? (Express-এ Middleware কি এবং এটি কিভাবে কাজ করে?)
*   **Answer Key (English):** Middleware functions are functions that have access to the Request object (`req`), the Response object (`res`), and the next middleware function (`next`) in the application’s request-response cycle.
*   **উত্তর সংকেত (Bengali):** মিডলওয়্যার হলো এমন কিছু ফাংশন যা এক্সপ্রেস অ্যাপ্লিকেশনের রিকোয়েস্ট-রেসপন্স সাইকেলে Request object (`req`), Response object (`res`) এবং পরবর্তী মিডলওয়্যার ফাংশন (`next`)-এর অ্যাক্সেস পায়।
*   **Capabilities (মিডলওয়্যারের কাজ):**
    *   Execute code. (কোড এক্সিকিউট করা।)
    *   Make changes to the request and response objects. (রিকোয়েস্ট এবং রেসপন্স অবজেক্ট মডিফাই করা।)
    *   End the request-response cycle (e.g., sending `res.json()`). (রিকোয়েস্ট-রেসপন্স সাইকেল শেষ করা।)
    *   Call the next middleware in the stack using `next()`. (`next()` এর মাধ্যমে পরবর্তী মিডলওয়্যারকে কল করা।)
*   *If a middleware does not end the cycle, it must call `next()`, otherwise the request will hang.* (মিডলওয়্যার রেসপন্স না পাঠালে অবশ্যই `next()` কল করতে হবে, অন্যথায় রিকোয়েস্টটি আটকে (hang) থাকবে।)

### 7. How do you implement central error handling in Express? (Express-এ সেন্ট্রাল এরর হ্যান্ডলিং কিভাবে ইমপ্লিমেন্ট করবেন?)
*   **Answer Key (English & Bengali):** Express detects error handling middleware when the middleware function is defined with exactly **four arguments** instead of three: `(err, req, res, next)`. (এক্সপ্রেস এরর হ্যান্ডলিং মিডলওয়্যারকে আলাদা করতে পারে যখন সেটিতে ঠিক **৪টি আর্গুমেন্ট** ব্যবহার করা হয়।)
*   **Example (উদাহরণ):**
    ```typescript
    import { Request, Response, NextFunction } from 'express';

    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        console.error(err.stack);
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || 'Internal Server Error'
        });
    });
    ```

### 8. What is the difference between `app.use()` and specific method routes like `app.get()` or `app.post()`? (`app.use()` এবং নির্দিষ্ট মেথড রাউট যেমন `app.get()` বা `app.post()` এর মধ্যে পার্থক্য কি?)
*   **Answer Key (English & Bengali):**
    *   `app.use()` mounts the specified middleware function(s) at the specified path. It matches any HTTP method (GET, POST, PUT, DELETE, etc.) and matches sub-paths as well (e.g., `app.use('/api', ...)` matches `/api/users`, `/api/products`). (`app.use()` যেকোনো HTTP মেথডের জন্য এবং সাব-পাথের জন্যও মিডলওয়্যার রান করে।)
    *   `app.get()`, `app.post()`, etc., register routes for specific HTTP verbs and perform exact path matches (unless regex paths are used). (এগুলো শুধুমাত্র নির্দিষ্ট HTTP মেথড এবং সঠিক পাথের (exact path) জন্য কাজ করে।)

### 9. What is CORS and why is it important in an Express application? (CORS কি এবং এটি এক্সপ্রেস অ্যাপ্লিকেশনে কেন গুরুত্বপূর্ণ?)
*   **Answer Key (English):** CORS (Cross-Origin Resource Sharing) is a security mechanism enforced by browsers that restricts resources from being requested from another domain outside the domain from which the first resource was served.
*   **উত্তর সংকেত (Bengali):** CORS হলো ব্রাউজার দ্বারা চালিত একটি সিকিউরিটি মেকানিজম যা এক ডোমেইনের ফ্রন্টএন্ড থেকে অন্য ডোমেইনের ব্যাকএন্ড রিসোর্স রিকোয়েস্ট করাকে সীমাবদ্ধ করে।
*   এক্সপ্রেসে `cors` প্যাকেজটি মিডলওয়্যার হিসেবে ব্যবহার করে প্রয়োজনীয় হেডার (যেমন `Access-Control-Allow-Origin`) কনফিগার করা হয় যাতে অন্য ডোমেইনের ক্লায়েন্টরা API অ্যাক্সেস করতে পারে।

---

## 🛠️ Level 2: Intermediate Backend Development (Express + TypeScript Integration)
*প্রজেক্ট স্ট্রাকচার, টাইপিং রিকোয়েস্ট, ডেটাবেস কানেকশন এবং ভ্যালিডেশনের ওপর আলোকপাত করে।*

### 10. How do you extend Express Request type in TypeScript to hold custom properties (e.g., `req.user`)? (TypeScript-এ এক্সপ্রেসের Request টাইপকে কিভাবে এক্সটেন্ড করবেন যাতে কাস্টম প্রপার্টি যেমন `req.user` যুক্ত করা যায়?)
*   **Answer Key (English & Bengali):** You can use TypeScript's **declaration merging** to extend the global `Express` namespace. (TypeScript-এর **declaration merging** ব্যবহার করে গ্লোবাল `Express` নেমস্পেসকে এক্সটেন্ড করতে হবে।)
*   **Example (`types/express.d.ts`):**
    ```typescript
    declare global {
      namespace Express {
        interface Request {
          user?: {
            id: string;
            role: string;
          };
        }
      }
    }
    export {};
    ```
    Ensure this custom typing definition is included in `tsconfig.json` paths or type roots. (নিশ্চিত করুন যে এই ফাইলটি `tsconfig.json` এ টাইপ রুটস হিসেবে সেট করা আছে।)

### 11. Explain how to implement request body and query validation using a library like Zod in an Express middleware. (Zod লাইব্রেরি ব্যবহার করে কিভাবে এক্সপ্রেস মিডলওয়্যারে রিকোয়েস্ট বডি বা কুয়েরি ভ্যালিডেশন করবেন?)
*   **Answer Key (English & Bengali):** Write a validation middleware that takes a schema, parses `req.body`, `req.query`, or `req.params`, and calls `next()` if valid, or passes the validation error to `next(err)` if invalid. (Rule-ভিত্তিক বা স্কিমা আর্গুমেন্ট হিসেবে নিয়ে, `req.body`/`req.query` স্কিমা অনুযায়ী পার্স করে। ভ্যালিড হলে `next()` কল করবে, ইনভ্যালিড হলে এরর ক্যাচ করে `next(err)` অথবা এরর রেসপন্স ব্যাক করবে।)
*   **Example (উদাহরণ):**
    ```typescript
    import { Request, Response, NextFunction } from 'express';
    import { AnyZodObject, ZodError } from 'zod';

    export const validate = (schema: AnyZodObject) => 
      (req: Request, res: Response, next: NextFunction) => {
        try {
          schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
          });
          next();
        } catch (error) {
          if (error instanceof ZodError) {
             res.status(400).json({ success: false, errors: error.errors });
             return;
          }
          next(error);
        }
      };
    ```

### 12. Describe the JWT Authentication Flow in an Express API. (একটি এক্সপ্রেস API-তে JWT অথেনটিকেশন ফ্লো কেমন হয় বর্ণনা করুন।)
*   **Answer Key (English & Bengali):**
    1.  **Login:** Client sends credentials (username/password) to `/login`. (ক্লায়েন্ট ইউজারনেম ও পাসওয়ার্ড নিয়ে লগইন রিকোয়েস্ট পাঠায়।)
    2.  **Verification:** Server validates credentials and generates a signed JWT payload containing non-sensitive user data (like `userId`, `role`) using a secret key. (সার্ভার ভ্যালিডেট করে একটি সিক্রেট কি দিয়ে সাইনড JWT জেনারেট করে।)
    3.  **Token delivery:** Server sends JWT back to the client. (সার্ভার টোকেনটি ক্লায়েন্টকে ফেরত পাঠায়।)
    4.  **Client storage:** Client stores JWT (e.g., in `HttpOnly` cookie or secure storage). (ক্লায়েন্ট টোকেনটি ব্রাউজার কুকি বা লোকাল স্টোরেজে সেভ করে।)
    5.  **Subsequent requests:** Client sends JWT in the `Authorization` header (`Bearer <token>`). (পরবর্তী প্রতি রিকোয়েস্টের সাথে হেডার হিসেবে টোকেন পাঠায়।)
    6.  **Auth Middleware:** Server extracts the token from headers, verifies it using the secret key, decodes payload, attaches user object to `req.user`, and calls `next()`. (সার্ভার টোকেন ভেরিফাই করে পে-লোড রিড করে এবং `req.user`-এ ডেটা অ্যাসাইন করে `next()` কল করে।)

### 13. What is the difference between active database connection pooling and creating new connections on every request? (অ্যাক্টিভ ডেটাবেস কানেকশন পুলিং এবং প্রতিটি রিকোয়েস্টে নতুন কানেকশন তৈরির মধ্যে তফাৎ কি?)
*   **Answer Key (English & Bengali):**
    *   **Creating a new connection per request:** This is extremely inefficient and slow, as connection handshakes (TCP, TLS, DB-auth) are expensive. It can easily exhaust database connection limits. (প্রতি রিকোয়েস্টে কানেকশন তৈরি করা অত্যন্ত ধীরগতির এবং ডেটাবেসের কানেকশন লিমিট শেষ করে ফেলে।)
    *   **Connection Pooling:** Maintains a cache of active database connections. When a request comes, it borrows a connection from the pool, performs the operation, and returns it to the pool. This drastically improves performance, response time, and resource management. (কানেকশন পুলিং আগে থেকেই তৈরি কিছু অ্যাক্টিভ কানেকশনের পুল বা ক্যাশ ধরে রাখে। রিকোয়েস্ট এলে পুল থেকে কানেকশন ধার নিয়ে কাজ শেষে আবার পুলে ফেরত দেওয়া হয়, যা কার্যক্ষমতা বহুগুণ বাড়িয়ে দেয়।)

---

## 🔒 Level 3: Advanced Backend Concepts (Security, Performance & Testing)
*নিরাপত্তা, ফাইল আপলোড, এরর মিটিগেশন, টেস্টিং এবং অপ্টিমাইজেশন।*

### 14. What are some crucial security steps to protect an Express application? (একটি এক্সপ্রেস অ্যাপ্লিকেশন নিরাপদ রাখার জন্য কিছু গুরুত্বপূর্ণ পদক্ষেপ কি কি?)
*   **Answer Key (English & Bengali):**
    *   **Helmet.js:** Use `helmet` middleware to set secure HTTP headers (disables `X-Powered-By`, configures Content Security Policy, XSS protection, etc.). (সিকিউর HTTP হেডার সেট করার জন্য Helmet ব্যবহার করা।)
    *   **Rate Limiting:** Implement `express-rate-limit` to prevent brute force and DDoS attacks. (ব্রুট ফোর্স বা DDoS অ্যাটাক রোধে রেট লিমিটিং যুক্ত করা।)
    *   **Input Validation & Sanitization:** Use validation libraries (Zod/Joi) and sanitize inputs to prevent SQL/NoSQL Injection. (ইনপুট ভ্যালিডেশন ও স্যানিটাইজেশন করা।)
    *   **Secure Cookies:** Use `HttpOnly`, `Secure`, and `SameSite` flags for session/JWT cookies. (কুকিতে সিকিউর ও HttpOnly ফ্ল্যাগ ব্যবহার করা।)
    *   **Secrets Management:** Keep credentials out of the codebase using `.env` files and configuration wrappers. (এনভায়রনমেন্ট ভেরিয়েবল বা `.env` ফাইলে সিক্রেট কি রাখা।)

### 15. How do you handle file uploads in an Express API? (Express API-তে ফাইল আপলোড কিভাবে হ্যান্ডেল করবেন?)
*   **Answer Key (English & Bengali):**
    *   Node's standard body parser does not handle `multipart/form-data`. We use a middleware like **Multer** to parse files. (এক্সপ্রেসের ডিফল্ট বডি পার্সার মাল্টিপার্ট ডেটা প্রসেস করতে পারে না, তাই **Multer** ব্যবহার করতে হয়।)
    *   **Workflow (কাজের ধারা):**
        1.  Configure Multer with storage engine details (memory storage as buffer or disk storage). (স্টোরেজ ইঞ্জিন যেমন মেমোরি বা লোকাল ডিস্ক স্টোরেজ কনফিগার করা।)
        2.  Add validation for file sizes and mime-types. (ফাইলের সাইজ এবং টাইপ ভ্যালিডেশন করা।)
        3.  Apply Multer middleware to the route (e.g., `upload.single('avatar')`). (রাউটে মিডলওয়্যার হিসেবে যুক্ত করা।)
        4.  The file info becomes available at `req.file`, which can then be processed or uploaded to cloud storage (like AWS S3). (ফাইলটি `req.file`-এ পাওয়া যায় এবং তা ক্লাউড স্টোরেজে আপলোড করা যায়।)

### 16. How would you write integration tests for Express routes? (Express রাউটের জন্য কিভাবে ইন্টিগ্রেশন টেস্ট লিখবেন?)
*   **Answer Key (English & Bengali):** By using a test runner like Jest (or Vitest/Mocha) along with `supertest`. (`supertest` এবং Jest ব্যবহার করে ইন্টিগ্রেশন টেস্ট লেখা যায়।)
*   **Example Structure (উদাহরণ):**
    ```typescript
    import request from 'supertest';
    import app from '../src/app';

    describe('GET /api/users', () => {
      it('should return a list of users', async () => {
        const response = await request(app).get('/api/users');
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.data)).toBe(true);
      });
    });
    ```
    *Ensure the `app` instance is exported without calling `app.listen()` directly in the same file to prevent port issues during testing.* (টেস্টিংয়ের সময় পোর্ট কোলাইড এড়াতে `app.listen()` কে আলাদা ফাইলে রাখা ভালো।)

### 17. How do you handle unhandled promise rejections and uncaught exceptions in Node.js? (Node.js-এ আনহ্যান্ডেলড প্রমিজ রিজেকশন এবং আনকচড এক্সেপশন কিভাবে হ্যান্ডেল করবেন?)
*   **Answer Key (English & Bengali):** By listening to process-level events. If these are not handled, the application might enter an unstable state. (প্রসেস লেভেলের ইভেন্ট লিসেনার দিয়ে এগুলো হ্যান্ডেল করতে হয়, অন্যথায় অ্যাপ্লিকেশন ক্র্যাশ বা আনস্টেবল হতে পারে।)
*   **Example (উদাহরণ):**
    ```typescript
    process.on('uncaughtException', (error) => {
        console.error('Uncaught Exception:', error);
        // Safely shutdown the server, run cleanup operations, and exit
        process.exit(1);
    });

    process.on('unhandledRejection', (reason, promise) => {
        console.error('Unhandled Rejection at:', promise, 'reason:', reason);
        process.exit(1);
    });
    ```

---

## 🏛️ Level 4: High-Level (System Design, Scaling & DevOps)
*স্কেলাবিলিটি, পারফরম্যান্স অপ্টিমাইজেশন, কিউ সিস্টেম এবং সিস্টেম ডিজাইন।*

### 18. How do you handle CPU-intensive tasks in a Node.js Express application? (Node.js এক্সপ্রেস অ্যাপ্লিকেশনে CPU-ইনটেনসিভ কাজগুলো কিভাবে হ্যান্ডেল করবেন?)
*   **Answer Key (English & Bengali):** Since Node.js runs on a single main thread, long-running CPU-intensive tasks (e.g., image processing, heavy encryption, large PDF generation) will block the event loop, causing all other incoming requests to hang. (যেহেতু নোড জেএস সিঙ্গেল থ্রেডে চলে, তাই ভারী গাণিতিক বা CPU-ইনটেনসিভ কাজ মেইন ইভেন্ট লুপকে ব্লক করে দেয়, ফলে বাকি রিকোয়েস্টগুলো আটকে যায়।)
*   **Solutions (সমাধান):**
    *   **Worker Threads:** Offload the heavy task to a separate thread using the built-in `worker_threads` module. (ভারী কাজগুলো বিল্ট-ইন `worker_threads` ব্যবহার করে আলাদা থ্রেডে পাঠিয়ে দেওয়া।)
    *   **Task Queues:** Push the job to a queue (like BullMQ or RabbitMQ) and have separate worker processes consume and process the tasks asynchronously. (BullMQ/RabbitMQ দিয়ে ব্যাকগ্রাউন্ড টাস্ক কিউতে পাঠিয়ে দেওয়া।)
    *   **Microservices:** Outsource heavy computational tasks to a dedicated microservice written in a language suited for CPU operations (like Rust, Go, or Python). (আলাদা ডেডিকেটেড মাইক্রোসার্ভিসে কাজ পাঠিয়ে দেওয়া যা Python, Go বা Rust-এ তৈরি।)

### 19. Explain scaling Node.js applications. What is the difference between PM2/Cluster module and horizontal scaling using containers? (Node.js অ্যাপ্লিকেশন স্কেলিং করার পদ্ধতি বলুন। PM2/Cluster মডিউল এবং কনটেইনার দিয়ে হরিজন্টাল স্কেলিংয়ের মধ্যে পার্থক্য কি?)
*   **Answer Key (English & Bengali):**
    *   **Vertical Scaling (PM2 / Node Cluster Module):** Focuses on leveraging multi-core CPUs on a single machine. The Node `cluster` module spawns multiple instances of the application (worker processes) that share the same port. PM2 makes this management easy out of the box with cluster mode. (একটিমাত্র সার্ভারের একাধিক CPU কোরকে কাজে লাগানোর জন্য ক্লাস্টার মোড বা PM2 ব্যবহার করা হয়।)
    *   **Horizontal Scaling:** Focuses on running the application on multiple machines/servers. This is done by packaging the application into a Docker container, deploying it across multiple nodes (using Kubernetes, AWS ECS, or GCP Cloud Run), and placing a Load Balancer (like Nginx, AWS ALB) in front of the instances to distribute traffic. (একাধিক ভিন্ন ভিন্ন সার্ভার বা নোডে অ্যাপ্লিকেশন চালানো, সাধারণত ডকার কনটেইনার ও কুবারনেটিস এবং সামনে লোড ব্যালেন্সার বসিয়ে এটি করা হয়।)

### 20. When and how would you implement Redis caching in an API? (একটি API-তে কখন এবং কিভাবে Redis ক্যাশিং ব্যবহার করবেন?)
*   **Answer Key (English & Bengali):**
    *   **When:** For read-heavy, slow-changing, or computationally expensive data (e.g., user profiles, product catalogs, database aggregation results). (যখন ডেটা রিড বেশি হয় কিন্তু ঘন ঘন পরিবর্তন হয় না, যেমন প্রোডাক্ট ক্যাটালগ বা ইউজার প্রোফাইল।)
    *   **How (Cache-aside pattern):**
        1.  A request comes in for resource X. (রিকোয়েস্ট এলে প্রথমে রেডিস ক্যাশ চেক করা হয়।)
        2.  Check if X exists in Redis cache.
        3.  If **Cache Hit**: Return X immediately to the client. (ক্যাশে পাওয়া গেলে সরাসরি সেখান থেকে রিটার্ন করা হয়।)
        4.  If **Cache Miss**: Fetch X from the primary database, store X in Redis with a Time-to-Live (TTL), and return X to the client. (ক্যাশে না পাওয়া গেলে মূল ডেটাবেস থেকে এনে রেডিসে সেভ করা হয় একটি নির্দিষ্ট TTL বা এক্সপায়ার টাইমসহ, এরপর রেসপন্স পাঠানো হয়।)
    *   **Cache Invalidation:** Ensure that when database updates occur for X, the cached entry is deleted or updated in Redis. (ডেটাবেসে কোনো পরিবর্তন হলে ক্যাশ ইনভ্যালিডেট বা আপডেট করা হয়।)

### 21. How do database transactions ensure data integrity? How do you write a transaction in your preferred ORM/ODM (like Prisma or Mongoose)? (ডেটাবেস ট্রানজেকশন কিভাবে ডেটার সততা (integrity) বজায় রাখে? Prisma বা Mongoose-এ ট্রানজেকশন কিভাবে লিখবেন?)
*   **Answer Key (English & Bengali):** Transactions enforce the **ACID** properties. They guarantee that a group of database operations either all succeed together or all fail (rolled back), preventing partial or corrupt database states. (ট্রানজেকশন ACID প্রোপার্টি নিশ্চিত করে। এর মাধ্যমে একাধিক কুয়েরির একটি গ্রুপ একসাথে সফল হয় অথবা সব রোলব্যাক (বাতিল) হয়ে যায়, যার ফলে ডেটা অসম্পূর্ণ অবস্থায় সেভ হতে পারে না।)
*   **Example (Prisma-তে উদাহরণ):**
    ```typescript
    await prisma.$transaction(async (tx) => {
      const sender = await tx.user.update({
        where: { id: senderId },
        data: { balance: { decrement: amount } },
      });
      if (sender.balance < 0) {
        throw new Error("Insufficient funds");
      }
      await tx.user.update({
        where: { id: receiverId },
        data: { balance: { increment: amount } },
      });
    });
    ```

### 22. What is a Message Broker (e.g., RabbitMQ, Apache Kafka), and when would you use one in a backend architecture? (Message Broker কি এবং একটি ব্যাকএন্ড আর্কিটেকচারে এটি কখন ব্যবহার করবেন?)
*   **Answer Key (English & Bengali):** A message broker is middleware that facilitates asynchronous communication between microservices/applications. It decouples sender (producer) and receiver (consumer) services. (মেসেজ ব্রোকার হলো এমন একটি মিডলওয়্যার যা বিভিন্ন মাইক্রোসার্ভিস বা অ্যাপ্লিকেশনের মধ্যে অ্যাসিনক্রোনাস যোগাযোগের সুবিধা দেয়।)
*   **When to use (কখন ব্যবহার করবেন):**
    *   **Asynchronous Processing:** Sending emails, generating reports without making the user wait. (ব্যবহারকারীকে অপেক্ষায় না রেখে ইমেইল পাঠানো বা রিপোর্ট জেনারেট করার কাজ ব্যাকগ্রাউন্ডে করা।)
    *   **Decoupling Microservices:** Instead of services making direct REST calls, services publish events to a broker, and multiple subscriber services react to it. (সার্ভিসগুলোর সরাসরি REST কলের নির্ভরতা কমিয়ে ইভেন্ট-ভিত্তিক যোগাযোগ স্থাপন করা।)
    *   **Load Leveling (Buffering):** Under high spikes of traffic, the message broker buffers incoming tasks so the consumer services can process them at a steady rate. (অতিরিক্ত ট্রাফিকের সময় মেসেজ ব্রোকার টাস্কগুলোকে বাফার করে রাখে যাতে সার্ভিস ক্র্যাশ না করে ধীরে ধীরে প্রসেস করতে পারে।)

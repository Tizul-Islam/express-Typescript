# My Learning Notes: Express with TypeScript

এই প্রজেক্ট থেকে আমি যা যা শিখতে পেরেছি এবং এখন পর্যন্ত যা যা কাজ করা হয়েছে, তার একটি সারসংক্ষেপ নিচে দেওয়া হলো:

## ১. প্রজেক্ট সেটআপ এবং কনফিগারেশন (Project Setup & Configuration)
- **Node.js Project Initialized:** `npm init -y` ব্যবহার করে প্রজেক্ট শুরু করা হয়েছে।
- **TypeScript Setup:** `npm i -D typescript` এবং `npx tsc --init` ব্যবহার করে প্রজেক্টে টাইপস্ক্রিপ্ট সেটআপ করা হয়েছে এবং `tsconfig.json` কনফিগার করা হয়েছে।
- **Packages Installation:** 
  - `express` ইনস্টল করা হয়েছে এবং এর টাইপস `@types/express` ডেভেলপমেন্ট ডিপেন্ডেন্সি হিসেবে যুক্ত করা হয়েছে।
  - টাইপস্ক্রিপ্ট ফাইল সরাসরি রান করার জন্য `tsx` ইনস্টল করা হয়েছে।
  - `nodemon` ইনস্টল করে `package.json` এ একটি `dev` স্ক্রিপ্ট তৈরি করা হয়েছে (`"dev": "nodemon -q --exec tsx server.ts"`), যাতে কোনো কোড পরিবর্তন করলেই সার্ভার নিজে থেকেই রিস্টার্ট নেয়।

## ২. এক্সপ্রেস সার্ভার তৈরি (Creating Express Server)
- **Express App:** `server.ts` ফাইলে `import express, { Application, Request, Response } from "express";` ব্যবহার করে সম্পূর্ণ টাইপ-সেফ একটি এক্সপ্রেস অ্যাপ তৈরি করা হয়েছে।
- **Middlewares:** 
  - `app.use(express.text())`
  - `app.use(express.json())`
  - `app.use(express.urlencoded({ extended: true }))`
  এই মিডলওয়্যারগুলোর মাধ্যমে ক্লায়েন্ট থেকে আসা JSON, Text এবং URL Encoded ডাটা রিসিভ করার ব্যবস্থা করা হয়েছে।
- **Endpoints (API Routes):**
  - একটি `GET` রিকোয়েস্ট (`/`) তৈরি করা হয়েছে যা রেসপন্স হিসেবে একটি JSON ডাটা (মেসেজ এবং অথরের নাম) রিটার্ন করে।
  - একটি `POST` রিকোয়েস্ট (`/`) তৈরি করা হয়েছে যেখানে ক্লায়েন্ট থেকে `name`, `email`, `password` রিসিভ করে আবার রেসপন্স হিসেবে তা ক্লায়েন্টকে পাঠানো হচ্ছে।

## ৩. ডাটাবেস কানেকশন (Database Connection)
- **PostgreSQL Setup:** প্রজেক্টে ডাটাবেস হিসেবে PostgreSQL ব্যবহার করার জন্য `pg` এবং এর টাইপস `@types/pg` ইনস্টল করা হয়েছে।
- **Connection Pool:** `import { Pool } from "pg";` ব্যবহার করে NeonDB (Cloud PostgreSQL) এর সাথে একটি কানেকশন স্ট্রিং দিয়ে ডাটাবেস কানেক্ট করার ইনিশিয়াল সেটআপ করা হয়েছে। 

এই কাজগুলোর মাধ্যমে একটি বেসিক Express + TypeScript ব্যাকএন্ড সার্ভার তৈরি করা হয়েছে, যা ডাটাবেসের সাথে কানেক্টেড এবং যেকোনো API রিকোয়েস্ট হ্যান্ডেল করার জন্য প্রস্তুত।

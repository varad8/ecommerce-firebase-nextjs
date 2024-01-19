# Admin Panel Backend

This repository contains the backend code for the Admin Panel of the ecommerce-firebase-nextjs web app. The backend is built using Next.js API routes, MongoDB for data storage, and Firebase for image storage.

## Table of Contents

1. [Overview](#overview)
2. [Folder Structure](#folder-structure)
3. [API Routes](#api-routes)
4. [Authentication](#authentication)
5. [Order Management](#order-management)
6. [Product Management](#product-management)
7. [Category Management](#category-management)
8. [Slider Images Management](#slider-images-management)
9. [Total Revenue Calculation](#total-revenue-calculation)
10. [User Management](#user-management)

## Overview

The Admin Panel Backend serves as the backend infrastructure to support the admin functionalities of the ecommerce web app. It includes API routes for managing orders, products, categories, slider images, total revenue calculation, and user roles.

## Folder Structure

The folder structure follows a modular approach, organizing different functionalities into separate files for clarity and maintainability. Key folders include:

- `auth`: Contains authentication-related files.
- `lib`: Houses MongoDB and Firebase connection files.
- `models`: Defines MongoDB schemas for different entities.
- `utils`: Includes utility functions, such as image name extraction.

## API Routes

The API routes are designed to handle various admin-related operations. Each route corresponds to a specific functionality, such as order management, product management, etc. Examples of API routes include:

- `/api/orders`: Manages order-related operations.
- `/api/products`: Handles product CRUD operations.
- `/api/categories`: Manages categories for products.
- `/api/slider-images`: CRUD operations for slider images.
- `/api/total-revenue`: Calculates total revenue for different time intervals.
- `/api/users`: Handles user-related operations.

## Authentication

Authentication is implemented using NextAuth with Google as the provider. Admin authentication is enforced using the `isAdminRequest` function to secure admin-specific API routes.

## Order Management

The order management functionality includes fetching order details, updating order status, and calculating order statistics for different time intervals.

## Product Management

Product management includes CRUD operations for products, image uploads, and image deletion from Firebase Storage.

## Category Management

Category management allows for creating, updating, and deleting product categories.

## Slider Images Management

Slider images management includes CRUD operations for slider images and image uploads to Firebase Storage.

## Total Revenue Calculation

The total revenue calculation functionality calculates total revenue based on different time intervals (today, weekly, monthly, etc.) using order data.

## User Management

User management functionalities include fetching user details, updating user roles, and retrieving admin users.

Feel free to explore the individual files for detailed implementation and customization.

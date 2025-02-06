This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Install depedencies:
```bash
npm install
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Production

Build the application for production:

```bash
# npm
npm run build
```

# Folder structure - Using App Router
```
/nextjs-reminder-app
  ├── /app
  │   ├── /api                   # API endpoints (optional)
  │   │   └── reminders/route.ts # Reminders API logic
  │   ├── /layout.tsx            # App-level layout (wraps all pages)
  │   ├── /globals.css           # Global styles (if needed)
  │   ├── /page.tsx              # Home route "/"
  │   └── /reminders
  │       ├── /page.tsx          # Reminders page "/reminders"
  │       └── layout.tsx         # Page-specific layout for reminders
  ├── /components                # Reusable components
  │   ├── Header.tsx             # Header component
  │   └── ReminderList.tsx       # Component to display reminders
  ├── /models                    # Mongoose schemas/models
  │   └── Reminder.ts
  ├── /middleware.ts             # Middleware for authentication
  ├── /utils                     # Utility functions like DB connectors
  │   └── dbConnect.ts
  ├── /public                    # Static assets like images
  ├── tsconfig.json              # TypeScript config
  ├── package.json               # Project dependencies
  ├── next.config.js             # Next.js configuration
```

# Key File Setip
```ts
// Home Route (app/page.tsx)
export default function Home() {
    return <h1> Welcome to reminder app!</h1>
}

//API Route (app/api/reminders/route.ts) can be done via db or api calls

// Reaching out to db
import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Reminder from '@/models/Reminder';

// Handle GET requests to fetch reminders
export async function GET() {
  await dbConnect();
  const reminders = await Reminder.find({});
  return NextResponse.json(reminders);
}

// Reaching out to api
import { NextResponse } from 'next/server';
export async function GET() {
  try {
    // Call the dedicated external service API
    const response = await fetch('https://api.example.com/reminders');
    const data = await response.json();

    // Return the response as JSON
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reminders' }, { status: 500 });
  }
}

// Client-side Fetch Example (app/reminders/page.tsx)
'use client';

import { useEffect, useState } from 'react';

export default function RemindersPage() {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    fetch('/api/reminders')
      .then((res) => res.json())
      .then((data) => setReminders(data));
  }, []);

  return (
    <div>
      <h1>Reminders</h1>
      <ul>
        {reminders.map((reminder) => (
          <li key={reminder.id}>{reminder.text}</li>
        ))}
      </ul>
    </div>
  );
}
```
# When to Use Layouts
- Global Layout (app/layout.tsx):

Defines the layout that wraps the entire application.
Example: Navigation bar, footer, etc.


- Route-Specific Layout (Optional - app/section/layout.tsx) :
  
Use this if you need different layouts for specific routes (e.g., /reminders having its own layout).

# Reminder App

Welcome to the **Reminder App**! This application allows users to:

- **Log in** to see their personal reminders.  
- View a **weather forecast** (today & tomorrow) at the top of the dashboard.  
- See a list of **reminders**, sorted by due date.  
- **Add** a new reminder (with name, description, due date, and priority).  
- **Mark** a reminder as completed or edit existing reminders.  

> **Note:** In this demo, we do not have full production-grade security for MongoDB. For a production environment, set up proper credentials, environment variables, and secure connections.

## Features

1. **User Authentication**  
   - Passwords stored using `sha256` hashing.  
   - Basic session or token-based authentication.  

2. **Reminders**  
   - Title (string)  
   - Description (string)  
   - Due Date (date)  
   - Priority (enum/string: `Low`, `Medium`, `High`)  
   - Completed (boolean)  

3. **Weather Forecast**  
   - Displays today and tomorrow’s forecast (temperature, conditions).  
   - Uses a third-party weather API. You can configure an API key via an environment variable (`WEATHER_API_KEY`).

## Prerequisites

- [Docker](https://www.docker.com/get-started) installed.
- [Docker Compose](https://docs.docker.com/compose/) installed (often bundled with Docker Desktop).

## Quick Start

1. **Clone this repository**:
   ```bash
   git clone https://github.com/your-org/nextjs-reminder-app.git
   cd nextjs-reminder-app
   ````

2. **Build and Run the Application**:

    ```bash
    docker-compose up --build
    ```

   - This command will:
     1. Build the Docker image for the Next.js (or Nuxt/Nest) app from your local files.
     2. Start containers on a shared Docker network.

4. **Access the App**:
    - Open your browser and navigate to http://localhost:3000.
    - You should see the login or signup screen.

5. **Create an Account & Log In**:
    - Click Sign Up or Register (depending on how you’ve structured the front end).
    - After successful registration, log in with the same credentials.
    - Explore the dashboard!

### Stopping the Containers
   - In the same terminal where docker-compose up is running, press Ctrl + C.
   - Or run:
     ```bash
     docker-compose down
     ```

### Project Architecture
```vbnet
[ MongoDB v7 Container ]
           ↑
           | Docker network
           ↓
[ Next.js / Nuxt.js / Nest.js+Angular Container ]
    (Application logic, hashing of passwords,
       calls to weather API, front-end UI)
```

### Contributing
1. Fork the repository and clone it locally.
2. Create your feature branch: git checkout -b feature/my-awesome-feature.
3. Commit your changes: git commit -m 'Add some new feature'.
4. Push the branch: git push origin feature/my-awesome-feature.
5. Open a pull request on GitHub and describe your changes.

### License
   - MIT License
   - Copyright (c) 2024 Personify Health, Inc.
   - https://github.com/dwoolworth/angular-reminder-app/blob/main/LICENSE

### Contact
   - Maintainer: **Activate** (Derrick Woolworth)
   - Issues/Bugs: Please create a new GitHub Issue in this repository.


## To Learn More About Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

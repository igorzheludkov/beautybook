This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Published version available by url - [https://krasa.uno](https://krasa.uno)

Basic design can be seen at - [https://www.figma.com/file/utVPe8BgbU1eqOXv727044/Service-CRM?node-id=0%3A1](https://www.figma.com/file/utVPe8BgbU1eqOXv727044/Service-CRM?node-id=0%3A1)

Site consists of three parts:
- user can create public personal page that can be accessed by uniq id or email
- user can turn on booking function, see bookings in calendar and receive notifications on telegram when a new booking is received
- also user can turn on visibility of the personal page in catalog of the services

Site is splitted on two parts: with public and private access for logged in users. To run private part you need to:
- create google api keys on this page - https://console.cloud.google.com/apis/credentials
- connect mongodb atlas or local instance

Names of the Secrets used in this project located in file env.example

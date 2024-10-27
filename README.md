## Getting Started

To run the development server:

```bash
npm run dev
```

To run ladle:

```bash
npm run ladle
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To update database schema, update ```src/prisma/prisma.schema``` file and then run inside src folder

```bash
1. npx prisma generate
2. npx prisma migrate dev --name <migration_file_name>
```

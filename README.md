## Getting Started

1. Start docker locally and run:

```bash
docker-compose up -d
```

2. To run the development server:

```bash
npm run dev
```

To run the socket.io server, run:

```bash
npm run socket.io
```

3. To run storybook:

```bash
npm run storybook
```

Then open localhost:6006 to see the result

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To update database schema, copy the `.env.example` as `.env`, fill the database URL, then update
`src/prisma/prisma.schema` file and then run inside src folder

```bash
1. npx prisma generate
2. npx prisma migrate dev --name <migration_file_name>
```

### Project Roadmap

- [x] Landing Page
- [x] Login
- [x] Register
- [x] Logout
- [ ] Forgot Password
- [x] Default Chat Rooms
- [ ] Load Chat Room Messages
- [ ] Send Message
- [ ] Admin User
- [ ] Moderator User
- [ ] Create Chat Room
- [ ] Delete Chat Room
- [ ] Private Chat Rooms
- [ ] Ban user from chat room
- [ ] User Profile
- [ ] Image and PDF upload in chat
- [ ] Image and PDF preview in chat history

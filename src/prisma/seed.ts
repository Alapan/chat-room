import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main () {
  await prisma.chatRoom.deleteMany();

  const sport = await prisma.chatRoom.upsert({
    where: { topic: 'sport'},
    update: {},
    create: {
      topic: 'Sports',
      image: 'sport',
      description: 'Exciting sports news',
    },
  });

  const politics = await prisma.chatRoom.upsert({
    where: { topic: 'politics' },
    update: {},
    create: {
      topic: 'Politics',
      image: 'politics',
      description: 'Discuss political matters around the world',
    },
  });

  const health = await prisma.chatRoom.upsert({
    where: { topic: 'health' },
    update: {},
    create: {
      topic: 'Health and Fitness',
      image: 'health',
      description: 'All health and fitness related discussions',
    },
  });

  const movies = await prisma.chatRoom.upsert({
    where: { topic: 'movies' },
    update: {},
    create: {
      topic: 'Movies',
      image: 'movie',
      description: 'Everything related to cinema',
    },
  });

  const books = await prisma.chatRoom.upsert({
    where: { topic: 'books' },
    update: {},
    create: {
      topic: 'Books',
      image: 'books',
      description: 'All literary matters',
    },
  })

  console.log({ sport, politics, health, movies, books});
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Error: ', e);
    await prisma.$disconnect();
    process.exit(1);
  });

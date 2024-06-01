const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

const NUM_USERS = 10; // Number of users to create
const MAX_CONTACTS = 5; // Maximum number of contacts per user

async function main() {
  // Delete all existing data
  await prisma.contact.deleteMany();
  await prisma.user.deleteMany();

  for (let i = 0; i < NUM_USERS; i++) {
    const user = await prisma.user.create({
      data: {
        name: faker.name.fullName(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    });

    const numContacts = faker.datatype.number({ min: 1, max: MAX_CONTACTS });
    for (let j = 0; j < numContacts; j++) {
      await prisma.contact.create({
        data: {
          name: faker.name.fullName(),
          phone: faker.phone.number(),
          userId: user.id,
          isSpam: faker.datatype.boolean(),
        },
      });
    }
  }
}

main()
  .then(() => {
    console.log('Database seeded successfully');
  })
  .catch((error) => {
    console.error('Error seeding database', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

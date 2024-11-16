import { PrismaClient } from "@prisma/client";
import fs from "fs";
import config from "../src/config/config.js";

const prisma = new PrismaClient();

async function main() {
  const data = JSON.parse(fs.readFileSync("prisma/seed.json", "utf-8"));

  // Create profiles
  const profiles = {};
  for (const profile of data.profiles) {
    profiles[profile.type] = await prisma.perfil.create({
      data: profile,
    });
  }

  // Create users
  const users = {};
  const categories = {};
  for (const user of data.users) {
    users[user.email] = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: user.password,
        image_url: user.image_url,
        PerfilId: profiles[user.perfilType].id,
        createdAt: config.formatDateTime(new Date()),
        updatedAt: config.formatDateTime(new Date()),
      },
    });
    // Create categories
    for (const category of data.categories) {
      categories[category.name] = await prisma.category.create({
        data: { ...category, userId: users[user.email].id },
      });
    }
  }

  // Create tasks
  for (const task of data.tasks) {
    await prisma.task.create({
      data: {
        userId: users[task.userEmail].id,
        categoryId: categories[task.categoryName].id,
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: config.formatDateTime(new Date(task.dueDate)),
        createdAt: config.formatDateTime(new Date()),
        updatedAt: config.formatDateTime(new Date()),
      },
    });
  }

  console.log("Seeding completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

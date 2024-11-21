import { PrismaClient } from "@prisma/client";
import fs from "fs";
import config from "../src/config/config.js";
import bcrypt from "bcrypt"

const prisma = new PrismaClient();
const saltRound = Number(process.env.SALT_ROUNDS);

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
    user.password = await bcrypt.hash(user.password, saltRound)
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
        nextDate: config.formatDateTime(new Date(task.nextDate)),
        createdAt: config.formatDateTime(new Date()),
        updatedAt: config.formatDateTime(new Date()),
      },
    });
  }

  for (const intTask of data.intervalTask){
    await prisma.task.create({
      data:{
        userId: users[intTask.userEmail].id,
        categoryId: categories[intTask.categoryName].id,
        title: intTask.title,
        description: intTask.description,
        status: intTask.status,
        nextDate: config.formatDateTime(new Date(intTask.nextDate)),
        nextInterval: intTask.nextInterval,
        days: intTask.days,
        repeatTimes: intTask.repeatTimes,
        createdAt: config.formatDateTime(new Date()),
        updatedAt: config.formatDateTime(new Date()),
      }
    })
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

import { prisma } from "../../config/db";
import bcrypt from "bcrypt";

export const adminTrainerService = {
  async createTrainer(name: string, email: string, password: string) {
    // check if user already exist
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) throw { status: 400, message: "Email already exist" };

    const hashedPassword = await bcrypt.hash(password, 10);

    return await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "TRAINER",
      },
    });
  },

  async getAllTrainer() {
    return await prisma.user.findMany({ where: { role: "TRAINER" } });
  },

  async deleteTrainer(id: number) {
    return await prisma.user.delete({ where: { id } });
  },

  async getTrainerById(id: number) {
    const trainer = await prisma.user.findUnique({
      where: { id, role: "TRAINER" },
    });
    if (!trainer) {
      throw new Error("Trainer not found");
    }
  },
};

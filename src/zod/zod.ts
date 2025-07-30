import { date, z } from "zod";

const UserSchema = z.object({
  name: z.string({
    error: (issue) =>
      issue.input === undefined
        ? "Name field is required"
        : "Name must be a string",
  }),

  email: z.email({
    error: (issue) =>
      issue.input === undefined
        ? "Email field is required"
        : "Invalid email format",
  }),
  password: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Password field is undefined"
          : "Provide a password string",
    })
    .min(6, "Minimum password length is 6"),
});

const UserLoginSchema = z.object({
  email: z.email({
    error: (issue) =>
      issue.input === undefined
        ? "Email field is required"
        : "Invalid email format",
  }),
  password: z.string({
    error: (issue) =>
      issue.input === undefined
        ? "Password field is undefined"
        : "Provide a password string",
  }),
});

const ScheduleSchema = z.object({
  trainerId: z.number({
    error: (issue) =>
      issue.input === undefined
        ? "trainerId is undefined"
        : "trainerId must be a number",
  }),
  date: z.string(),
  startTime: z.string({
    error: (issue) =>
      issue.input === undefined
        ? "startDate is required"
        : "startDate must be formate",
  }),
  endTime: z.string({
    error: (issue) =>
      issue.input === undefined
        ? "endDate is required"
        : "endDate must be formate",
  }),
});

export const CreateTrainerSchema = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Name filed is required"
          : "Name must be a string",
    })
    .min(2, "Name is required and must be at least 2 characters."),
  email: z.email({
    error: (issue) =>
      issue.input === undefined ? "Email is required" : "Invalid email format.",
  }),
  password: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Password is required"
          : "Password must be a string",
    })
    .min(6, "Password must be at least 6 characters."),
});

// new
const CreateScheduleSchema = z.object({
  trainerId: z
    .number({
      error: (issue) =>
        issue.input === undefined
          ? "trainerId is required"
          : "Trainer id must be a number",
    })
    .int()
    .positive(),
  date: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Date is required"
          : "Date must be valid string",
    })
    .refine((val) => !isNaN(Date.parse(val)), {
      error: "Invalid date format",
    })
    .transform((val) => new Date(val)),
  startTime: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "startTime is required"
          : "startTime must be valid string",
    })
    .refine((val) => !isNaN(Date.parse(val)), {
      error: "Invalid startTime format",
    })
    .transform((val) => new Date(val)),
});

const AssignTrainerToScheduleSchema = z.object({
  scheduleId: z
    .number({
      error: (issue) =>
        issue.input === undefined
          ? "scheduleId is required"
          : "scheduleId id must be a number",
    })
    .int()
    .positive(),
  trainerId: z
    .number({
      error: (issue) =>
        issue.input === undefined
          ? "trainerId is required"
          : "trainerId id must be a number",
    })
    .int()
    .positive(),
});

const DeleteScheduleSchema = z.object({
  scheduleId: z
    .number({
      error: (issue) =>
        issue.input === undefined
          ? "scheduleId is required"
          : "scheduleId id must be a number",
    })
    .int()
    .positive(),
});

const BookTraineeScheduleSchema = z.object({
  scheduleId: z
    .number({
      error: (issue) =>
        issue.input === undefined
          ? "scheduleId is required"
          : "scheduleId id must be a number",
    })
    .int()
    .positive(),
});

const CancelBookingSchema = z.object({
  id: z
    .number({
      error: (issue) =>
        issue.input === undefined
          ? "scheduleId is required"
          : "scheduleId id must be a number",
    })
    .int()
    .positive(),
});

export {
  UserSchema,
  UserLoginSchema,
  ScheduleSchema,
  CreateScheduleSchema,
  AssignTrainerToScheduleSchema,
  DeleteScheduleSchema,
  BookTraineeScheduleSchema,
  CancelBookingSchema,
};

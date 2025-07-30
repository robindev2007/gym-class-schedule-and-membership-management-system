"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelBookingSchema = exports.BookTraineeScheduleSchema = exports.DeleteScheduleSchema = exports.AssignTrainerToScheduleSchema = exports.CreateScheduleSchema = exports.ScheduleSchema = exports.UserLoginSchema = exports.UserSchema = exports.CreateTrainerSchema = void 0;
const zod_1 = require("zod");
const UserSchema = zod_1.z.object({
    name: zod_1.z.string({
        error: (issue) => issue.input === undefined
            ? "Name field is required"
            : "Name must be a string",
    }),
    email: zod_1.z.email({
        error: (issue) => issue.input === undefined
            ? "Email field is required"
            : "Invalid email format",
    }),
    password: zod_1.z
        .string({
        error: (issue) => issue.input === undefined
            ? "Password field is undefined"
            : "Provide a password string",
    })
        .min(6, "Minimum password length is 6"),
});
exports.UserSchema = UserSchema;
const UserLoginSchema = zod_1.z.object({
    email: zod_1.z.email({
        error: (issue) => issue.input === undefined
            ? "Email field is required"
            : "Invalid email format",
    }),
    password: zod_1.z.string({
        error: (issue) => issue.input === undefined
            ? "Password field is undefined"
            : "Provide a password string",
    }),
});
exports.UserLoginSchema = UserLoginSchema;
const ScheduleSchema = zod_1.z.object({
    trainerId: zod_1.z.number({
        error: (issue) => issue.input === undefined
            ? "trainerId is undefined"
            : "trainerId must be a number",
    }),
    date: zod_1.z.string(),
    startTime: zod_1.z.string({
        error: (issue) => issue.input === undefined
            ? "startDate is required"
            : "startDate must be formate",
    }),
    endTime: zod_1.z.string({
        error: (issue) => issue.input === undefined
            ? "endDate is required"
            : "endDate must be formate",
    }),
});
exports.ScheduleSchema = ScheduleSchema;
exports.CreateTrainerSchema = zod_1.z.object({
    name: zod_1.z
        .string({
        error: (issue) => issue.input === undefined
            ? "Name filed is required"
            : "Name must be a string",
    })
        .min(2, "Name is required and must be at least 2 characters."),
    email: zod_1.z.email({
        error: (issue) => issue.input === undefined ? "Email is required" : "Invalid email format.",
    }),
    password: zod_1.z
        .string({
        error: (issue) => issue.input === undefined
            ? "Password is required"
            : "Password must be a string",
    })
        .min(6, "Password must be at least 6 characters."),
});
// new
const CreateScheduleSchema = zod_1.z.object({
    trainerId: zod_1.z
        .number({
        error: (issue) => issue.input === undefined
            ? "trainerId is required"
            : "Trainer id must be a number",
    })
        .int()
        .positive(),
    date: zod_1.z
        .string({
        error: (issue) => issue.input === undefined
            ? "Date is required"
            : "Date must be valid string",
    })
        .refine((val) => !isNaN(Date.parse(val)), {
        error: "Invalid date format",
    })
        .transform((val) => new Date(val)),
    startTime: zod_1.z
        .string({
        error: (issue) => issue.input === undefined
            ? "startTime is required"
            : "startTime must be valid string",
    })
        .refine((val) => !isNaN(Date.parse(val)), {
        error: "Invalid startTime format",
    })
        .transform((val) => new Date(val)),
});
exports.CreateScheduleSchema = CreateScheduleSchema;
const AssignTrainerToScheduleSchema = zod_1.z.object({
    scheduleId: zod_1.z
        .number({
        error: (issue) => issue.input === undefined
            ? "scheduleId is required"
            : "scheduleId id must be a number",
    })
        .int()
        .positive(),
    trainerId: zod_1.z
        .number({
        error: (issue) => issue.input === undefined
            ? "trainerId is required"
            : "trainerId id must be a number",
    })
        .int()
        .positive(),
});
exports.AssignTrainerToScheduleSchema = AssignTrainerToScheduleSchema;
const DeleteScheduleSchema = zod_1.z.object({
    scheduleId: zod_1.z
        .number({
        error: (issue) => issue.input === undefined
            ? "scheduleId is required"
            : "scheduleId id must be a number",
    })
        .int()
        .positive(),
});
exports.DeleteScheduleSchema = DeleteScheduleSchema;
const BookTraineeScheduleSchema = zod_1.z.object({
    scheduleId: zod_1.z
        .number({
        error: (issue) => issue.input === undefined
            ? "scheduleId is required"
            : "scheduleId id must be a number",
    })
        .int()
        .positive(),
});
exports.BookTraineeScheduleSchema = BookTraineeScheduleSchema;
const CancelBookingSchema = zod_1.z.object({
    id: zod_1.z
        .number({
        error: (issue) => issue.input === undefined
            ? "scheduleId is required"
            : "scheduleId id must be a number",
    })
        .int()
        .positive(),
});
exports.CancelBookingSchema = CancelBookingSchema;

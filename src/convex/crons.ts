import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "clearExpiredSessions",
  { hours: 1},
  internal.mutations.session.deleteExpiredSessions,
  {}
);

export default crons;
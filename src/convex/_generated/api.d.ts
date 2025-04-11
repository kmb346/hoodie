/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as crons from "../crons.js";
import type * as http from "../http.js";
import type * as mutations_assignment from "../mutations/assignment.js";
import type * as mutations_class from "../mutations/class.js";
import type * as mutations_class_credit from "../mutations/class_credit.js";
import type * as mutations_class_record from "../mutations/class_record.js";
import type * as mutations_class_session from "../mutations/class_session.js";
import type * as mutations_location from "../mutations/location.js";
import type * as mutations_room from "../mutations/room.js";
import type * as mutations_session from "../mutations/session.js";
import type * as mutations_student from "../mutations/student.js";
import type * as mutations_user from "../mutations/user.js";
import type * as queries_class from "../queries/class.js";
import type * as queries_location from "../queries/location.js";
import type * as queries_session from "../queries/session.js";
import type * as queries_student from "../queries/student.js";
import type * as queries_user from "../queries/user.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  crons: typeof crons;
  http: typeof http;
  "mutations/assignment": typeof mutations_assignment;
  "mutations/class": typeof mutations_class;
  "mutations/class_credit": typeof mutations_class_credit;
  "mutations/class_record": typeof mutations_class_record;
  "mutations/class_session": typeof mutations_class_session;
  "mutations/location": typeof mutations_location;
  "mutations/room": typeof mutations_room;
  "mutations/session": typeof mutations_session;
  "mutations/student": typeof mutations_student;
  "mutations/user": typeof mutations_user;
  "queries/class": typeof queries_class;
  "queries/location": typeof queries_location;
  "queries/session": typeof queries_session;
  "queries/student": typeof queries_student;
  "queries/user": typeof queries_user;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

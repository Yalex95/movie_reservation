import { and, eq, like, or, sql } from "drizzle-orm";

import {db} from "..";
import { session, user } from "../schema";

type userFilterParams = {
  banned?: boolean;// cambiar en como esta cinfigurado en better auth
  search?: string;
  page?: number;
  limit?: number;
};
export async function findUsers(params: userFilterParams) {
  const { search, banned, page = 1, limit = 10 } = params;
  const offset = (page - 1) * limit;

  const conditions = [];

  if (typeof banned === "boolean") {
    conditions.push(eq(user.banned, banned));
  }

  if (search) {
    const q = `%${search.toLowerCase()}%`;

    conditions.push(
      or(
        like(sql`lower(${user.email})`, q),
        like(sql`lower(${user.name})`, q),
        like(sql`lower(${user.role})`, q),
      ),
    );
  }

  const data = await db.query.user.findMany({
    where: and(...conditions),
    limit,
    offset,
    orderBy: (user, { desc }) => [desc(user.createdAt)],
  });
  const countResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(user)
    .where(and(...conditions));
  const total = countResult[0]?.count ?? 0;
  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getUser(id: string) {
  const data = await db.select({
    id: user.id,
    name: user.name,
    email: user.email,
    email_verified: user.emailVerified,
    image: user.image,
    role: user.role,
    banned: user.banned,
    phone: user.phone,
    is_active: user.is_active,
    last_login_at: sql<Date | null>`(select max(${session.createdAt}) from ${session} where ${session.userId}=${user.id})`,

  }).from(user).where(eq(user.id, id)).limit(1);
  return data[0]??null;
}

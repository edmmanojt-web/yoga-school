import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function AdminUsersPage() {
  const users = await db.user.findMany({
    include: { profile: { select: { location: true } } },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-charcoal-700 text-2xl">Users</h1>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <table className="w-full text-sm" aria-label="Users table">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-charcoal-600">Name</th>
              <th className="text-left px-4 py-3 font-medium text-charcoal-600">Email</th>
              <th className="text-left px-4 py-3 font-medium text-charcoal-600">Role</th>
              <th className="text-left px-4 py-3 font-medium text-charcoal-600">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-4 py-3">
                  <p className="font-medium text-charcoal-700">{user.name ?? "—"}</p>
                </td>
                <td className="px-4 py-3 text-charcoal-500">{user.email}</td>
                <td className="px-4 py-3">
                  <Badge
                    variant={
                      user.role === "ADMIN"
                        ? "forest"
                        : user.role === "TEACHER"
                        ? "sage"
                        : "default"
                    }
                  >
                    {user.role}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-charcoal-500">
                  {new Date(user.createdAt).toLocaleDateString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <p className="text-center py-12 text-muted-foreground">No users yet.</p>
        )}
      </div>
    </div>
  );
}

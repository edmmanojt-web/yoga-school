import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { ProfileForm } from "@/components/dashboard/profile-form";

export default async function ProfilePage() {
  const session = await auth();
  const userId = (session!.user as any).id as string;

  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      email: true,
      phone: true,
      preferredLanguage: true,
      profile: {
        select: { bio: true, location: true, timezone: true },
      },
    },
  });

  if (!user) return null;

  return (
    <div className="max-w-2xl space-y-8">
      <h1 className="font-heading text-charcoal-700 text-2xl">Profile</h1>
      <ProfileForm user={user} />
    </div>
  );
}

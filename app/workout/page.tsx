import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export default async function WorkoutPage() {
  // wire Next cookies to Supabase SSR client
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options, maxAge: 0 });
        },
      },
    }
  );

  // ---- the rest of your logic stays the same ----
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return <main className="p-4">Please log in.</main>;

  // ... fetch profile, schedules, workouts, and render ...
}
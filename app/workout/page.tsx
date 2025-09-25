import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

type Item = {
  name: string;
  sets?: number | string;
  reps?: number | string;
  duration?: string;
  load?: string;
  tempo?: string;
  notes?: string;
  video?: string;
};

type SectionName = "Flexibility" | "Strength" | "Conditioning" | "SportSpecific";
type Section = { section: SectionName; items: Item[] };

export default async function WorkoutPage() {
  // Wire Next cookies to Supabase SSR client
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

  // Auth
  const { data: auth } = await supabase.auth.getUser();
  const user = auth?.user;
  if (!user) {
    return (
      <main className="px-6 py-8">
        <h1 className="text-2xl font-bold text-[#C9B037] mb-2">Today’s Workout</h1>
        <p className="text-gray-300">
          Please log in to view your workout.
        </p>
      </main>
    );
  }

  // (Optional) profile fetch (useful if you later need sport/timezone)
  const { data: profile } = await supabase
    .from("profiles")
    .select("sport, full_name, timezone")
    .eq("id", user.id)
    .single();

  // Compute "today" (server date). If you want per-athlete timezone later, we can adjust.
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  // Prefer an INDIVIDUAL schedule, unlocked today
  const { data: schedules, error: schedErr } = await supabase
    .from("workout_schedules")
    .select("id, workout_id, start_date, publish_at")
    .eq("target_type", "athlete")
    .eq("athlete_id", user.id)
    .lte("start_date", today)
    .order("start_date", { ascending: false })
    .limit(1);

  if (schedErr) {
    return (
      <main className="px-6 py-8">
        <h1 className="text-2xl font-bold text-[#C9B037] mb-2">Today’s Workout</h1>
        <p className="text-red-400">Error loading schedule.</p>
      </main>
    );
  }

  const sched = schedules?.[0];
  if (!sched) {
    return (
      <main className="px-6 py-8">
        <h1 className="text-2xl font-bold text-[#C9B037] mb-2">Today’s Workout</h1>
        <p className="text-gray-300">No individual workout is unlocked yet. Check back later.</p>
      </main>
    );
  }

  // Fetch workout content
  const { data: workout } = await supabase
    .from("workouts")
    .select("title, blocks, notes")
    .eq("id", sched.workout_id)
    .single();

  const blocks: Section[] = Array.isArray(workout?.blocks)
    ? (workout!.blocks as Section[])
    : [];

  // Enforce your display order
  const order: SectionName[] = ["Flexibility", "Strength", "Conditioning", "SportSpecific"];
  const ordered = order
    .map((sec) => blocks.find((b) => b.section === sec))
    .filter(Boolean) as Section[];

  return (
    <main className="px-6 py-8">
      <h1 className="text-2xl font-bold text-[#C9B037] mb-1">Today’s Workout</h1>
      <div className="text-sm text-gray-400 mb-6">
        {workout?.title} {profile?.full_name ? `— for ${profile.full_name}` : ""}
      </div>

      {ordered.map((section) => (
        <section key={section.section} className="mb-5">
          <div className="text-[#C9B037] font-semibold mb-2">
            {section.section === "SportSpecific" ? "Sport Specific" : section.section}
          </div>

          <div className="rounded-xl border border-gray-700 divide-y divide-gray-800 bg-black/40 overflow-hidden">
            {section.items.map((it, idx) => (
              <div key={idx} className="p-4">
                <div className="font-medium">{it.name}</div>
                <div className="text-sm text-gray-400 mt-0.5">
                  {it.sets ? `Sets: ${it.sets}  ` : ""}
                  {it.reps ? `Reps: ${it.reps}  ` : ""}
                  {it.duration ? `Time: ${it.duration}  ` : ""}
                  {it.load ? `Load: ${it.load}  ` : ""}
                  {it.tempo ? `Tempo: ${it.tempo}` : ""}
                </div>
                {it.notes && <div className="text-sm text-gray-400 mt-1">{it.notes}</div>}
                {it.video && (
                  <a
                    href={it.video}
                    target="_blank"
                    className="text-xs text-[#C9B037] underline mt-1 inline-block"
                  >
                    Demo video
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Completion stub */}
      <form action="/api/log-complete" method="post" className="mt-6">
        <input type="hidden" name="schedule_id" value={sched.id} />
        <button className="w-full py-3 rounded-xl bg-[#C9B037] text-black font-semibold">
          Mark Completed ✅
        </button>
      </form>
    </main>
  );
}
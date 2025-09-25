// app/workout/page.tsx
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/auth-helpers-nextjs";

export default async function WorkoutPage() {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies }
  );

  // 1) Get athlete profile (sport)
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return <div>Please log in.</div>;

  const { data: profile } = await supabase
    .from("profiles")
    .select("sport, id, full_name")
    .eq("id", user.id)
    .single();

  // 2) Determine “today” (server side). If you want client timezone,
  // pass a tz from client or store tz in profile and compute there.
  const today = new Date().toISOString().slice(0,10); // YYYY-MM-DD

  // 3) Fetch schedules that are unlocked today for this athlete/sport
  const { data: schedules, error } = await supabase
    .from("workout_schedules")
    .select("id, workout_id, start_date")
    .or(`and(target_type.eq.sport,sport.eq.${profile?.sport}),and(target_type.eq.athlete,athlete_id.eq.${user.id})`)
    .lte("start_date", today)       // visible if start_date <= today
    .order("start_date", { ascending: false })
    .limit(1);                      // just today's most recent (or adjust)

  if (error) return <div>Error loading schedule.</div>;
  if (!schedules || schedules.length === 0)
    return <div>No workout available yet. Check back later today.</div>;

  const sched = schedules[0];

  // 4) Join to workout content
  const { data: workout } = await supabase
    .from("workouts")
    .select("title, blocks, notes")
    .eq("id", sched.workout_id)
    .single();

  if (!workout) return <div>No workout content found.</div>;

  const blocks = Array.isArray(workout.blocks) ? workout.blocks : [];

  return (
    <main>
      <h1 className="text-2xl font-bold text-[#C9B037] mb-4">
        {workout.title} — {today}
      </h1>

      <section className="space-y-3 mb-8">
        {blocks.map((b: any, i: number) => (
          <div key={i} className="rounded-xl border border-[#2a2a2a] bg-black/40 p-4">
            <div className="font-semibold">{b.name}</div>
            <div className="text-gray-400 text-sm">{b.details}</div>
          </div>
        ))}
      </section>

      {/* Log button stub */}
      <form action="/api/log-complete" method="post">
        <input type="hidden" name="schedule_id" value={sched.id} />
        <button className="w-full py-3 rounded-xl bg-[#C9B037] text-black font-semibold">
          Mark Completed ✅
        </button>
      </form>
    </main>
  );
}
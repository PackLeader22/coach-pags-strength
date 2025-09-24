import Image from "next/image";

export default function Home() {
  const sports = [
    { name: "Hockey", file: "/hockey.png", link: "/hockey" },
    { name: "Lacrosse", file: "/lacrosse.png", link: "/lacrosse" },
    { name: "Baseball", file: "/baseball.png", link: "/baseball" },
    { name: "Football", file: "/football.png", link: "/football" },
    { name: "Track & Field", file: "/track.png", link: "/track" },
    { name: "Wrestling", file: "/wrestling.png", link: "/wrestling" },
    { name: "CrossFit", file: "/crossfit.png", link: "/crossfit" },
    { name: "Weightlifting", file: "/weightlifting.png", link: "/weightlifting" },
  ];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0B0B0B] text-white px-6 py-12">
      <Image
        src="/your-logo-file.png"  // <-- set to your real logo filename
        alt="Coach Pags Strength Logo"
        width={120}
        height={120}
        className="mb-8"
      />
      <div className="grid grid-cols-2 gap-6 w-full max-w-md">
        {sports.map((sport) => (
          <a
            key={sport.name}
            href={sport.link}
            className="flex items-center justify-center rounded-xl bg-[#1A1A1A] border border-[#C9B037] hover:bg-[#C9B037] transition h-24"
          >
            <Image src={sport.file} alt={`${sport.name} icon`} width={48} height={48} />
          </a>
        ))}
      </div>
    </main>
  );
}
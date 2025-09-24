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
      {/* Logo */}
      <Image
        src="/coachpagslogo.png" // replace with your actual logo file name
        alt="Coach Pags Strength Logo"
        width={120}
        height={120}
        className="mb-6"
      />

      {/* Title */}
      <h1 className="text-3xl font-bold mb-10 text-center">
        Coach Pags <span className="text-[#C9B037]">Strength</span>
      </h1>

      {/* Buttons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-md">
        {sports.map((sport) => (
          <a
            key={sport.name}
            href={sport.link}
            className="flex flex-col items-center justify-center gap-3 px-6 py-6 rounded-xl bg-[#1A1A1A] border border-[#C9B037] hover:bg-[#C9B037] hover:text-black transition"
          >
            <Image
              src={sport.file}
              alt={`${sport.name} icon`}
              width={64}
              height={64}
              className="object-contain"
            />
            <span className="font-semibold">{sport.name}</span>
          </a>
        ))}
      </div>
    </main>
  );
}
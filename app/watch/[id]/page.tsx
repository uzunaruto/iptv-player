import { CHANNELS } from "@/data/channels";
import { notFound } from "next/navigation";
import Player from "@/components/Player";
import Link from "next/link";
import ChannelCard from "@/components/ChannelCard";
import WatchlistButton from "@/components/WatchlistButton";

export function generateStaticParams() {
  return CHANNELS.map((c) => ({ id: c.id }));
}

export default async function WatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const decoded = decodeURIComponent(id);
  const channel = CHANNELS.find((c) => c.id === decoded);

  if (!channel) {
    notFound();
  }

  // Find related channels from same country
  const related = CHANNELS.filter(
    (c) => c.country === channel.country && c.id !== channel.id
  ).slice(0, 12);

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-white/5">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Link href="/" className="text-lg font-black tracking-tighter hover:opacity-80 transition">
            NONTON<span className="text-[#e50914]">.</span>
          </Link>
          <span className="text-white/30 text-sm">/</span>
          <Link
            href={`/?country=${encodeURIComponent(channel.country)}`}
            className="text-sm text-white/60 hover:text-white transition"
          >
            {channel.country}
          </Link>
          <span className="text-white/30 text-sm">/</span>
          <span className="text-sm text-white truncate">{channel.name}</span>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* Player */}
        <div className="relative aspect-video bg-[#0a0a0a] rounded-xl overflow-hidden ring-1 ring-white/10 shadow-[0_24px_60px_rgba(0,0,0,.5)]">
          <Player src={channel.url} poster={channel.logo} name={channel.name} type={channel.type} />
        </div>

        {/* Channel info */}
        <div className="mt-5 sm:mt-6 flex items-start gap-4 flex-wrap">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            {channel.logo && (
              <img
                src={channel.logo}
                alt={channel.name}
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-lg bg-white/5 p-2"
              />
            )}
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                {channel.name.split(" (")[0]}
              </h1>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 text-[10px] font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Live
                </span>
                <span className="text-sm text-white/60">{channel.country}</span>
                {channel.quality && (
                  <span className="px-2 py-0.5 rounded bg-[#e50914]/15 text-[#e50914] text-[10px] font-bold uppercase tracking-wider">
                    {channel.quality.replace(/[()]/g, "")}
                  </span>
                )}
                {channel.group && (
                  <span className="px-2 py-0.5 rounded bg-white/8 text-white/60 text-[10px] font-medium uppercase tracking-wider">
                    {channel.group.split(";")[0]}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <WatchlistButton id={channel.id} type="channel" title={channel.name} size="md" />
            <Link
              href="/"
              className="inline-flex items-center gap-2 glass text-white px-4 py-2.5 rounded-full text-sm font-semibold hover:bg-white/15 transition"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Kembali
          </Link>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-10 sm:mt-14">
            <h2 className="text-lg sm:text-xl font-bold mb-4">
              Channel lain dari {channel.country}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
              {related.map((c) => (
                <ChannelCard key={c.id} channel={c} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import type { Movie } from "@/data/movies";
import type { Channel } from "@/data/channels";
import { MOVIES, movieSlug } from "@/data/movies";
import { CHANNELS } from "@/data/channels";

const STORAGE_KEY = "nonton.watchlist.v1";

export interface WatchlistItem {
  type: "movie" | "channel";
  id: string;          // movie slug for movies, channel.id for channels
  title: string;
  image?: string;      // poster or logo
  subtitle?: string;   // genre/year or country
  addedAt: number;     // timestamp
}

export function useWatchlist() {
  const [items, setItems] = useState<WatchlistItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  const save = useCallback((newItems: WatchlistItem[]) => {
    setItems(newItems);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems)); } catch {}
  }, []);

  const add = useCallback((item: WatchlistItem) => {
    setItems(prev => {
      if (prev.some(i => i.id === item.id && i.type === item.type)) return prev;
      const next = [item, ...prev];
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const remove = useCallback((id: string, type: "movie" | "channel") => {
    setItems(prev => {
      const next = prev.filter(i => !(i.id === id && i.type === type));
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const toggle = useCallback((id: string, type: "movie" | "channel") => {
    items.some(i => i.id === id && i.type === type) ? remove(id, type) : add(
      type === "movie"
        ? movieToItem(MOVIES.find(m => movieSlug(m) === id))
        : channelToItem(CHANNELS.find(c => c.id === id))
    );
  }, [items, add, remove]);

  const isSaved = useCallback((id: string, type: "movie" | "channel") => {
    return items.some(i => i.id === id && i.type === type);
  }, [items]);

  return { items, add, remove, toggle, isSaved, save };
}

function movieToItem(movie?: Movie): WatchlistItem {
  return {
    type: "movie",
    id: movie ? movieSlug(movie) : "",
    title: movie?.title ?? "Unknown",
    image: movie ? `https://image.tmdb.org/t/p/w185${movie.poster}` : undefined,
    subtitle: movie?.genres.join(", "),
    addedAt: Date.now(),
  };
}

function channelToItem(channel?: Channel): WatchlistItem {
  return {
    type: "channel",
    id: channel?.id ?? "",
    title: channel?.name ?? "Unknown",
    image: channel?.logo,
    subtitle: channel?.country,
    addedAt: Date.now(),
  };
}

// Serialize movie + channel data for full watchlist
export function getFullWatchlist(items: WatchlistItem[]) {
  const movies: Movie[] = [];
  const channels: Channel[] = [];
  for (const item of items) {
    if (item.type === "movie") {
      const m = MOVIES.find(m => movieSlug(m) === item.id);
      if (m) movies.push(m);
    } else {
      const c = CHANNELS.find(ch => ch.id === item.id);
      if (c) channels.push(c);
    }
  }
  return { movies, channels };
}
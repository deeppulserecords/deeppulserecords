import "server-only";

const PLAYLIST_ID = process.env.SPOTIFY_PLAYLIST_ID ?? "3otNJ0MhB3MmCsZfsZkkvc";
const TOKEN_URL = "https://accounts.spotify.com/api/token";
const API_URL = "https://api.spotify.com/v1";

type SpotifyImage = {
  url: string;
  width?: number;
  height?: number;
};

type PlaylistArtist = {
  id: string;
  name: string;
  external_urls?: { spotify?: string };
};

type PlaylistTrack = {
  id: string;
  name: string;
  external_urls?: { spotify?: string };
  artists: PlaylistArtist[];
  album: {
    name: string;
    images: SpotifyImage[];
  };
};

type PlaylistItem = {
  track: PlaylistTrack | null;
};

type PlaylistResponse = {
  items: PlaylistItem[];
  next: string | null;
};

type EmbedTrackListItem = {
  uri: string;
  title: string;
  subtitle: string;
  entityType: string;
};

type EmbedTrackEntity = {
  id: string;
  title: string;
  uri: string;
  artists?: Array<{
    name: string;
    uri?: string;
  }>;
  visualIdentity?: {
    image?: Array<{
      url: string;
      maxHeight?: number;
      maxWidth?: number;
    }>;
  };
};

type ArtistResponse = {
  id: string;
  name: string;
  images: SpotifyImage[];
  external_urls?: { spotify?: string };
};

export type Release = {
  id: string;
  title: string;
  artistName: string;
  spotifyUrl: string;
  artwork: string;
  artworkAlt: string;
  featured: boolean;
};

export type Artist = {
  id: string;
  name: string;
  spotifyUrl: string;
  image: string | null;
};

export type DeeppulseContent = {
  releases: Release[];
  artists: Artist[];
  refreshedAt: string;
  nextRefreshAt: string;
  sourcePlaylistUrl: string;
};

let contentCache: DeeppulseContent | null = null;

function requireCredentials() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Missing Spotify credentials. Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET.");
  }

  return { clientId, clientSecret };
}

async function getAccessToken() {
  const { clientId, clientSecret } = requireCredentials();
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "grant_type=client_credentials",
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Spotify authentication failed: ${response.status}`);
  }

  const token = (await response.json()) as { access_token: string };
  return token.access_token;
}

async function spotifyFetch<T>(url: string, token: string): Promise<T> {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Spotify API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

function parseNextData(html: string) {
  const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/);

  if (!match?.[1]) {
    throw new Error("Spotify embed data was not found.");
  }

  return JSON.parse(match[1]) as {
    props?: {
      pageProps?: {
        state?: {
          data?: {
            entity?: unknown;
          };
        };
      };
    };
  };
}

function spotifyIdFromUri(uri?: string) {
  return uri?.split(":").pop() ?? "";
}

async function getPublicEmbedHtml(url: string) {
  const response = await fetch(url, {
    headers: {
      accept: "text/html",
      "user-agent": "Mozilla/5.0"
    },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Spotify public embed request failed: ${response.status}`);
  }

  return response.text();
}

async function getTrackFromEmbed(item: EmbedTrackListItem): Promise<PlaylistTrack> {
  const trackId = spotifyIdFromUri(item.uri);
  const html = await getPublicEmbedHtml(`https://open.spotify.com/embed/track/${trackId}`);
  const data = parseNextData(html);
  const entity = data.props?.pageProps?.state?.data?.entity as EmbedTrackEntity | undefined;

  if (!entity?.id) {
    throw new Error(`Spotify track embed did not include track data for ${trackId}.`);
  }

  const artists =
    entity.artists?.map((artist) => ({
      id: spotifyIdFromUri(artist.uri) || artist.name,
      name: artist.name,
      external_urls: artist.uri ? { spotify: `https://open.spotify.com/artist/${spotifyIdFromUri(artist.uri)}` } : undefined
    })) ?? [
      {
        id: item.subtitle,
        name: item.subtitle,
        external_urls: undefined
      }
    ];

  return {
    id: entity.id,
    name: entity.title,
    external_urls: { spotify: `https://open.spotify.com/track/${entity.id}` },
    artists,
    album: {
      name: entity.title,
      images:
        entity.visualIdentity?.image?.map((image) => ({
          url: image.url,
          width: image.maxWidth,
          height: image.maxHeight
        })) ?? []
    }
  };
}

async function getPlaylistTracksFromEmbed(): Promise<PlaylistTrack[]> {
  const html = await getPublicEmbedHtml(`https://open.spotify.com/embed/playlist/${PLAYLIST_ID}`);
  const data = parseNextData(html);
  const entity = data.props?.pageProps?.state?.data?.entity as { trackList?: EmbedTrackListItem[] } | undefined;
  const trackList = entity?.trackList?.filter((item) => item.entityType === "track").slice(0, 4) ?? [];

  return Promise.all(trackList.map((item) => getTrackFromEmbed(item)));
}

async function getPlaylistTracks(token: string): Promise<PlaylistTrack[]> {
  const tracks: PlaylistTrack[] = [];
  let next:
    | string
    | null = `${API_URL}/playlists/${PLAYLIST_ID}/tracks?limit=50&fields=items(track(id,name,external_urls,artists(id,name,external_urls),album(name,images))),next`;

  while (next) {
    try {
      const page: PlaylistResponse = await spotifyFetch<PlaylistResponse>(next, token);
      page.items.forEach((item: PlaylistItem) => {
        if (item.track?.id && item.track.external_urls?.spotify) {
          tracks.push(item.track);
        }
      });
      next = page.next;
    } catch {
      return getPlaylistTracksFromEmbed();
    }
  }

  return tracks;
}

async function getArtistDetails(artistIds: string[], token: string) {
  const artists = new Map<string, ArtistResponse>();

  for (let i = 0; i < artistIds.length; i += 50) {
    const batch = artistIds.slice(i, i + 50);
    const url = `${API_URL}/artists?ids=${batch.join(",")}`;
    let response: { artists: ArtistResponse[] };

    try {
      response = await spotifyFetch<{ artists: ArtistResponse[] }>(url, token);
    } catch {
      return artists;
    }

    response.artists.forEach((artist) => artists.set(artist.id, artist));
  }

  return artists;
}

function zonedLisbonTimeToUtc(lisbonClockDate: Date) {
  const guess = new Date(lisbonClockDate);
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Lisbon",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });
  const shown = Object.fromEntries(formatter.formatToParts(guess).map((part) => [part.type, part.value])) as Record<string, string>;
  const shownClock = new Date(`${shown.year}-${shown.month}-${shown.day}T${shown.hour}:${shown.minute}:${shown.second}Z`);
  const offset = shownClock.getTime() - lisbonClockDate.getTime();

  return new Date(guess.getTime() - offset);
}

function nextLisbonRefresh(from = new Date()) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Lisbon",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });

  const parts = Object.fromEntries(formatter.formatToParts(from).map((part) => [part.type, part.value])) as Record<string, string>;
  const weekdayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(parts.weekday);
  const lisbonClock = new Date(`${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}Z`);

  const candidates = [5, 6].map((day) => {
    const daysAhead = (day - weekdayIndex + 7) % 7;
    const candidate = new Date(lisbonClock);
    candidate.setUTCDate(candidate.getUTCDate() + daysAhead);
    candidate.setUTCHours(9, 0, 0, 0);

    if (candidate <= lisbonClock) {
      candidate.setUTCDate(candidate.getUTCDate() + 7);
    }

    return zonedLisbonTimeToUtc(candidate);
  });

  return candidates.sort((a, b) => a.getTime() - b.getTime())[0].toISOString();
}

function isCacheFresh() {
  if (!contentCache) return false;
  return new Date(contentCache.nextRefreshAt).getTime() > Date.now();
}

export async function getDeeppulseContent({ force = false } = {}): Promise<DeeppulseContent> {
  if (!force && isCacheFresh()) {
    return contentCache as DeeppulseContent;
  }

  const token = await getAccessToken();
  const tracks = await getPlaylistTracks(token);
  const uniqueArtists = new Map<string, PlaylistArtist>();

  tracks.forEach((track) => {
    track.artists.forEach((artist) => {
      if (artist.id && !uniqueArtists.has(artist.id)) {
        uniqueArtists.set(artist.id, artist);
      }
    });
  });

  const artistDetails = await getArtistDetails([...uniqueArtists.keys()], token);
  const releases = tracks.slice(0, 4).map<Release>((track, index) => ({
    id: track.id,
    title: track.name,
    artistName: track.artists.map((artist) => artist.name).join(", "),
    spotifyUrl: track.external_urls?.spotify ?? `https://open.spotify.com/playlist/${PLAYLIST_ID}`,
    artwork: track.album.images[0]?.url ?? "",
    artworkAlt: `${track.album.name} artwork`,
    featured: index === 0
  }));

  const artists = [...uniqueArtists.values()]
    .map<Artist>((artist) => {
      const detail = artistDetails.get(artist.id);
      return {
        id: artist.id,
        name: artist.name,
        spotifyUrl: detail?.external_urls?.spotify ?? artist.external_urls?.spotify ?? "",
        image: detail?.images[0]?.url ?? null
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  contentCache = {
    releases,
    artists,
    refreshedAt: new Date().toISOString(),
    nextRefreshAt: nextLisbonRefresh(),
    sourcePlaylistUrl: `https://open.spotify.com/playlist/${PLAYLIST_ID}`
  };

  return contentCache;
}

export function getFallbackContent(): DeeppulseContent {
  return {
    releases: [],
    artists: [],
    refreshedAt: "",
    nextRefreshAt: "",
    sourcePlaylistUrl: `https://open.spotify.com/playlist/${PLAYLIST_ID}`
  };
}

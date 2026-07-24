export type ArtistPlatform = "spotify" | "apple" | "amazon" | "pandora";

export type DeeppulseArtistLink = {
  platform: ArtistPlatform;
  label: string;
  url: string | null;
};

export type DeeppulseArtist = {
  name: string;
  instagram?: string | null;
  links: DeeppulseArtistLink[];
};

export const artists: DeeppulseArtist[] = [
  {
    name: "REMØRA",
    instagram: "https://www.instagram.com/remora_sleep/",
    links: [
      { platform: "spotify", label: "SPOTIFY", url: "https://open.spotify.com/intl-pt/artist/0Nbqt5GUfuG7JetAjGcBxl?si=jvIZEaQ7T-y1MwmZb9ZcRw" },
      { platform: "apple", label: "APPLE MUSIC", url: "https://music.apple.com/pt/artist/rem%C3%B8ra/1836144007" },
      { platform: "amazon", label: "AMAZON MUSIC", url: "https://www.amazon.com/music/player/artists/B0F7Y23MXH/rem%C3%B8ra" },
      { platform: "pandora", label: "PANDORA", url: "https://pandora.app.link/UXvQOySL0Vb" }
    ]
  },
  {
    name: "MIREO SUN",
    instagram: "https://www.instagram.com/mireo.sun.music/",
    links: [
      { platform: "spotify", label: "SPOTIFY", url: "https://open.spotify.com/intl-pt/artist/5eDiMSZlATc1w6HY7DG5T2?si=ZhHSLhjXTW6yGJ7y-kw82g" },
      { platform: "apple", label: "APPLE MUSIC", url: "https://music.apple.com/us/artist/mireo-sun/1895830129" },
      { platform: "amazon", label: "AMAZON MUSIC", url: "https://music.amazon.com/artists/B0GYZDLWFZ/mireo-sun" },
      { platform: "pandora", label: "PANDORA", url: "https://pandora.app.link/lut2nhKXw3b" }
    ]
  },
   {
  name: "AGA NOVA",
instagram: null,
links: [
  { platform: "spotify", label: "SPOTIFY", url: "coming" },
  { platform: "apple", label: "APPLE MUSIC", url: "coming" },
  { platform: "amazon", label: "AMAZON MUSIC", url: "coming" },
  { platform: "pandora", label: "PANDORA", url: "coming" }
]
  },
  {
    name: "NOVARION",
    instagram: "https://www.instagram.com/novarionsleep/",
    links: [
      { platform: "spotify", label: "SPOTIFY", url: "https://open.spotify.com/intl-pt/artist/7DiT7CA5PgStZrg6shM4Pl" },
      { platform: "apple", label: "APPLE MUSIC", url: "https://music.apple.com/us/artist/novarion/1820351682" },
      { platform: "amazon", label: "AMAZON MUSIC", url: "https://music.amazon.com/artists/B0FD35MVYW/novarion" },
      { platform: "pandora", label: "PANDORA", url: "https://www.pandora.com/artist/novarion/ARfltqg3j2kz5tK?part=ug-desktop&corr=84571138021155939" }
    ]
  },
  {
    name: "THEO SOUMNA",
    instagram: null,
    links: [
      { platform: "spotify", label: "SPOTIFY", url: "https://open.spotify.com/artist/3LrO6ZDSpahX11KkDWGJCg?si=FT9sfBwST86WESjpdK_dvQ" },
      { platform: "apple", label: "APPLE MUSIC", url: "https://music.apple.com/pt/artist/theo-soumna/1872123041" },
      { platform: "amazon", label: "AMAZON MUSIC", url: "https://music.amazon.com/artists/B0GJTXK638?ref=dm_sh_i7vd3YJz2OtAVeTXXlvkjfNhf" },
      { platform: "pandora", label: "PANDORA", url: "https://pandora.app.link/kgCKaxAIW2b" }
    ]
  },
  {
    name: "OWEN MAREK",
    instagram: null,
    links: [
      { platform: "spotify", label: "SPOTIFY", url: "https://open.spotify.com/artist/05h5sty3jc98PuowHByCIK?si=g0dID4hoS_O90EBtYIQA9g" },
      { platform: "apple", label: "APPLE MUSIC", url: "https://music.apple.com/pt/artist/owen-marek/1872133697" },
      { platform: "amazon", label: "AMAZON MUSIC", url: "https://music.amazon.com/artists/B0GJV1G578?ref=dm_sh_iUA7pA4ESuWCaBrum3SMEvYLO" },
      { platform: "pandora", label: "PANDORA", url: "https://pandora.app.link/Cxz7jryIW2b" }
    ]
  },
  {
    name: "ELIAS VARYN",
    instagram: null,
    links: [
      { platform: "spotify", label: "SPOTIFY", url: null },
      { platform: "apple", label: "APPLE MUSIC", url: null },
      { platform: "amazon", label: "AMAZON MUSIC", url: null },
      { platform: "pandora", label: "PANDORA", url: null }
    ]
  },
  {
  name: "NOAH SELVEK",
instagram: null,
links: [
  { platform: "spotify", label: "SPOTIFY", url: "https://open.spotify.com/intl-pt/artist/6eCgsHJWXTmxPOa22DbIAM?si=0TcXt2UQRhG3A2lDMTM-zQ" },
  { platform: "apple", label: "APPLE MUSIC", url: "https://music.apple.com/us/artist/noah-selvek/1885828203" },
  { platform: "amazon", label: "AMAZON MUSIC", url: "https://music.amazon.com/artists/B0GSW7HTHF/noah-selvek" },
  { platform: "pandora", label: "PANDORA", url: "https://pandora.app.link/Ya8V8WK5s4b" }
]
  },
  {
    name: "ADRIAN VALE",
    instagram: null,
    links: [
      { platform: "spotify", label: "SPOTIFY", url: null },
      { platform: "apple", label: "APPLE MUSIC", url: null },
      { platform: "amazon", label: "AMAZON MUSIC", url: null },
      { platform: "pandora", label: "PANDORA", url: null }
    ]
  },
  {
    name: "MILAN ORVEK",
    instagram: null,
    links: [
      { platform: "spotify", label: "SPOTIFY", url: null },
      { platform: "apple", label: "APPLE MUSIC", url: null },
      { platform: "amazon", label: "AMAZON MUSIC", url: null },
      { platform: "pandora", label: "PANDORA", url: null }
    ]
  }
];

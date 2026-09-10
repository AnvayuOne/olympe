// Confirmed campaign lineup, in campaign hierarchy order (not the asset
// filename order — the filenames do not correspond to billing).
// `image` points at the supplied campaign photography; nothing here is
// generated or substituted artwork.

// Every supplied poster is the same 4:5 portrait ratio (640x800,
// 1080x1350, or 2000x2500 — all simplify to 4:5), confirmed by reading
// each file's own dimensions rather than assumed.
export const ARTIST_ASPECT_RATIO = "4 / 5";

export const LINEUP = [
  { index: 1, name: "OGUZ", image: "/assets/olympe/artists/olympe10.jpg" },
  { index: 2, name: "REBEKAH", image: "/assets/olympe/artists/olympe8.jpg" },
  { index: 3, name: "STAN CHRIST", image: "/assets/olympe/artists/olympe9.jpg" },
  { index: 4, name: "TANJA MIJU", image: "/assets/olympe/artists/olympe6.jpg" },
  { index: 5, name: "KETTING", image: "/assets/olympe/artists/olympe5.jpg" },
  { index: 6, name: "KIM AHLF", image: "/assets/olympe/artists/olympe7.jpg" },
  { index: 7, name: "SIDEJOU", image: "/assets/olympe/artists/olympe4.jpg" },
  { index: 8, name: "BAKI", image: "/assets/olympe/artists/olympe2.jpg" },
  { index: 9, name: "34 EMOTIONS", image: "/assets/olympe/artists/olympe3.jpg" },
  {
    index: 10,
    name: "GRITTY PANDORA B2B PSYRA",
    image: "/assets/olympe/artists/olympe1.jpg",
  },
];

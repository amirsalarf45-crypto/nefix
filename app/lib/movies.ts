
export type Movie = {
  id: string;
  title: string;
  poster: string;
  backdrop?: string;
  videoUrl: string;
  subtitleUrl?: string;
  description: string;
  year: number;
  genre?: string;
  rating?: string;
  cast?: string[];
};

export const movies: Movie[] = [
  {
    id: "dune-part-two",
    title: "Dune: Part Two",
    poster: "/movies/dune-2.jpg",
    backdrop: "/movies/dune-2.jpg",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    year: 2024,
    genre: "Sci-Fi / Adventure",
    rating: "8.5",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"],
  },
  {
    id: "interstellar",
    title: "Interstellar",
    poster: "/movies/interstellar.jpg",
    backdrop: "/movies/interstellar.jpg",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    description: "A team of explorers travels beyond this galaxy to discover whether mankind has a future among the stars.",
    year: 2014,
    genre: "Sci-Fi / Drama",
    rating: "8.7",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
  },
  {
    id: "the-batman",
    title: "The Batman",
    poster: "/movies/the-batman.jpg",
    backdrop: "/movies/the-batman.jpg",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    description: "Batman investigates corruption in Gotham City and pursues a mysterious killer known as the Riddler.",
    year: 2022,
    genre: "Action / Crime",
    rating: "7.8",
    cast: ["Robert Pattinson", "Zoë Kravitz", "Paul Dano"],
  },
  {
    id: "joker",
    title: "Joker",
    poster: "/movies/joker.jpg",
    backdrop: "/movies/joker.jpg",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    description: "Arthur Fleck, a struggling comedian, descends into madness and becomes the infamous Joker.",
    year: 2019,
    genre: "Thriller / Drama",
    rating: "8.4",
    cast: ["Joaquin Phoenix", "Robert De Niro", "Zazie Beetz"],
  },
];

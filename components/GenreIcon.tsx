"use client";

import {
  Sword, // Ação
  Rocket, // Sci-Fi
  Drama, // Drama
  Mountain, // Aventura
  HatGlasses, // Crime
  HeartPulse, // Thriller
  Heart, // Romance
  Smile, // Comédia
  WandSparkles, // Fantasia
  Film, // Default
} from "lucide-react";

interface GenreIconProps {
  genre: string;
  className?: string;
}

export function GenreIcon({ genre, className }: GenreIconProps) {
  const props = { className: className || "h-6 w-6" };

  const normalizedGenre = genre.toLowerCase();

  switch (normalizedGenre) {
    case "action":
      return <Sword {...props} />;
    case "sci-fi":
      return <Rocket {...props} />;
    case "drama":
      return <Drama {...props} />;
    case "adventure":
      return <Mountain {...props} />;
    case "crime":
      return <HatGlasses {...props} />;
    case "thriller":
      return <HeartPulse {...props} />;
    case "romance":
      return <Heart {...props} />;
    case "comedy":
      return <Smile {...props} />;
    case "fantasy":
      return <WandSparkles {...props} />;
    default:
      return <Film {...props} />;
  }
}

"use client";

import { useState } from "react";
import { Button } from "./Button";
import { Movie } from "@/lib/types";
import { GenreIcon } from "./GenreIcon";
import { Copy, Check } from "lucide-react";

interface ResultsGridProps {
  recommendations: Movie[];
  onReset: () => void;
}

export function ResultsGrid({ recommendations, onReset }: ResultsGridProps) {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = (title: string, id: number) => {
    navigator.clipboard.writeText(title).then(
      () => {
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
      },
      (err) => {
        console.error("Falha ao copiar o texto: ", err);
      },
    );
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div className="w-full text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Recomendamos para você
        </h2>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Explore sua próxima aventura cinematográfica.
        </p>
      </div>

      <div className="mt-8 grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {recommendations.map((movie) => (
          <div
            key={movie.id}
            className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-200 ease-in-out
                       hover:scale-[1.03] hover:shadow-xl dark:bg-gray-800"
          >
            <div
              className="relative flex aspect-video w-full items-center justify-center rounded-t-xl bg-linear-to-br from-blue-500 to-indigo-600 p-4 text-white
                         dark:from-blue-700 dark:to-indigo-900 group-hover:from-blue-600 group-hover:to-indigo-700
                         transition-all duration-200 ease-in-out"
            >
              <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-200 group-hover:opacity-10"></div>

              <div className="grid grid-cols-3 gap-2">
                {movie.genres.slice(0, 4).map((genre) => (
                  <div
                    key={genre}
                    className="flex items-center justify-center rounded-full bg-white bg-opacity-20 p-2 backdrop-blur-sm"
                  >
                    <GenreIcon
                      genre={genre}
                      className="h-7 w-7 text-blue-600"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Detalhes do Filme */}
            <div className="flex flex-1 flex-col p-3">
              <div className="flex items-start justify-between">
                <h3
                  className="mb-1 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-base font-semibold text-gray-900 dark:text-white"
                  title={movie.title}
                >
                  {movie.title}
                </h3>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(movie.title, movie.id);
                  }}
                  className={`ml-2 shrink-0 rounded-md p-1 text-xs font-medium 
                              flex items-center justify-center gap-1
                              ${
                                copiedId === movie.id
                                  ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/50"
                                  : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                              }
                              transition-colors duration-300 ease-in-out`}
                  aria-label={
                    copiedId === movie.id
                      ? "Nome do filme copiado"
                      : "Copiar nome do filme"
                  }
                >
                  {copiedId === movie.id ? (
                    <Check className="h-4 w-4 animate-scale-in" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {copiedId === movie.id ? "Copiado!" : "Copiar"}
                  </span>
                </button>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400">
                {movie.genres.join(", ")}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Button onClick={onReset} className="mx-auto mt-10 max-w-md">
        + Nova recomendação
      </Button>
    </div>
  );
}

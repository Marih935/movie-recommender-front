"use client";

import { Sparkles } from "lucide-react";
import { Button } from "./Button";
import { Movies } from "@/lib/types";

interface MovieFormProps {
  selectedMovie: string;
  isLoading: boolean;
  movies: Movies[];
  onMovieChange: (value: string) => void;
  onSubmit: () => void;
}

export function MovieForm({
  selectedMovie,
  isLoading,
  movies,
  onMovieChange,
  onSubmit,
}: MovieFormProps) {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center">
      <div className="w-full">
        <h2 className="mb-4 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Escolha seu filme favorito
        </h2>
        <p className="mb-6 text-center text-gray-600 dark:text-gray-400">
          Para receber as melhores recomendações.
        </p>

        <select
          value={selectedMovie}
          onChange={(e) => onMovieChange(e.target.value)}
          disabled={isLoading}
          className="mt-2 block w-full appearance-none rounded-lg border border-gray-300 bg-white p-3 text-base text-gray-900 shadow-sm transition-colors duration-200 ease-in-out focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none
                     dark:border-gray-700 dark:bg-gray-800 dark:text-white
                     dark:focus:border-blue-500 dark:focus:ring-blue-500
                     disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500
                     dark:disabled:bg-gray-700 dark:disabled:text-gray-400"
        >
          <option value="">Selecione um filme...</option>
          {movies.map((movie) => (
            <option key={movie.id} value={movie.movieTitle}>
              {movie.movieTitle}
            </option>
          ))}
        </select>
      </div>

      <Button
        onClick={onSubmit}
        loading={isLoading}
        disabled={isLoading || !selectedMovie}
        className="mt-8"
      >
        {isLoading ? "Gerando recomendações..." : "Gerar recomendações"}
        {!isLoading && <Sparkles className="h-5 w-5" />}
      </Button>
    </div>
  );
}

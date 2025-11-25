"use client";

import { useState, useEffect, useRef } from "react";
import { Sparkles, Check, ChevronsUpDown, Search } from "lucide-react";
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
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(selectedMovie);
  }, [selectedMovie]);

  // Fecha a lista se clicar fora do componente
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredMovies =
    query === ""
      ? movies
      : movies
          .filter((movie) =>
            movie.movieTitle.toLowerCase().includes(query.toLowerCase()),
          )
          .slice(0, 50);

  const handleSelect = (movieTitle: string) => {
    onMovieChange(movieTitle);
    setQuery(movieTitle);
    setIsOpen(false);
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center">
      <div className="w-full">
        <h2 className="mb-4 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Escolha seu filme favorito
        </h2>
        <p className="mb-6 text-center text-gray-600 dark:text-gray-400">
          Para receber as melhores recomendações.
        </p>

        {/* Wrapper relativo para posicionar a lista absoluta */}
        <div ref={wrapperRef} className="relative mt-2">
          <div className="relative">
            {/* Ícone de Lupa à esquerda */}
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>

            <input
              type="text"
              className="block w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-base text-gray-900 shadow-sm transition-colors duration-200 ease-in-out focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:disabled:bg-gray-700"
              placeholder="Pesquise ou selecione um filme..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
                // Limpar seleção se o usuário apagar tudo
                if (e.target.value === "") onMovieChange("");
              }}
              onFocus={() => setIsOpen(true)}
              disabled={isLoading}
            />

            {/* Ícone de setas à direita (indicando dropdown) */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronsUpDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Lista Suspensa (Dropdown) */}
          {isOpen && filteredMovies.length > 0 && (
            <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:ring-gray-700 sm:text-sm">
              {filteredMovies.map((movie) => (
                <li
                  key={movie.id}
                  className={`relative cursor-default select-none py-2 pl-3 pr-9 transition-colors hover:bg-blue-100 dark:hover:bg-blue-900/30 ${
                    movie.movieTitle === selectedMovie
                      ? "bg-blue-50 text-blue-900 dark:bg-blue-900/50 dark:text-blue-100"
                      : "text-gray-900 dark:text-gray-100"
                  }`}
                  onClick={() => handleSelect(movie.movieTitle)}
                >
                  <span
                    className={`block truncate ${movie.movieTitle === selectedMovie ? "font-semibold" : "font-normal"}`}
                  >
                    {movie.movieTitle}
                  </span>

                  {/* Checkmark se estiver selecionado */}
                  {movie.movieTitle === selectedMovie && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600 dark:text-blue-400">
                      <Check className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}

          {/* Mensagem se não encontrar nada */}
          {isOpen && query !== "" && filteredMovies.length === 0 && (
            <div className="absolute z-10 mt-1 w-full rounded-md bg-white p-4 text-center text-sm text-gray-500 shadow-lg dark:bg-gray-800 dark:text-gray-400">
              Nenhum filme encontrado.
            </div>
          )}
        </div>
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

"use client";

import { useState, useEffect } from "react";
import { WandSparkles } from "lucide-react";
import { Button } from "@/components/Button";
import { MovieForm } from "@/components/MovieForm";
import { ResultsGrid } from "@/components/ResultsGrid";
import { Movie, Movies } from "@/lib/types";
import { ThemeToggle } from "@/components/ThemeToggle";

type AppState = "idle" | "loading" | "success" | "error";

// Rodando localmente com backend em .NET
// const API_URL = "https://localhost:7272/api/Movie";

// Rodando o docker localmente
const API_URL = "http://localhost:8080/api/Movie";

// Extraído para fora para manter o código limpo
const Header = () => (
  <header className="flex w-full flex-col items-center gap-2">
    <WandSparkles className="h-10 w-10 text-blue-600 dark:text-blue-400" />
    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
      MovieMatch
    </h1>
    <p className="text-lg text-gray-600 dark:text-gray-400">
      Sua próxima obsessão cinematográfica.
    </p>
  </header>
);

export default function Home() {
  // --- CORREÇÃO DE HIDRATAÇÃO ---
  // 1. Estado para saber se o componente já montou no cliente
  const [isMounted, setIsMounted] = useState(false);

  const [state, setState] = useState<AppState>("idle");
  const [selectedMovie, setSelectedMovie] = useState("");
  const [allMovies, setAllMovies] = useState<Movies[]>([]);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const response = await fetch(`${API_URL}/all`);
        if (!response.ok) {
          throw new Error("Falha ao carregar lista de filmes.");
        }
        const data: Movies[] = await response.json();
        setAllMovies(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
        setState("error");
      }
    };
    fetchAllMovies();
  }, []);

  const handleGenerate = async () => {
    if (!selectedMovie) return;

    setState("loading");
    setError(null);

    try {
      const movieToSend = allMovies.find((m) => m.movieTitle === selectedMovie);

      if (!movieToSend) {
        throw new Error("Filme selecionado não encontrado.");
      }

      const payload = {
        title: movieToSend.movieTitle,
        genres: movieToSend.genres,
      };

      const response = await fetch(`${API_URL}/recommender`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Falha ao buscar recomendações: ${errorData}`);
      }

      const data: Movie[] = await response.json();
      setRecommendations(data);
      console.log(data);
      setState("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      setState("error");
    }
  };

  const handleReset = () => {
    setState("idle");
    setSelectedMovie("");
    setError(null);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 md:p-8 dark:from-gray-950 dark:to-gray-900 transition-colors duration-300 ease-in-out">
      <div className="relative flex w-full max-w-5xl flex-col items-center space-y-10 rounded-3xl bg-white/90 p-8 sm:p-10 md:p-14 shadow-2xl backdrop-blur-md dark:bg-gray-800/90 dark:shadow-xl dark:shadow-gray-950/50 transition-colors duration-300 ease-in-out">
        <ThemeToggle />

        <Header />

        {state === "error" && (
          <div className="mx-auto w-full max-w-md rounded-lg border border-red-300 bg-red-50 p-4 text-center dark:border-red-700 dark:bg-red-900/30">
            <h3 className="text-xl font-semibold text-red-800 dark:text-red-200">
              Ocorreu um erro
            </h3>
            <p className="mt-2 text-sm text-red-600 dark:text-red-300">
              {error}
            </p>
            <Button
              onClick={handleReset}
              className="mt-6 bg-red-600! text-white! hover:bg-red-700!"
            >
              Tentar novamente
            </Button>
          </div>
        )}

        {state === "success" && (
          <ResultsGrid
            recommendations={recommendations}
            onReset={handleReset}
          />
        )}

        {(state === "idle" || state === "loading") && (
          <MovieForm
            selectedMovie={selectedMovie}
            isLoading={state === "loading"}
            movies={allMovies}
            onMovieChange={setSelectedMovie}
            onSubmit={handleGenerate}
          />
        )}
      </div>
    </main>
  );
}

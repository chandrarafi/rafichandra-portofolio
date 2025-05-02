"use client";

import React, { useState, useEffect } from "react";

import ScrollAnimationWrapper from "../ScrollAnimationWrapper";

const GITHUB_USERNAME = "chandrarafi";

interface Repository {
    id: number;
    name: string;
    description: string;
    html_url: string;
    language: string;
    stargazers_count: number;
    forks_count: number;
    updated_at: string;
}

const GitHubActivitySection = () => {
    const [repos, setRepos] = useState<Repository[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState({
        repos: 0,
        contributions: 0,
        pullRequests: 0,
        issues: 0,
    });

    // Fungsi untuk mengambil data repository
    useEffect(() => {
        const fetchGitHubData = async () => {
            try {
                // Mengambil repository
                const reposResponse = await fetch(
                    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=3`,
                );

                if (reposResponse.ok) {
                    const reposData = await reposResponse.json();

                    setRepos(reposData);

                    // Update stats
                    const allReposResponse = await fetch(
                        `https://api.github.com/users/${GITHUB_USERNAME}`,
                    );

                    if (allReposResponse.ok) {
                        const userData = await allReposResponse.json();

                        setStats((prev) => ({
                            ...prev,
                            repos: userData.public_repos || 0,
                        }));
                    }
                }
            } catch (error) {
                // Handle error silently
                setStats((prev) => ({
                    ...prev,
                    repos: 0,
                }));
            } finally {
                setIsLoading(false);
            }
        };

        fetchGitHubData();
    }, []);

    // Format tgl. untuk repository
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);

        return new Intl.DateTimeFormat("id-ID", {
            year: "numeric",
            month: "short",
            day: "numeric",
        }).format(date);
    };

    const languageColors: Record<string, string> = {
        JavaScript: "#f1e05a",
        TypeScript: "#3178c6",
        HTML: "#e34c26",
        CSS: "#563d7c",
        Python: "#3572A5",
        Java: "#b07219",
        PHP: "#4F5D95",
        Ruby: "#701516",
        "C#": "#178600",
        Go: "#00ADD8",
        Swift: "#ffac45",
        Kotlin: "#F18E33",
        Dart: "#00B4AB",
        Rust: "#dea584",
        null: "#6e7681", // For repositories without language
    };

    return (
        <ScrollAnimationWrapper>
            <section className="w-full py-12 md:py-16" id="github-activity">
                <div className="container mx-auto px-4">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#FF1CF7] to-[#b249f8]">
                        GitHub Activity
                    </h2>
                    <p className="text-center text-sm sm:text-base text-gray-300 max-w-2xl mx-auto mb-8 md:mb-12">
                        Lihat aktivitas terbaru saya di GitHub dan kontribusi pada proyek
                        open source
                    </p>

                    {/* GitHub Contributions & Stats */}
                    <div className="bg-[#161b22] p-4 md:p-6 rounded-xl border border-gray-700 shadow-xl mb-6 md:mb-8 max-w-5xl mx-auto">
                        <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">
                            Aktivitas GitHub
                        </h3>
                        <div className="overflow-hidden">
                            <div className="flex flex-col items-center">
                                {/* GitHub Contribution Graph */}
                                <img
                                    alt="GitHub Contribution Graph"
                                    className="w-full mb-4 md:mb-6"
                                    src={`https://github-readme-activity-graph.vercel.app/graph?username=${GITHUB_USERNAME}&bg_color=0d1117&color=58a6ff&line=58a6ff&point=FFFFFF&area=true&hide_border=true`}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
                                    {/* GitHub Statistics Card */}
                                    <img
                                        alt="GitHub Statistics"
                                        className="w-full rounded-lg border border-gray-700"
                                        src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&count_private=true&hide_border=true&theme=github_dark&bg_color=0D1117&title_color=58a6ff&icon_color=58a6ff&text_color=c9d1d9&include_all_commits=true`}
                                    />

                                    {/* GitHub Top Languages */}
                                    <img
                                        alt="GitHub Top Languages"
                                        className="w-full rounded-lg border border-gray-700"
                                        src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&hide_border=true&theme=github_dark&bg_color=0D1117&title_color=58a6ff&text_color=c9d1d9&langs_count=6`}
                                    />
                                </div>
                            </div>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-400 mt-3 md:mt-4">
                            Lihat kontribusi GitHub saya secara lengkap di{" "}
                            <a
                                className="text-blue-400 hover:underline"
                                href={`https://github.com/${GITHUB_USERNAME}`}
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                profil GitHub
                            </a>
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
                        {/* Recent Repositories */}
                        <div className="md:col-span-2 bg-[#161b22] p-4 md:p-6 rounded-xl border border-gray-700 shadow-xl">
                            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">
                                Repository Terbaru
                            </h3>

                            {isLoading ? (
                                <div className="flex items-center justify-center h-36 md:h-48">
                                    <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-t-2 border-b-2 border-blue-400" />
                                </div>
                            ) : repos.length > 0 ? (
                                <div className="space-y-3 md:space-y-4">
                                    {repos.map((repo) => (
                                        <div
                                            key={repo.id}
                                            className="p-3 md:p-4 rounded-lg bg-[#21262d] hover:bg-[#30363d] transition-colors"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <a
                                                    className="font-bold text-sm md:text-base text-blue-400 hover:underline truncate max-w-[200px] sm:max-w-xs"
                                                    href={repo.html_url}
                                                    rel="noopener noreferrer"
                                                    target="_blank"
                                                >
                                                    {repo.name}
                                                </a>
                                                <div className="flex items-center space-x-2 flex-shrink-0">
                                                    {repo.language && (
                                                        <span className="flex items-center text-xs bg-[#30363d] px-2 py-1 rounded-full">
                                                            <span
                                                                className="w-2 h-2 rounded-full mr-1"
                                                                style={{
                                                                    backgroundColor:
                                                                        languageColors[repo.language] ||
                                                                        languageColors.null,
                                                                }}
                                                            />
                                                            {repo.language}
                                                        </span>
                                                    )}
                                                    <span className="flex items-center text-xs">
                                                        <svg
                                                            className="h-3 w-3 md:h-4 md:w-4 mr-1"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                            />
                                                        </svg>
                                                        {repo.stargazers_count}
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="text-xs md:text-sm text-gray-300 mb-2 truncate-text">
                                                {repo.description || "No description provided."}
                                            </p>
                                            <div className="flex justify-between items-center text-xs text-gray-400">
                                                <span>Updated on {formatDate(repo.updated_at)}</span>
                                                <div className="flex space-x-2 items-center">
                                                    <span className="flex items-center">
                                                        <svg
                                                            className="h-3 w-3 mr-1"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                            />
                                                        </svg>
                                                        {repo.forks_count}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-[#21262d] rounded-lg p-4 text-center">
                                    <p className="text-gray-300">
                                        Tidak ada repository yang ditemukan.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* GitHub Stats */}
                        <div className="bg-[#161b22] p-4 md:p-6 rounded-xl border border-gray-700 shadow-xl">
                            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">
                                Statistik GitHub
                            </h3>

                            <div className="space-y-3 md:space-y-4">
                                <div className="bg-[#21262d] p-3 md:p-4 rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs md:text-sm text-gray-300">
                                            Total Repositories
                                        </span>
                                        <span className="font-semibold text-sm md:text-base">
                                            {stats.repos}
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-[#21262d] p-3 md:p-4 rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs md:text-sm text-gray-300">
                                            Recent Activity
                                        </span>
                                        <span className="font-semibold text-xs md:text-sm text-green-400">
                                            Active
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-700">
                                    <h4 className="text-sm md:text-base font-semibold mb-3">
                                        Top Languages:
                                    </h4>
                                    <div className="space-y-2">
                                        {["JavaScript", "PHP", "HTML", "CSS", "TypeScript"].map(
                                            (lang, index) => (
                                                <div key={lang} className="flex items-center space-x-2">
                                                    <span
                                                        className="w-3 h-3 rounded-full"
                                                        style={{ backgroundColor: languageColors[lang] }}
                                                    />
                                                    <span className="text-xs md:text-sm flex-1">
                                                        {lang}
                                                    </span>
                                                    <div className="w-full max-w-[100px] bg-gray-700 rounded-full h-1.5">
                                                        <div
                                                            className="h-1.5 rounded-full"
                                                            style={{
                                                                backgroundColor: languageColors[lang],
                                                                width: `${100 - index * 15}%`,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </ScrollAnimationWrapper>
    );
};

export default GitHubActivitySection;

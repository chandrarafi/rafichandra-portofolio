"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

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
    
    const containerRef = useRef<HTMLDivElement>(null);
    const { t, lang } = useLanguage();

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

    useGSAP(() => {
        // Animate title
        gsap.fromTo(
            ".github-title",
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
            }
        );

        // Animate main activity card
        gsap.fromTo(
            ".github-main-card",
            { opacity: 0, y: 50, scale: 0.95 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".github-main-card",
                    start: "top 80%",
                },
            }
        );

        // Animate repository cards
        if (!isLoading && repos.length > 0) {
            gsap.fromTo(
                ".github-repo-card",
                { opacity: 0, x: -30 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "back.out(1.2)",
                    scrollTrigger: {
                        trigger: ".github-repo-container",
                        start: "top 80%",
                    },
                }
            );
        }

        // Animate stats card
        gsap.fromTo(
            ".github-stats-card",
            { opacity: 0, x: 30 },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "back.out(1.2)",
                scrollTrigger: {
                    trigger: ".github-stats-card",
                    start: "top 80%",
                },
            }
        );
    }, { scope: containerRef, dependencies: [isLoading, repos.length] });

    // Format tgl. untuk repository
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);

        return new Intl.DateTimeFormat(lang === "id" ? "id-ID" : "en-US", {
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
        <div ref={containerRef}>
            <section className="w-full py-16 md:py-24" id="github-activity">
                <div className="container mx-auto px-4">
                    <div className="github-title">
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-4 md:mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#FF1CF7] to-[#b249f8] tracking-tight">
                            {t("github.title")}
                        </h2>
                        <p className="text-center text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-12 md:mb-16">
                            {t("github.subtitle")}
                        </p>
                    </div>

                    {/* GitHub Contributions & Stats */}
                    <div className="github-main-card bg-[#161b22] p-6 md:p-8 rounded-2xl border border-gray-700/50 shadow-2xl mb-8 md:mb-12 max-w-5xl mx-auto hover:border-[#b249f8]/30 transition-colors duration-500">
                        <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-white">
                            {t("github.activityTitle")}
                        </h3>
                        <div className="overflow-hidden">
                            <div className="flex flex-col items-center">
                                {/* GitHub Contribution Graph */}
                                <img
                                    alt="GitHub Contribution Graph"
                                    className="w-full mb-6 md:mb-8 rounded-lg filter drop-shadow-lg"
                                    src={`https://github-readme-activity-graph.vercel.app/graph?username=${GITHUB_USERNAME}&bg_color=0d1117&color=58a6ff&line=58a6ff&point=FFFFFF&area=true&hide_border=true`}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                    {/* GitHub Statistics Card */}
                                    <img
                                        alt="GitHub Statistics"
                                        className="w-full rounded-xl border border-gray-700/50 hover:border-[#58a6ff]/50 transition-colors"
                                        src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&count_private=true&hide_border=true&theme=github_dark&bg_color=0D1117&title_color=58a6ff&icon_color=58a6ff&text_color=c9d1d9&include_all_commits=true&locale=${lang}`}
                                    />

                                    {/* GitHub Top Languages */}
                                    <img
                                        alt="GitHub Top Languages"
                                        className="w-full rounded-xl border border-gray-700/50 hover:border-[#FF1CF7]/50 transition-colors"
                                        src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&hide_border=true&theme=github_dark&bg_color=0D1117&title_color=58a6ff&text_color=c9d1d9&langs_count=6&locale=${lang}`}
                                    />
                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 mt-6 text-center">
                            {t("github.seeFullProfile")}{" "}
                            <a
                                className="text-[#58a6ff] hover:text-[#b249f8] hover:underline transition-colors font-medium"
                                href={`https://github.com/${GITHUB_USERNAME}`}
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                {t("github.profileLink")}
                            </a>
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
                        {/* Recent Repositories */}
                        <div className="github-repo-container lg:col-span-2 bg-[#161b22] p-6 md:p-8 rounded-2xl border border-gray-700/50 shadow-2xl hover:border-[#58a6ff]/30 transition-colors duration-500">
                            <h3 className="text-xl md:text-2xl font-bold mb-6 text-white">
                                {t("github.recentRepos")}
                            </h3>

                            {isLoading ? (
                                <div className="flex items-center justify-center h-36 md:h-48">
                                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#58a6ff]" />
                                </div>
                            ) : repos.length > 0 ? (
                                <div className="space-y-4">
                                    {repos.map((repo) => (
                                        <div
                                            key={repo.id}
                                            className="github-repo-card p-5 rounded-xl bg-[#0d1117] border border-gray-700/30 hover:border-[#58a6ff]/40 hover:shadow-[0_0_15px_rgba(88,166,255,0.1)] transition-all group"
                                        >
                                            <div className="flex justify-between items-start mb-3">
                                                <a
                                                    className="font-bold text-base md:text-lg text-[#58a6ff] group-hover:text-[#b249f8] transition-colors truncate max-w-[200px] sm:max-w-xs"
                                                    href={repo.html_url}
                                                    rel="noopener noreferrer"
                                                    target="_blank"
                                                >
                                                    {repo.name}
                                                </a>
                                                <div className="flex items-center space-x-3 flex-shrink-0">
                                                    {repo.language && (
                                                        <span className="flex items-center text-xs font-medium bg-[#161b22] px-2.5 py-1 rounded-full border border-gray-700/50">
                                                            <span
                                                                className="w-2.5 h-2.5 rounded-full mr-1.5"
                                                                style={{
                                                                    backgroundColor:
                                                                        languageColors[repo.language] ||
                                                                        languageColors.null,
                                                                }}
                                                            />
                                                            {repo.language}
                                                        </span>
                                                    )}
                                                    <span className="flex items-center text-xs font-medium text-gray-300 bg-[#161b22] px-2.5 py-1 rounded-full border border-gray-700/50">
                                                        <svg
                                                            className="h-3.5 w-3.5 mr-1 text-[#f1e05a]"
                                                            fill="currentColor"
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                                            />
                                                        </svg>
                                                        {repo.stargazers_count}
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                                                {repo.description || t("github.noDescription")}
                                            </p>
                                            <div className="flex justify-between items-center text-xs text-gray-500 font-medium">
                                                <span>{t("github.updatedOn")} {formatDate(repo.updated_at)}</span>
                                                <div className="flex items-center">
                                                    <svg
                                                        className="h-3.5 w-3.5 mr-1"
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
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-[#0d1117] rounded-xl p-6 text-center border border-gray-700/30">
                                    <p className="text-gray-400">
                                        {t("github.noRepos")}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* GitHub Stats */}
                        <div className="github-stats-card bg-[#161b22] p-6 md:p-8 rounded-2xl border border-gray-700/50 shadow-2xl hover:border-[#FF1CF7]/30 transition-colors duration-500">
                            <h3 className="text-xl md:text-2xl font-bold mb-6 text-white">
                                {t("github.statsTitle")}
                            </h3>

                            <div className="space-y-4">
                                <div className="bg-[#0d1117] p-4 rounded-xl border border-gray-700/30">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-400">
                                            {t("github.totalRepos")}
                                        </span>
                                        <span className="font-bold text-lg text-white">
                                            {stats.repos}
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-[#0d1117] p-4 rounded-xl border border-gray-700/30">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-400">
                                            {t("github.recentActivity")}
                                        </span>
                                        <span className="font-semibold text-sm px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                                            {t("github.active")}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-gray-700/50">
                                    <h4 className="text-base font-semibold mb-4 text-gray-200">
                                        {t("github.topLangs")}
                                    </h4>
                                    <div className="space-y-3">
                                        {["JavaScript", "PHP", "HTML", "CSS", "TypeScript"].map(
                                            (lang, index) => (
                                                <div key={lang} className="flex items-center space-x-3">
                                                    <span
                                                        className="w-3.5 h-3.5 rounded-full shadow-sm"
                                                        style={{ backgroundColor: languageColors[lang] }}
                                                    />
                                                    <span className="text-sm font-medium text-gray-300 w-20">
                                                        {lang}
                                                    </span>
                                                    <div className="flex-1 bg-[#0d1117] rounded-full h-2 border border-gray-700/30 overflow-hidden">
                                                        <div
                                                            className="h-full rounded-full"
                                                            style={{
                                                                backgroundColor: languageColors[lang],
                                                                width: `${100 - index * 18}%`,
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
        </div>
    );
};

export default GitHubActivitySection;

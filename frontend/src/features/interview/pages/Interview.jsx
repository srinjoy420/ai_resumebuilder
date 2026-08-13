import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import "../style/interview.scss";

import { useInterview } from "../hooks/useInterview";

const NAV_ITEMS = [
    {
        id: "technical",
        label: "Technical Questions",
    },
    {
        id: "behavioral",
        label: "Behavioral Questions",
    },
    {
        id: "roadmap",
        label: "Road Map",
    },
];

const Interview = () => {
    const { interviewId } = useParams();

    const {
        report,
        loading,
        generateReport,
        generateResumePdf,
    } = useInterview();

    const [activeSection, setActiveSection] = useState("technical");

    const technicalRef = useRef(null);
    const behavioralRef = useRef(null);
    const roadmapRef = useRef(null);

    const sectionRefs = {
        technical: technicalRef,
        behavioral: behavioralRef,
        roadmap: roadmapRef,
    };

    // -----------------------------------------
    // Fetch Interview Report
    // -----------------------------------------
    useEffect(() => {
        if (interviewId) {
            generateReport(interviewId).catch(console.error);
        }
    }, [interviewId]);

    // -----------------------------------------
    // Intersection Observer
    // -----------------------------------------
    useEffect(() => {
        if (!report) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const matchedId = Object.keys(sectionRefs).find(
                            (id) =>
                                sectionRefs[id].current === entry.target
                        );

                        if (matchedId) {
                            setActiveSection(matchedId);
                        }
                    }
                });
            },
            {
                root: null,
                rootMargin: "-40% 0px -50% 0px",
                threshold: 0,
            }
        );

        Object.values(sectionRefs).forEach((ref) => {
            if (ref.current) {
                observer.observe(ref.current);
            }
        });

        return () => observer.disconnect();
    }, [report]);

    // -----------------------------------------
    // Navigation
    // -----------------------------------------
    const handleNavClick = (id) => {
        setActiveSection(id);

        sectionRefs[id].current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    // -----------------------------------------
    // Loading
    // -----------------------------------------
    if (loading) {
        return (
            <div className="interview-page">
                <div className="interview-layout">
                    <main className="interview-content">
                        <p>Loading interview report...</p>
                    </main>
                </div>
            </div>
        );
    }

    // -----------------------------------------
    // No Report
    // -----------------------------------------
    if (!report) {
        return (
            <div className="interview-page">
                <div className="interview-layout">
                    <main className="interview-content">
                        <p>
                            No interview report found. Please return to
                            the home page and try again.
                        </p>
                    </main>
                </div>
            </div>
        );
    }

    // -----------------------------------------
    // Report Data
    // -----------------------------------------
    const technicalQuestions =
        report.technicalQuestions || [];

    const behavioralQuestions =
        report.behavioralQuestions ||
        report.bhavioralQuestions ||
        [];

    const skillGaps =
        report.skillGap ||
        report.skillGaps ||
        [];

    const roadmapDays =
        report.preparationPlan ||
        report.preparaqtionPlan ||
        [];

    const score =
        report.matchScore ??
        report.score ??
        0;

    const scoreClass =
        score >= 75
            ? "score--high"
            : score >= 50
            ? "score--medium"
            : "score--low";

    // -----------------------------------------
    // Download PDF
    // -----------------------------------------
    const handleDownloadResume = async () => {
        try {
            await generateResumePdf(interviewId);
        } catch (error) {
            console.error(
                "Could not download resume:",
                error
            );
        }
    };

    return (
        <div className="interview-page">
            <div className="interview-layout">

                {/* -------------------------------- */}
                {/* Navigation */}
                {/* -------------------------------- */}

                <nav className="interview-nav">
                    <div className="nav-content">

                        <p className="interview-nav__label">
                            Sections
                        </p>

                        {NAV_ITEMS.map((item) => (
                            <button
                                key={item.id}
                                className={`interview-nav__item ${
                                    item.id === activeSection
                                        ? "interview-nav__item--active"
                                        : ""
                                }`}
                                type="button"
                                onClick={() =>
                                    handleNavClick(item.id)
                                }
                            >
                                <span className="interview-nav__icon">
                                    ◉
                                </span>

                                {item.label}
                            </button>
                        ))}

                    </div>

                    {/* -------------------------------- */}
                    {/* Download Resume Button */}
                    {/* -------------------------------- */}

                    <button
                        className="button primary-button"
                        type="button"
                        onClick={handleDownloadResume}
                        disabled={loading}
                    >
                        {loading
                            ? "Generating..."
                            : "Download Resume"}
                    </button>
                </nav>

                <div className="interview-divider" />

                {/* -------------------------------- */}
                {/* Main Content */}
                {/* -------------------------------- */}

                <main className="interview-content">

                    <section>

                        {/* -------------------------------- */}
                        {/* Technical Questions */}
                        {/* -------------------------------- */}

                        <div
                            className="content-header"
                            ref={technicalRef}
                        >
                            <h2>
                                Technical Questions
                            </h2>

                            <span className="content-header__count">
                                {technicalQuestions.length} questions
                            </span>
                        </div>

                        <div className="q-list">

                            {technicalQuestions.map(
                                (q, index) => (
                                    <div
                                        key={index}
                                        className="q-card"
                                    >
                                        <div className="q-card__header">

                                            <span className="q-card__index">
                                                Q{index + 1}
                                            </span>

                                            <p className="q-card__question">
                                                {q.question}
                                            </p>

                                        </div>

                                        <div className="q-card__body">

                                            <div className="q-card__section">

                                                <span className="q-card__tag q-card__tag--intention">
                                                    Intention
                                                </span>

                                                <p>
                                                    {q.intension}
                                                </p>

                                            </div>

                                            <div className="q-card__section">

                                                <span className="q-card__tag q-card__tag--answer">
                                                    Model Answer
                                                </span>

                                                <p>
                                                    {q.answer}
                                                </p>

                                            </div>

                                        </div>
                                    </div>
                                )
                            )}

                        </div>

                        {/* -------------------------------- */}
                        {/* Behavioral Questions */}
                        {/* -------------------------------- */}

                        <div
                            className="content-header"
                            ref={behavioralRef}
                        >
                            <h2>
                                Behavioral Questions
                            </h2>

                            <span className="content-header__count">
                                {behavioralQuestions.length} questions
                            </span>
                        </div>

                        <div className="q-list">

                            {behavioralQuestions.map(
                                (q, index) => (
                                    <div
                                        key={index}
                                        className="q-card"
                                    >
                                        <div className="q-card__header">

                                            <span className="q-card__index">
                                                Q{index + 1}
                                            </span>

                                            <p className="q-card__question">
                                                {q.question}
                                            </p>

                                        </div>

                                        <div className="q-card__body">

                                            <div className="q-card__section">

                                                <span className="q-card__tag q-card__tag--intention">
                                                    Intention
                                                </span>

                                                <p>
                                                    {q.intension}
                                                </p>

                                            </div>

                                            <div className="q-card__section">

                                                <span className="q-card__tag q-card__tag--answer">
                                                    Model Answer
                                                </span>

                                                <p>
                                                    {q.answer}
                                                </p>

                                            </div>

                                        </div>
                                    </div>
                                )
                            )}

                        </div>

                        {/* -------------------------------- */}
                        {/* Preparation Plan */}
                        {/* -------------------------------- */}

                        <div
                            className="content-header"
                            ref={roadmapRef}
                        >
                            <h2>
                                Preparation Plan
                            </h2>
                        </div>

                        <div className="roadmap-list">

                            {roadmapDays.map((day) => (
                                <div
                                    key={day.day}
                                    className="roadmap-card"
                                >
                                    <h3>
                                        Day {day.day}:{" "}
                                        {day.focus}
                                    </h3>

                                    <ul>

                                        {day.tasks?.map(
                                            (task, index) => (
                                                <li key={index}>
                                                    {task}
                                                </li>
                                            )
                                        )}

                                    </ul>
                                </div>
                            ))}

                        </div>

                    </section>

                </main>

                <div className="interview-divider" />

                {/* -------------------------------- */}
                {/* Sidebar */}
                {/* -------------------------------- */}

                <aside className="interview-sidebar">

                    <div className="match-score">

                        <p className="match-score__label">
                            Match Score
                        </p>

                        <div
                            className={`match-score__ring ${scoreClass}`}
                        >
                            <span className="match-score__value">
                                {score}
                            </span>

                            <span className="match-score__pct">
                                %
                            </span>
                        </div>

                        <p className="match-score__sub">
                            Match for this role
                        </p>

                    </div>

                    <div className="sidebar-divider" />

                    <div className="skill-gaps">

                        <p className="skill-gaps__label">
                            Skill Gaps
                        </p>

                        <div className="skill-gaps__list">

                            {skillGaps.map(
                                (gap, index) => (
                                    <span
                                        key={index}
                                        className={`skill-tag skill-tag--${
                                            gap.sevarity ||
                                            gap.severity ||
                                            "low"
                                        }`}
                                    >
                                        {gap.skill}
                                    </span>
                                )
                            )}

                        </div>

                    </div>

                </aside>

            </div>
        </div>
    );
};

export default Interview;
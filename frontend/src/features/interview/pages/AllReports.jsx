import React, { useEffect } from 'react'
import '../style/home.scss'
import { useInterview } from '../hooks/useInterview'
import { useNavigate } from 'react-router-dom'


const AllReports = () => {
    const { reports, loading, fetchAllReports } = useInterview()
    const navigate = useNavigate()

    useEffect(() => {
        fetchAllReports().catch(console.error)
    }, [])

    return (
        <main className='home'>
            <section className='interview-shell'>
                <div className='top-bar'>
                    <button
                        className='button secondary-button'
                        type='button'
                        onClick={() => navigate('/')}
                    >
                        ← Back
                    </button>
                </div>

                <div className='hero'>
                    <p className='eyebrow'>Your history</p>
                    <h1>All interview reports</h1>
                    <p className='subtext'>Click any report below to view the full breakdown.</p>
                </div>

                <section className='recent-reports'>
                    {loading && <p>Loading reports...</p>}

                    {!loading && reports?.length === 0 && (
                        <p>No interview reports yet. Generate your first one from the home page.</p>
                    )}

                    {!loading && reports?.length > 0 && (
                        <div className='reports-grid'>
                            {reports.map((item) => (
                                <button
                                    key={item._id}
                                    className='report-card'
                                    type='button'
                                    onClick={() => navigate(`/interview/${item._id}`)}
                                >
                                    <p>{item.jobDecsription?.slice(0, 120) || 'Untitled job description'}</p>
                                    <span>View report</span>
                                </button>
                            ))}
                        </div>
                    )}
                </section>
            </section>
        </main>
    )
}

export default AllReports
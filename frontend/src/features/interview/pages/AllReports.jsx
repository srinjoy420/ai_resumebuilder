import React, { useEffect } from 'react'
import '../style/home.scss'
import { useInterview } from '../hooks/useInterview'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


const AllReports = () => {
    const { reports, loading, fetchAllReports, handelDeleteReport } = useInterview()
    const [deletingId, setDeletingID] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        fetchAllReports().catch(console.error)
    }, [])
    const deleteOneReport = async (event, reportId) => {
        event.stopPropagation()
        const confirmed = window.confirm("Deleting this report are you sure?this can't be undone")
        if (!confirmed) {
            return
        }
        try {
            setDeletingID(reportId)
            await handelDeleteReport(reportId)
        } catch (error) {
            console.error(error)

        }
        finally {
            setDeletingID(null)
        }

    }

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
                                <div key={item._id} className='report-card-wrapper'>
                                    <button

                                        className='report-card'
                                        type='button'
                                        onClick={() => navigate(`/interview/${item._id}`)}
                                    >
                                        <p>{item.jobDecsription?.slice(0, 120) || 'Untitled job description'}</p>
                                        <span>View report</span>
                                    </button>
                                    <button
                                    type='button'
                                     className='delete-report-button'
                                     onClick={(event)=>deleteOneReport(event,item._id)}
                                     disabled={deletingId===item._id}
                                     aria-label='Delete report'
                                    >
                                         {deletingId === item._id ? '…' : '✕'}
                                    </button>
                                </div>


                            ))}
                        </div>
                    )}
                </section>
            </section>
        </main>
    )
}

export default AllReports
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../style/home.scss'
import { useInterview } from '../hooks/useInterview'
import { useAuth } from '../../auth/hooks/useauth'


const Home = () => {
    const [jobDescription, setJobDescription] = useState('')
    const [selfDescription, setSelfDescription] = useState('')
    const [resumeFile, setResumeFile] = useState(null)
     const [showAllReports, setShowAllReports] = useState(false)
    const [error, setError] = useState('')
    const fileInputRef = useRef(null)
    const navigate = useNavigate()

    const { reports, loading, handleGenerateReport, fetchAllReports } = useInterview()
    const  {handleLogout}=useAuth()
    useEffect(() => {
        fetchAllReports().catch(console.error)
    }, [])

    const handleFileChange = (event) => {
        setResumeFile(event.target.files?.[0] || null)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError('')

        if (!jobDescription.trim() || !selfDescription.trim() || !resumeFile) {
            setError('Job description, self description, and resume are required.')
            return
        }

        try {
            const report = await handleGenerateReport({
                resumeFile,
                selfDescription,
                jobDecsription: jobDescription
            })

            if (report?._id) {
                navigate(`/interview/${report._id}`)
            }
        } catch (submitError) {
            console.error(submitError)
            setError('Unable to generate interview report. Please try again.')
        }
    }
    const handleLogoutClick=async()=>{
        try{
            await handleLogout()
            navigate("/login")
        }
        catch(error){
            console.log("error logging out",error)
        }
    }

    return (
        <main className='home'>
            <div className='top-bar'>
                   <button
                    className='button secondary-button'
                    type='button'
                    onClick={() => navigate('/reports')}
                >
                    See all reports
                </button>
                 <button className='button logout-button' type='button'
                 onClick={handleLogoutClick}
                 >
                    Logout
                 </button>

            </div>
            <section className='interview-shell'>
                <div className='hero'>
                    <p className='eyebrow'>AI Interview Coach</p>
                    <h1>Prepare for your next big opportunity</h1>
                    <p className='subtext'>Paste the job description, upload your resume, and share your background to generate a tailored interview report.</p>
                </div>

                <form className='interview-input-group' onSubmit={handleSubmit}>
                    <div className='left'>
                        <label htmlFor='job-description'>Job description</label>
                        <textarea
                            name='job-description'
                            id='job-description'
                            value={jobDescription}
                            onChange={(event) => setJobDescription(event.target.value)}
                            placeholder='Enter the job description here...'
                        />
                    </div>

                    <div className='right'>
                        <div className='input-group'>
                            <p className='highlight'>Use your resume and self-description for the best results.</p>
                            <label className='file-label' htmlFor='resume'>
                                {resumeFile ? resumeFile.name : 'Upload resume'}
                            </label>
                            <input
                                hidden
                                ref={fileInputRef}
                                type='file'
                                name='resume'
                                id='resume'
                                accept='.pdf'
                                onChange={handleFileChange}
                            />
                        </div>

                        <div className='input-group'>
                            <label htmlFor='self-description'>Self description</label>
                            <textarea
                                name='self-description'
                                id='self-description'
                                value={selfDescription}
                                onChange={(event) => setSelfDescription(event.target.value)}
                                placeholder='Describe yourself in a few words...'
                            />
                        </div>

                        {error && <p className='error-text'>{error}</p>}

                        <button className='generate-button button primary-button' type='submit' disabled={loading}>
                            {loading ? 'Generating report…' : 'Generate interview report'}
                        </button>
                    </div>
                </form>

                {reports?.length > 0 && (
                    <section className='recent-reports'>
                        <h2>Previous interview reports</h2>
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
                    </section>
                )}
            </section>
        </main>
    )
}

export default Home
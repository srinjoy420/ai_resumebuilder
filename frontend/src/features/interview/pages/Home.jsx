import React from 'react'
import '../style/home.scss'

const Home = () => {
    return (
        <main className='home'>
            <section className='interview-shell'>
                <div className='hero'>
                    <p className='eyebrow'>AI Interview Coach</p>
                    <h1>Prepare for your next big opportunity</h1>
                    <p className='subtext'>Paste the job description, upload your resume, and share your background to generate a tailored interview report.</p>
                </div>

                <div className='interview-input-group'>
                    <div className='left'>
                        <label htmlFor='job-DescCription'>Job description</label>
                        <textarea
                            name='job-DescCription'
                            id='job-DescCription'
                            placeholder='Enter the job description here...'
                        />
                    </div>

                    <div className='right'>
                        <div className='input-group'>
                            <p className='highlight'>Use your resume and self-description for the best results.</p>
                            <label className='file-label' htmlFor='resume'>
                                Upload resume
                            </label>
                            <input hidden type='file' name='resume' id='resume' accept='.pdf' />
                        </div>

                        <div className='input-group'>
                            <label htmlFor='SelfDescRiption'>Self description</label>
                            <textarea
                                name='SelfDescRiption'
                                id='SelfDescRiption'
                                placeholder='Describe yourself in a few words...'
                            />
                        </div>

                        <button className='generate-button button primary-button'>Generate interview report</button>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Home
import React from 'react'
import '../style/interview.scss'

const NAV_ITEMS = [
  { id: 'technical', label: 'Technical Questions' },
  { id: 'behavioral', label: 'Behavioral Questions' },
  { id: 'roadmap', label: 'Road Map' },
]

const technicalQuestions = [
  {
    question: 'How do you approach debugging a production issue you did not cause?',
    intention: 'Evaluate structured problem-solving and calmness under pressure.',
    answer: 'I would reproduce the issue, gather evidence, isolate the failing layer, and communicate my findings clearly before applying a fix.',
  },
  {
    question: 'What is the difference between state and props in React?',
    intention: 'Check core front-end fundamentals.',
    answer: 'Props are passed from parent to child and are read-only, while state is internal and can change over time within a component.',
  },
]

const behavioralQuestions = [
  {
    question: 'Tell me about a time you worked under a deadline.',
    intention: 'Assess prioritization and ownership.',
    answer: 'I broke the work into milestones, communicated risks early, and focused on delivering the highest-impact items first.',
  },
]

const roadmapDays = [
  {
    day: 1,
    focus: 'Review fundamentals',
    tasks: ['Revisit core JavaScript and React concepts', 'Practice two debugging scenarios'],
  },
  {
    day: 2,
    focus: 'System design',
    tasks: ['Study API design patterns', 'Prepare a short explanation of scalability trade-offs'],
  },
]

const skillGaps = [
  { skill: 'System Design', severity: 'high' },
  { skill: 'Communication', severity: 'medium' },
  { skill: 'Testing', severity: 'low' },
]

const Interview = () => {
  return (
    <div className='interview-page'>
      <div className='interview-layout'>
        <nav className='interview-nav'>
          <div className='nav-content'>
            <p className='interview-nav__label'>Sections</p>
            {NAV_ITEMS.map((item) => (
              <button key={item.id} className={`interview-nav__item ${item.id === 'technical' ? 'interview-nav__item--active' : ''}`}>
                <span className='interview-nav__icon'>◉</span>
                {item.label}
              </button>
            ))}
          </div>
          <button className='button primary-button'>Download Resume</button>
        </nav>

        <div className='interview-divider' />

        <main className='interview-content'>
          <section>
            <div className='content-header'>
              <h2>Technical Questions</h2>
              <span className='content-header__count'>{technicalQuestions.length} questions</span>
            </div>
            <div className='q-list'>
              {technicalQuestions.map((q, index) => (
                <div key={index} className='q-card'>
                  <div className='q-card__header'>
                    <span className='q-card__index'>Q{index + 1}</span>
                    <p className='q-card__question'>{q.question}</p>
                  </div>
                  <div className='q-card__body'>
                    <div className='q-card__section'>
                      <span className='q-card__tag q-card__tag--intention'>Intention</span>
                      <p>{q.intention}</p>
                    </div>
                    <div className='q-card__section'>
                      <span className='q-card__tag q-card__tag--answer'>Model Answer</span>
                      <p>{q.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        <div className='interview-divider' />

        <aside className='interview-sidebar'>
          <div className='match-score'>
            <p className='match-score__label'>Match Score</p>
            <div className='match-score__ring score--high'>
              <span className='match-score__value'>87</span>
              <span className='match-score__pct'>%</span>
            </div>
            <p className='match-score__sub'>Strong match for this role</p>
          </div>

          <div className='sidebar-divider' />

          <div className='skill-gaps'>
            <p className='skill-gaps__label'>Skill Gaps</p>
            <div className='skill-gaps__list'>
              {skillGaps.map((gap, index) => (
                <span key={index} className={`skill-tag skill-tag--${gap.severity}`}>
                  {gap.skill}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Interview
import './Work.scss'
import WorkItem from './WorkItem/WorkItem'

const Work = () => {
  return (
    <div className="container">
    <section className='work-container center'>
      <div className="work">
        <h2 className='work__title'>my work</h2>
        <div className="work__list">
          <WorkItem title="NewsWeb" content='Co-created NewsWeb, a hub for news powered by Firebase.' link="https://newsweb-f200b.firebaseapp.com/"/>
          <WorkItem title='MOD Barber' content='Created a website for my barber that was designed by her.' link="https://mod-barbershop.netlify.app/"/>
          <WorkItem title='Coming soon...' content='Cooking up a fresh project to stretch my skills — stay tuned for the reveal!' link=""/>
        </div>
      </div>
    </section>
    </div>
  )
}

export default Work

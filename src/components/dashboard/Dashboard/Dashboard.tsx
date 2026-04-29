import ActiveListings from './ActivePropertyList/ActiveListings'
import DashboardCharts from './DashboardCharts'
import StatsCards from './Statics'


const Dashboard = () => {
  return (
    <div className=''>
      <StatsCards />
      <DashboardCharts />     
      <ActiveListings /> 
    </div>
  )
}

export default Dashboard
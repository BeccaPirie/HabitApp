import ReactEcharts from "echarts-for-react"
import { StyledChart } from "./styles/Chart.styled"
import moment from "moment"
import _ from "lodash"
import { useState, useEffect } from "react"

const weeks = [0, -1, -2, -3]

export default function Chart({data}) {
    const [view, setView] = useState("week")
    const [chartData, setChartData] = useState([])
    const [xAxis, setXAxis] = useState([])

    // chart options
    const option = {
        legend: {},
        tooltip: {},
        dataset: {
            dimensions: ['date', 'Completed', 'Skipped', 'Missed'],
            source: chartData
        },
        xAxis: {type: 'category', data: xAxis},
        yAxis: {type: 'value', min: 0, max: 7},
        series: [{type: 'bar'}, {type: 'bar'}, {type: 'bar'}]
    }

    // set x axis
    useEffect(() => {
        setXAxis([])

        // get dates for past four weeks
        const getWeekRange = (week) => {
            const weekStart = moment().add(week, 'weeks').startOf('week')
            const days = []
            for (let i = 0; i < 7; i++) {
                days.push(weekStart.clone().add(i, 'day').format('DD/MM/YY'))
            }
            return days
        }

        // use the start date of each week for x axis
        weeks.forEach(week => {
            const dates = getWeekRange(week)
            setXAxis(currentDates => [dates[0], ...currentDates] )
        })
    }, [])

    // set chart data
    useEffect(() => {
        setChartData([])
        let reformatData = []

        // read months 1-12 instead of 0-11
        const reformatDate = (date) => {
            const tmp = date.split('-')
            tmp[1] = parseInt(tmp[1]) + 1
            const newDate = `${tmp[0]}/${tmp[1]}/${tmp[2]}`
            return newDate
        }

        // reformat each date
        if(data !== undefined) {
            reformatData = data.map(({date, ...data}) => ({
                date: reformatDate(date),
                ...data
            }))
        }       

        // group calendar data by week
        const sort = _.groupBy(reformatData, (data) => moment(data.date, 'YYYY-MM-DD').startOf(view).format('DD/MM/YY')) 

        // count the occurence of each status value and add to chart data
        Object.entries(sort).forEach(([label, value]) => {
            if(moment(label, 'DD/MM/YY').isBefore(moment(xAxis[0], 'DD/MM/YY'))) return

            const chartValues = value.reduce((total, current) => {
                total[current.status] = (total[current.status] || 0) + 1
                return total
            }, {})

            const chartData = {
                date: label,
                Completed: chartValues.Completed || 0,
                Skipped: chartValues.Skipped || 0,
                Missed: chartValues.Missed || 0
            }
            setChartData(currentData => [...currentData, chartData])    
        })
    }, [data, view, xAxis])

    return(
        <StyledChart>
            <ReactEcharts option={option} />
            <button onClick={() => setView('week')}>Past 4 Weeks</button>
            <button>Past 6 Months</button>
            <button>Past Year</button>
        </StyledChart>
    )
}
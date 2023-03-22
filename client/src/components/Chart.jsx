import ReactEcharts from "echarts-for-react"
import moment from "moment"
import _ from "lodash"
import { useState, useEffect } from "react"
import { ButtonStyled } from "./styles/Button.styled"
import { StyledChart } from "./styles/Chart.styled"
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const weeks = [0, 1, 2, 3]
const months = [0, 1, 2, 3, 4, 5]
const year = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

export default function Chart({data}) {
    const [view, setView] = useState("week")
    const [chartData, setChartData] = useState([])
    const [xAxis, setXAxis] = useState([])
    const [yAxisMax, setYAxisMax] = useState()

    // chart options
    const option = {
        legend: {},
        tooltip: {},
        dataset: {
            dimensions: ['date', 'Missed', 'Skipped', 'Completed'],
            source: chartData
        },
        xAxis: {type: 'category', data: xAxis},
        yAxis: {type: 'value', min: 0, max: yAxisMax},
        series: [{
            type: 'bar',
            itemStyle: {color: '#f08ca2'}
        },
        {
            type: 'bar',
            itemStyle: {color: '#78cbe4'}
        },
        {
            type: 'bar',
            itemStyle: {color: '#d1ed8a'}
        }]
    }

    // set x axis
    useEffect(() => {
        setXAxis([])

        // get dates for past four weeks
        const getWeekRange = (week) => {
            const weekStart = moment().subtract(week, 'weeks').startOf('week')
            const dates = []
            for (let i = 0; i < 7; i++) {
                dates.push(weekStart.clone().add(i, 'day').format('DD/MM/YY'))
            }
            return dates
        }

        // set x axis to first day of week and max y axis to 7
        if(view === 'week') {
            weeks.forEach(week => {
                const dates = getWeekRange(week)
                setXAxis(currentDates => [dates[0], ...currentDates] )
            })
          setYAxisMax(7)
        }
        // set x axis to month name and max y axis to 31
        else if(view === 'month') {
            months.forEach(month => {
                const monthName = moment().subtract(month, 'months').format('MMM')
                setXAxis(currentMonths => [monthName, ...currentMonths])
            })
            setYAxisMax(31)
        }
        else if(view === 'year') {
            year.forEach(month => {
                const monthName = moment().subtract(month, 'months').format('MMM')
                setXAxis(currentMonths => [monthName, ...currentMonths])
            })
            setYAxisMax(31)
        }

    }, [view])

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
        
        // set data label
        const setLabel = (label) => {
            if(view === 'week') return label
            else if(view === 'month' || view === 'year') {
                return moment(label, 'DD/MM/YYYY').format('MMM')
            }
        }

        // group calendar data
        let sort
        if(view === 'week') {
            sort = _.groupBy(reformatData, (data) => moment(data.date, 'YYYY-MM-DD').startOf('week').format('DD/MM/YY'))
        }
        else if(view === 'month' || view === 'year') {
            sort = _.groupBy(reformatData, (data) => moment(data.date, 'YYYY-MM-DD').startOf('month').format('DD/MM/YY'))            
        }
        
        // count the occurence of each status value and add to chart data
        Object.entries(sort).forEach(([label, value]) => {
            if(moment(label, 'DD/MM/YY').isBefore(moment(xAxis[0], 'DD/MM/YY'))) return

            const chartValues = value.reduce((total, current) => {
                total[current.status] = (total[current.status] || 0) + 1
                return total
            }, {})

            const chartData = {
                date: setLabel(label),
                Missed: chartValues.Missed || 0,
                Skipped: chartValues.Skipped || 0,
                Completed: chartValues.Completed || 0
            }
            setChartData(currentData => [...currentData, chartData])
        })

    }, [data, view, xAxis])

    return(
        <StyledChart>
            <ReactEcharts option={option} />
            <div className="chart-btns">
            <ButtonGroup variant="contained" aria-label="calendar button group">
                <Button onClick={() => setView('week')}>Past 4 Weeks</Button>
                <Button onClick={() => setView('month')}>Past 6 Months</Button>
                <Button onClick={() => setView('year')}>Past Year</Button>
            </ButtonGroup>
            </div>
        </StyledChart>
    )
}
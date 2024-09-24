
var now = moment().endOf('day').toDate();
var yearAgo = moment().startOf('day').subtract(1, 'year').toDate();
var titleData = [];
var chartData = d3.timeDays(yearAgo, now).map(function (dateElement,i) {
    titleData.push("");
    return {
        date: dateElement,
        count : 0,
    };
});

//성능 문제 없을거임
for (const idx in traceHeatmapList) {
    let curDate = new Date(traceHeatmapList[idx].createdDate);
    let yearAgoDate = new Date(yearAgo);
    curDate.setHours(0,0,0,0);
    let subDay = curDate.getTime() - yearAgoDate.getTime();
    subDay /= (1000 * 60 * 60 * 24);
    chartData[subDay].count++;
    titleData[subDay] = traceHeatmapList[idx].title.substring(0,16) + "...";
}

var chart = calendarHeatmapMini()
    .max(4)
    .data(chartData)
    .titleData(titleData)
    .selector('#heatmap')
    .colorRange(['#a1e4ac', '#216e39'])
    .tooltipEnabled(true)
    .legendEnabled(true)
    .tooltipUnit(
        [
            {min: 0, unit: '기록 없음'},
            {min: 1, max: 'Infinity', unit: '개의 기록'}
        ]
    )
    .locale({
        months: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        days: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        on : '',
        No: '',
        Less: '1',
        More: '4 이상',
    });

chart();
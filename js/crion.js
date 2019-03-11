var chartContainer = document.getElementById('chartContainer');

chartContainer.ondragstart = function () {
    return false;
};

document.addEventListener('keyup', renderGraph); // Re-renders the graph on key release

chartContainer.onmousedown = function (event) {
    var offSetX = event.clientX - chartContainer.getBoundingClientRect().left;  //get relative clicked X coordinate
    var offSetY = event.clientY - chartContainer.getBoundingClientRect().top;   //get relative clicked Y coordinate
    chartContainer.style.position = 'absolute';

    document.addEventListener('mousemove', onMouseMove);    //Move chartContainer onMouseMove

    chartContainer.onmouseup = function () {    //Remove event listeners on mouseUp
        document.removeEventListener('mousemove', onMouseMove);
        chartContainer.onmouseup = null;
    };

    function moveAt(pageX, pageY) { 
        chartContainer.style.left = pageX - offSetX + 'px';
        chartContainer.style.top = pageY - offSetY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

};

function renderGraph() {
    var m = parseInt(document.getElementById('m-input').value, 10); // get m
    var c = parseInt(document.getElementById('c-input').value, 10); // get c

    if ((m || m === 0) && (c || c === 0)) { // if m and c are integers
        var data = calculatePointsXY(m, c);    // Calculate Points to plot
        function calculatePointsXY(m, c) {
            var resultXY = [];
            resultXY.push({ x: 0, y: c }); // y when x is 0
            resultXY.push({ x: 1, y: m + c });  //y when x = 1
            resultXY.push({ x: 2, y: 2 * m + c }); // y when x=2
            return resultXY;
        }
        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            theme: "light2",
            axisY: {
                includeZero: true,
                minimum: 0,
                maxmimum: 100,
                interval: 1
            },
            axisX: {
                includeZero: true,
                minimum: 0,
                maxmimum: 100,
                interval: 1
            },
            data: [{
                type: "line",
                dataPoints: data
            }]
        });
        chart.render();
    }
}

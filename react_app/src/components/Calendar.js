var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var startYear = 2000;
var endYear = 2021;
var month = 0;
var year = 0;

function loadCalendarMonths() {
    for (let i = 0; i < months.length; i++) {
        var doc = document.createElement("div");
        doc.innerHTML = months[i];
        doc.classList.add("dropdown-item");
        console.log(doc)

        doc.onclick = (function () {
            var selectedMonth = i;
            return function () {
                month = selectedMonth;
                document.getElementById("curMonth").innerHTML = months[month];
                loadCalendarDays();
                return month;
            }
        })();
        
        document.getElementById("months").appendChild(doc);
    }
}

function loadCalendarYears() {
    document.getElementById("years").innerHTML = "";

    for (let i = startYear; i <= endYear; i++) {
        var doc = document.createElement("div");
        doc.innerHTML = i;
        doc.classList.add("dropdown-item");

        doc.onclick = (function () {
            var selectedYear = i;
            return function () {
                year = selectedYear;
                document.getElementById("curYear").innerHTML = year;
                loadCalendarDays();
                return year;
            }
        })();

        document.getElementById("years").appendChild(doc);
    }
}

function loadCalendarDays() {
    document.getElementById("calendarDays").innerHTML = "";

    var tmpDate = new Date(year, month, 0);
    var num = daysInMonth(month, year);
    var dayofweek = tmpDate.getDay();       // find where to start calendar day of week

    for (let i = 0; i <= dayofweek; i++) {
        let d = document.createElement("div");
        d.classList.add("day");
        d.classList.add("blank");
        document.getElementById("calendarDays").appendChild(d);
    }

    for (let i = 0; i < num; i++) {
        var tmp = i + 1;
        let d = document.createElement("div");
        d.id = "calendarday_" + i;
        d.className = "day";
        d.innerHTML = tmp;
        d.onclick = function () {
            if (d.hasAttribute("selected")) {      
                d.removeAttribute("selected");
                this.style.backgroundColor = "white";
                this.style.color = "black";
            } else {
                const elementList = document.querySelectorAll('[selected=""]');
                elementList.forEach(function(element) { 
                    element.removeAttribute("selected");
                    element.style.backgroundColor = "white";
                    element.style.color = "black";
                })
                d.setAttribute("selected", "");
                this.style.backgroundColor = "#1caff6";
                this.style.color = "white";
            }
        };

        document.getElementById("calendarDays").appendChild(d);
    }

    var clear = document.createElement("div");
    clear.className = "clear";
    document.getElementById("calendarDays").appendChild(clear);
}

function daysInMonth(month, year)
{
    var d = new Date(year, month+1, 0);
    return d.getDate();
}

function monthClicked() {
    var x = document.getElementById("months");
    if (x.style.display === "block") {
        x.style.display = "none";
      } else {
        x.style.display = "block";
      }
}

function yearClicked() {
    var x = document.getElementById("years");
    if (x.style.display === "block") {
        x.style.display = "none";
      } else {
        x.style.display = "block";
      }
}

window.addEventListener('load', function () {
    var date = new Date();
    month = date.getMonth();
    year = date.getFullYear();
    document.getElementById("curMonth").innerHTML = months[month];
    document.getElementById("curYear").innerHTML = year;
    loadCalendarMonths();
    loadCalendarYears();
    loadCalendarDays();
});

const Calendar = () => {
    return (
        <div>
            <div className="calendar-section">
                <header className='subtitle-header'>Calendar</header>
                <div className='subtitle-content'>
                    <div className="calendar" id="calendar">
                        <div className="calendar-btn month-btn" onClick={monthClicked}>
                            <span id="curMonth"></span>
                            <div id="months" className="months dropdown"></div>
                        </div>
                            
                        <div className="calendar-btn year-btn" onClick={yearClicked}>
                            <span id="curYear"></span>
                            <div id="years" className="years dropdown"></div>
                        </div>
                            
                        <div className="clear"></div>
                            
                        <div className="calendar-dates">
                            <div className="days">
                                <div className="day label">SUN</div>
                                <div className="day label">MON</div>
                                <div className="day label">TUE</div>
                                <div className="day label">WED</div>
                                <div className="day label">THU</div>
                                <div className="day label">FRI</div>
                                <div className="day label">SAT</div>
                                <div className="clear"></div>
                            </div>
                            <div id="calendarDays" className="days">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Calendar

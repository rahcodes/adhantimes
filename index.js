const corsDep = "https://api.allorigins.win/get?url=";
const url = "http://www.mara.gov.om/arabic/calendar_page1.asp";
const xurl = corsDep + encodeURIComponent(url);

const parser = new DOMParser();

window.onload = async () => {
    const main = document.getElementsByClassName("main")[0];
    const loaderCon = document.getElementsByClassName("loader-container")[0];
    
    let data;
    try {
        data = await fetch(xurl);
    }
    catch (e) {
        loaderCon.innerHTML = "ERROR: CORS failed.";
        return;
    }

    if (!data.ok) {
        loaderCon.innerHTML = "ERROR: CORS failed.";
        return;
    }

    const text = await data.text();

    const dom = parser.parseFromString(text, "text/html");

    try {
        const dates = dom.getElementsByClassName("botton_datecol")[0].innerText.trim().split(" CE ");
        document.getElementById("normalDate").innerText = dates[0] + " CE";
        document.getElementById("hijriDate").innerText = dates[1];
    }
    catch (e) {
        loaderCon.innerHTML = "ERROR: Date parsing failed.";
        return;
    }

    let times_r;
    let times = [];
    try {
        times_r = dom.getElementsByClassName("table-responsive table_area")[0].getElementsByTagName("td");
    }
    catch (e) {
        loaderCon.innerHTML = "ERROR: Time parsing failed.";
        return;
    }

    for (t of times_r) {
        times.push(t.innerText);
    }

    for (let i = 1; i <= 6; i++) {
        if (i == 1 || i == 2) {
            document.getElementById("t" + i).innerText = times[i] + " AM";
        }
        else if (i == 3) {
            if (times[i].startsWith("12")) {
                document.getElementById("t" + i).innerText = times[i] + " PM";
            }
            else {
                document.getElementById("t" + i).innerText = times[i] + " AM";
            }
        }
        else {
            document.getElementById("t" + i).innerText = times[i] + " PM";
        }
    }


    loaderCon.classList.add("hidden");
    main.classList.remove("hidden");
}

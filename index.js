var cors = "https://cors-anywhere.herokuapp.com/";
var url = "http://www.mara.gov.om/arabic/calendar_page1.asp";
var xurl = cors + url;

var tregex = /<td>.+<\/td><td>.+<\/td><td>.+<\/td><td>.+<\/td><td>.+<\/td><td>.+<\/td><td>.+<\/td>/;
var dregex = /<div\sclass="botton_datecol">\s+.+\s+<\/div>/;

function onUrlLoad(response)
{
    let times = response.match(tregex);
    times = times.toString();
    times = times.replace(/<td>/gi, "");
    times = times.split("</td>");

    let dates = response.match(dregex);
    dates = dates.toString();
    dates = dates.replace(/<div\sclass="botton_datecol">\s+/, "");
    dates = dates.replace(/\s+&nbsp;&nbsp;\s+<\/div>/, "");
    dates = dates.split(" | ");

    $("#hijriDate").text(dates[1]);
    $("#normalDate").text(dates[0]);

    for (let i = 1; i <= 6; i++)
    {
        if (i == 1 || i == 2)
        {
            $("#t" + i).text(times[i] + " AM");
        }
        else if (i == 3)
        {
            if (times[i].startsWith("12"))
            {
                $("#t" + i).text(times[i] + " PM");
            }
            else
            {
                $("#t" + i).text(times[i] + " AM");
            }
        }
        else
        {
            $("#t" + i).text(times[i] + " PM");
        }
    }

    $("#load").css("display", "none");
    $("#main").css("display", "");
}

$.get(xurl, onUrlLoad);

/**
 * Bitcoin Price Speculatory Widget v2.0.0
 * Created by shsieh on 7/21/2015.
 */

var average = 0, sum = 0;
var dataPoint = [265,268,270,268,284,292,310];
var smallest = 10000, smallestPosition = 0, largest = 0, largestPosition = 0;
//var date = new Date();
//var minutes = date.getMinutes();
var differenceSmall1, differenceLarge1, differenceSmall2, differenceLarge2;
var slopeSmall = 0, slopeLarge = 0;
var num1 = 0, num2 = 0, w = 0, m = 0;
var peaks = 0, bottoms = 0;
var firstSlope = 0, nextSlope = 0, numChanges = 0;
var support, resistance;
var i = 0;

function bitcoinFunction() {


    document.write("Welcome to Sam Hsieh's Bitcoin Price Speculatory Widget v2.1.0!" + "<br>");
    document.write("This widget is intended to estimate the future price of bitcoin (short-term) based on previous performance (in days)." + "<br>");

    /*
    var userInput = prompt("For the best results, would you like to enter the price of bitcoin from the past 7 days?");
    if (userInput === "yes" || userInput === "Yes") {
        alert("Great! Please enter values as integers.");
        dataPoint[0] = prompt("Please enter the value of bitcoin from 6 days ago");
        dataPoint[1] = prompt("Please enter the value of bitcoin from 5 days ago");
        dataPoint[2] = prompt("Please enter the value of bitcoin from 4 days ago");
        dataPoint[3] = prompt("Please enter the value of bitcoin from 3 days ago");
        dataPoint[4] = prompt("Please enter the value of bitcoin from 2 days ago");
        dataPoint[5] = prompt("Please enter the value of bitcoin from yesterday");
        dataPoint[6] = prompt("Please enter the value of bitcoin from today");
    }
    else
        alert("Application started using previously entered values from July 23rd, 2015 to July 30th, 2015");
   */

    alert("Application started using previously entered values from July 5th, 2015 to July 12th, 2015");



//finds the high, low, and at what time they occur during the 24 hour period (without using Math)

    for (i = 0; i < dataPoint.length; i++) {
        if (i === dataPoint.length - 1)
            if (dataPoint[dataPoint.length - 1] < smallest) {
                smallest = dataPoint[i];
                smallestPosition = i;
            }
            else if (dataPoint[dataPoint.length - 1] > largest) {
                largest = dataPoint[i];
                largestPosition = i;
            }
        if (dataPoint[i] < dataPoint[i + 1] && dataPoint[i] < smallest) {
            smallest = dataPoint[i];
            smallestPosition = i;
        }
        if (dataPoint[i] > dataPoint[i + 1] && dataPoint[i] > largest) {
            largest = dataPoint[i];
            largestPosition = i;
        }
        sum += dataPoint[i];
    }
    average = Math.round(sum / dataPoint.length);

//display the results from above for loop first

    document.write("The high is: " + largest + " While the low is: " + smallest + " ");
    document.write("The high is at day: " + largestPosition + " While the low is at day: " + smallestPosition + "<br>");
    document.write("The average price of bitcoin this week is: " + average + "<br>" + "<br>");

//algorithm that finds slope to the closest point (high and low) NOTE: Encorporate trendlines into this?

    if (smallestPosition === 0)
        slopeSmall = (dataPoint[smallestPosition + 1] - dataPoint[smallestPosition]) / ((smallestPosition + 1) - (smallestPosition));
    else if (smallestPosition === dataPoint.length - 1)
        slopeSmall = (dataPoint[smallestPosition - 1] - dataPoint[smallestPosition]) / ((smallestPosition - 1) - (smallestPosition));
    else {
        differenceSmall1 = Math.abs(dataPoint[smallestPosition] - dataPoint[smallestPosition + 1]);
        differenceSmall2 = Math.abs(dataPoint[smallestPosition] - dataPoint[smallestPosition - 1]);

        if (differenceSmall1 < differenceSmall2)
            slopeSmall = (dataPoint[smallestPosition + 1] - dataPoint[smallestPosition]) / ((smallestPosition + 1) - (smallestPosition));
        else
            slopeSmall = (dataPoint[smallestPosition - 1] - dataPoint[smallestPosition]) / ((smallestPosition - 1) - (smallestPosition));
    }

    if (largestPosition === 0)
        slopeLarge = (dataPoint[largestPosition + 1] - dataPoint[largestPosition]) / ((largestPosition + 1) - (largestPosition));
    else if (largestPosition === dataPoint.length - 1)
        slopeLarge = (dataPoint[largestPosition - 1] - dataPoint[largestPosition]) / ((largestPosition - 1) - (largestPosition));
    else {
        differenceLarge1 = Math.abs(dataPoint[largestPosition] - dataPoint[largestPosition + 1]);
        differenceLarge2 = Math.abs(dataPoint[largestPosition] - dataPoint[largestPosition - 1]);

        if (differenceLarge1 < differenceLarge2)
            slopeLarge = (dataPoint[largestPosition + 1] - dataPoint[largestPosition]) / ((largestPosition + 1) - (largestPosition));
        else
            slopeLarge = (dataPoint[largestPosition - 1] - dataPoint[largestPosition]) / ((largestPosition - 1) - (largestPosition));
    }


//algorithm that finds when the slope changes from + to - then - to + (or vice versa)

    for (i = 0; i < dataPoint.length; i++) {
        if (i === dataPoint.length - 2)
            break;
        firstSlope = (dataPoint[i + 1] - dataPoint[i]);
        nextSlope = (dataPoint[i + 2] - dataPoint[i + 1]);
        if (firstSlope > 0 && nextSlope < 0 || firstSlope < 0 && nextSlope > 0)
            numChanges++;
        if (numChanges != 0 && numChanges % 3 === 0)
            document.write("There is probably a W or M! This is usually a strong indication of a support or resistance level!" + "<br>");
    }

//algorithm that finds any M's

    for (i = 0; i < dataPoint.length; i++) {
        if (Math.abs(dataPoint[i] - largest) <= 1)
            if (i != largestPosition && num2 === 0) {
                document.write("There's a M at day: " + i + " and " + largestPosition + ". " + "<br>");
                num2++;
                m = i;
                peaks++;
                resistance = dataPoint[i];
            }
            else if (num2 === 1 && i != largestPosition) {
                document.write("There's a triple peak at day: " + i + " and " + largestPosition + " and " + m + "<br>");
                num2++;
                peaks++;
                resistance = dataPoint[i];
            }
            else if (num2 === 2 && i != largestPosition) {
                document.write("Also, there's another triple peak at day: " + i + " and " + largestPosition + " and " + m + "<br>");
                peaks++;
                resistance = dataPoint[i];
            }
    }


//algorithm that finds any W's

    for (i = 0; i < dataPoint.length; i++) {
        if (Math.abs(dataPoint[i] - smallest) <= 1)
            if (i != smallestPosition && num1 === 0) {
                document.write("There's a W at day: " + i + " and " + smallestPosition + ". " + "<br>");
                num1++;
                w = i;
                bottoms++;
                support = dataPoint[i];
            }
            else if (num1 === 1 && i != smallestPosition) {
                document.write("There's a triple bottom at day: " + i + " and " + smallestPosition + " and " + w + "<br>");
                num1++;
                bottoms++;
                support = dataPoint[i];
            }
            else if (num1 === 2 && i != smallestPosition) {
                document.write("Also, there's another triple bottom at day: " + i + " and " + smallestPosition + " and " + w + "<br>");
                bottoms++;
                support = dataPoint[i];
            }
    }

    if (bottoms > 0)
        document.write("There's a support (BUY) at price: " + support + "<br>");
    if (peaks > 0)
        document.write("There's a resistance (SELL) at price: " + resistance + "<br>");

//algorithm that find trend lines
    var slopes = [0,0,0,0,0,0], negatives = 0, positives = 0;

    slopes[0] = dataPoint[1] - dataPoint[0];
    slopes[1] = dataPoint[2] - dataPoint[1];
    slopes[2] = dataPoint[3] - dataPoint[2];
    slopes[3] = dataPoint[4] - dataPoint[3];
    slopes[4] = dataPoint[5] - dataPoint[4];
    slopes[5] = dataPoint[6] - dataPoint[5];

    document.write("The slopes between the prices are: ");

    for (i = 0; i <= 5; i++) {
        if (i != 5)
            document.write(slopes[i] + ", ");
        else
            document.write(slopes[i] + " ");
        if (slopes[i] < 0)
            negatives++;
        else if (slopes[i] > 0)
            positives++;
    }

    document.write("<br>");


    if (negatives > positives)
         document.write("Overall, it looks like bitcoin is on a downtrend." + "<br>");
    else if (positives > negatives)
         document.write("Overall, it looks like bitcoin is on a uptrend." + "<br>");
    else if (positives === negatives)
         document.write("Overall, it looks like bitcoin is going sideways." + "<br>");

//output

    document.write("<br>");
    document.write("The slope between the low and its closest point is: " + slopeSmall + "<br>");
    document.write("The slope between the high and its closest point is: " + slopeLarge + "<br>");

//algorithm that displays explicit investing advice

    if (Math.abs(slopeSmall) > Math.abs(slopeLarge)) {
        if ((slopeSmall > 0 && (Math.abs(dataPoint[smallest + 1] - smallest) >= 5) || (slopeSmall > 0 && smallestPosition === 0)))
            document.write("Looks like bitcoin is going UP! Better SELL soon!" + "<br>");
        else if ((slopeSmall < 0 && (Math.abs(dataPoint[smallest - 1] - smallest) >= 5) || (slopeSmall < 0 && smallestPosition === dataPoint.length - 1)))
            document.write("Looks like bitcoin is going DOWN! Get ready to BUY!" + "<br>");
    }
    else if (Math.abs(slopeSmall) < Math.abs(slopeLarge)) {
        if ((slopeLarge > 0 && (Math.abs(dataPoint[largest - 1] - largest) >= 5) || (slopeLarge > 0 && largestPosition === dataPoint.length - 1)))
            document.write("Looks like bitcoin is going UP! Better SELL soon!" + "<br>");
        else if ((slopeLarge < 0 && (Math.abs(largest - dataPoint[largest + 1]) >= 5) || (slopeLarge < 0 && largestPosition === 0)))
            document.write("Looks like bitcoin is going DOWN! Get ready to BUY!" + "<br>");
    }
    else
        document.write("High and low slopes are neutral. Please refer to the information above for investing advice." + "<br>");

    document.write("<br>");
    document.write("To go back to the web application, please refresh the webpage. Thanks for visiting!");
}

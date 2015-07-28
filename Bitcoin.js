/**
 * Bitcoin Price Speculatory Widget v1.7.0
 * Created by shsieh on 7/21/2015.
 */

var count = 0, average = 0, sum = 0;
var dataPoint = [279,279,276,275,279,285,295];
var smallest = 10000, smallestPosition = 0, largest = 0, largestPosition = 0;
var date = new Date();
var minutes = date.getMinutes();
var differenceSmall1, differenceLarge1, differenceSmall2, differenceLarge2;
var slopeSmall = 0, slopeLarge = 0;
var num1 = 0, num2 = 0, w = 0, m = 0;
var peaks = 0, bottoms = 0;
var firstSlope = 0, nextSlope = 0, numChanges = 0;



function bitcoinFunction() {



//assigns the live bitcoin price to each position in the array... NOTE: look at api?
/*
    if(count < dataPoint.length) {
        dataPoint[count] = prompt("Please enter the value of bitcoin for each hour in the past day");
        count++;
    }
*/

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
    average = sum / dataPoint.length;

//display the results from above for loop first
    document.write("The high is: " + largest + " While the low is: " + smallest + " ");
    document.write("The high is at day: " + largestPosition + " While the low is at day: " + smallestPosition + "<br>" + "<br>");

//algorithm that finds slope to the closest point (high and low)
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
        if(firstSlope > 0 && nextSlope < 0 || firstSlope < 0 && nextSlope > 0)
            numChanges++;
        if(numChanges != 0 && numChanges % 3 === 0)
            document.write("There's either a W or a M!");
    }

//algorithm that finds any M's
    for (i = 0; i < dataPoint.length; i++) {
        if (Math.abs(dataPoint[i] - largest) <= 1)
            if (dataPoint[i] > average && i != largestPosition && num2 === 0) {
                document.write("There's a M at day: " + i + " and " + largestPosition + ". " + "<br>");
                num2++;
                m = i;
                peaks++;
            }
            else if (num2 === 1 && i != largestPosition) {
                document.write("There's a triple peak at day: " + i + " and " + largestPosition + " and " + m + "<br>");
                num2++;
                peaks++;
            }
            else if (num2 === 2 && i != largestPosition) {
                document.write("Also, there's another triple peak at day: " + i + " and " + largestPosition + " and " + m + "<br>");
                peaks++;
            }
    }


//algorithm that finds any W's
    for (i = 0; i < dataPoint.length; i++) {
        if (Math.abs(dataPoint[i] - smallest) <= 1)
            if (dataPoint[i] < average && i != smallestPosition && num1 === 0) {
                document.write("There's a W at day: " + i + " and " + smallestPosition + ". " + "<br>");
                num1++;
                w = i;
                bottoms++;
            }
            else if (num1 === 1 && i != smallestPosition) {
                document.write("There's a triple bottom at day: " + i + " and " + smallestPosition + " and " + w + "<br>");
                num1++;
                bottoms++;
            }
            else if (num1 === 2 && i != smallestPosition) {
                document.write("Also, there's another triple bottom at day: " + i + " and " + smallestPosition + " and " + w + "<br>");
                bottoms++;
            }
    }

    if(bottoms < peaks)
        document.write("Bitcoin is going to go DOWN, get ready to BUY!" + "<br>");
    else if(peaks < bottoms)
        document.write("Bitcoin is going to go UP, get ready to SELL!" + "<br>");
    else
        document.write("The amount of peaks and bottoms are equal. Stay to the sidelines." + "<br>");

//output
    document.write("<br>");
    document.write("The slope between the low and its closest point is: " + slopeSmall + "<br>");
    document.write("The slope between the high and its closest point is: " + slopeLarge + "<br>");
    document.write("The average price of bitcoin today is: " + average + "<br>");

//algorithm that displays explicit investing advice

    if(Math.abs(slopeSmall) > Math.abs(slopeLarge)) {
        if ((slopeSmall > 0 && (Math.abs(dataPoint[smallest + 1] - smallest) >= 5) || (slopeSmall > 0 && smallestPosition === 0)))
            document.write("Looks like bitcoin is going UP! Better SELL soon!" + "<br>");
        else if ((slopeSmall < 0 && (Math.abs(dataPoint[smallest - 1] - smallest) >= 5) || (slopeSmall < 0 && smallestPosition === dataPoint.length - 1)))
            document.write("Looks like bitcoin is going DOWN! Get ready to BUY!" + "<br>");
    }
    else if(Math.abs(slopeSmall) < Math.abs(slopeLarge)) {
        if ((slopeLarge > 0 && (Math.abs(dataPoint[largest - 1] - largest) >= 5) || (slopeLarge > 0 && largestPosition === dataPoint.length - 1)))
            document.write("Looks like bitcoin is going UP! Better SELL soon!" + "<br>");
        else if ((slopeLarge < 0 && (Math.abs(largest - dataPoint[largest + 1]) >= 5) || (slopeLarge < 0 && largestPosition === 0)))
            document.write("Looks like bitcoin is going DOWN! Get ready to BUY!" + "<br>");
    }
}

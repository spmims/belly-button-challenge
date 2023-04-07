// Get the sample data endpoint
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);
  });


function init() {
  // Grab a reference to the dropdown select element
  let dropdown = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
  ).then((data) => {
    let sampleNames = data.names;

    //add all of the sample names to the drop down list
    for (let i = 0; i < sampleNames.length; i++) {
      dropdown
        .append("option")
        .text(sampleNames[i])
        .property("value", sampleNames[i]);
    }

    // Use the first sample from the list to build the initial plots
    let sampleOne = sampleNames[0];

    // Save value from sampleOne
    console.log(sampleOne)
    // buildCharts(firstSample);
    // buildMetadata(firstSample);
  });
}
init();

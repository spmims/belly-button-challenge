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

    // Build initial plots
    buildMetadata(sampleOne);
    buildBarChart(sampleOne);
    buildBubbleChart(sampleOne);
    //buildGaugeChart(sampleOne);
  });
};

// Population of Metadata
function buildMetadata(sample) {

    // Use D3 to get all data
    d3.json(url).then((data) => {

        // Retrieve Metadata
        let Metadata = data.metadata;

        // Filter
        let values = Metadata.filter(result => result.id == sample);

        // Save array after filtering
        console.log(values)

        // Get first index
        let valueData = values[0];

        // Clear Metadata
        d3.select("#sample-metadata").html("");

        // Use Object.entries to add each key value pair
        Object.entries(valueData).forEach(([key, values]) => {
            console.log(key, values);
            d3.select("#sample-metadata").append("h5").text(`${key}: ${values}`);
        });
    });

};

// Bar Chart function
function buildBarChart(sample) {

    // Use D3 to get all data
    d3.json(url).then((data) => {
        
        // Get sample size
        let sampleInfo = data.samples;

        // Filter on value
        let values = sampleInfo.filter(result => result.id == sample);

        // Get first index
        let valueData = values[0];

        // Get the otuIds, otuLables, and sampleValues
        let otuIds = valueData.otu_ids;
        let otuLabels = valueData.otu_labels;
        let sampleValues = valueData.sample_values;

        // Save data to console
        console.log(otuIds, otuLabels, sampleValues);

        // Display top 10
        let yticks = otuIds.slice(0, 10).map(id => `OTU ${id}`).reverse();
        let xticks = sampleValues.slice(0, 10).reverse();
        let labels = otuLabels.slice(0, 10).reverse();

        // Create Trace
        let trace = {
            x: xticks,
            y: yticks,
            text: labels,
            type: "bar",
            orientation: "h"
        };

        // Layout set up
        let layout = {
            title: "Top 10 OTUs Present"
        };

        // Call Plotly
        Plotly.newPlot("bar", [trace], layout)

    });
};

//Bubble Chart section
function buildBubbleChart(sample) {
    d3.json(url).then((data) => {
        
        // Get sample size
        let sampleInfo = data.samples;

        // Filter on value
        let values = sampleInfo.filter(result => result.id == sample);

        // Get first index
        let valueData = values[0];

        // Get the otuIds, otuLables, and sampleValues
        let otuIds = valueData.otu_ids;
        let otuLabels = valueData.otu_labels;
        let sampleValues = valueData.sample_values;

        // Save data to console
        console.log(otuIds, otuLabels, sampleValues);

        // Create Trace2
        let trace2 = {
            x: otuIds,
            y: sampleValues,
            text: otuLabels,
            mode: "markers",
            marker: {
                size: sampleValues,
                color: otuIds,
                colorscale: "Earth"
            }
        };

        // Layout set up
        let layout = {
            title: "Bacteria Per Sample",
            color: "closest",
            xaxis: {title: "OTU ID"},
        };

        // Call Plotly
        Plotly.newPlot("bubble", [trace2], layout);

    });
};

// Dashboard update feature
function optionChanged(values) {

    // save new value
    console.log(values);

    // Call functions
    buildMetadata(values);
    buildBarChart(values);
    buildBubbleChart(values);
    buildGaugeChart(values);
};

init();

function BuildData(sample){
    d3.json("samples.json").then((data) => {
    console.log(data);
    var metadata = data.metadata;
    console.log("metadata", metadata);
    var Array = metadata.filter(sampleobj => sampleobj.id == sample);
    console.log("Array", Array);
    var response = Array[0];
    console.log("response", response);

    var sample_values = response.sample_values;
    var otu_ids = response.otu_ids;
    console.log("otu_ids", otu_ids);
    var otu_labels = response.otu_labels;
    var Board = d3.select("#sample-metadata");
    Board.html("");
    Object.entries(response).forEach(([key,value]) => {
    Board.append("h4").text(`${key}: ${value}`);
    });


    });
 }

function BuildCharts(sample){

    d3.json("samples.json").then((data) => {
    var metadata = data.samples;
    var Array = metadata.filter(sampleobj => sampleobj.id == sample);
    var response = Array[0];
    var sample_values = response.sample_values;
    var otu_ids = response.otu_ids;
    var otu_labels = response.otu_labels;

    var layout = {
        title: "Top 10 Bacteria Cultures Found",
        margin:{t:0},
        hovermode:"closest",
        xaxis:{title:"otu_id"},
        margin:{t:30}
    };
    var circledata = [{
        x:otu_ids,
        y:sample_values,
        text:otu_labels,
        mode:"markers",
        marker:{
            sample:sample_values,
            color:otu_ids,
            colorscale:"Earth"
        }

    }

    ];
    Plotly.newPlot("bubble",circledata,layout);

    var yticks = otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();
    var graphdata = [{
        y:yticks,
        x:sample_values.slice(0,10).reverse(),
        text:otu_labels.slice(0,10).reverse(),
        type:"bar",
        orientation:"h",
        
    }];
    var barlayout = {
        title:"Bacteria",
        margin:{t:30,l:150},
    
    };
    Plotly.newPlot("bar",graphdata,graphlayout);
    });
}

function init(){
    var selection = d3.select("#selDataset");
    d3.json("samples.json").then((data) => {
        var sam_names = data.names;
        sam_names.forEach((sample) => {
            selection
                .append("option")
                .text(sample)
                .property("value",sample);
            
        });
        var initialsample = sam_names[0];
        BuildData(initialsample);
        BuildCharts(initialsample);

    });

}

function optionChanged(newsample){
    BuildData(newsample);
    BuildCharts(newsample);
}

init();

// function buildMetadata(sample) {
//     d3.json("samples.json").then((data) => {
//       var metadata = data.metadata;
//       // Filter the data for the object with the desired sample number
//       var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
//       var result = resultArray[0];
//       // Use d3 to select the panel with id of `#sample-metadata`
//       var PANEL = d3.select("#sample-metadata");
//       // Use `.html("") to clear any existing metadata
//       PANEL.html("");
//       // Use `Object.entries` to add each key and value pair to the panel
//       // Hint: Inside the loop, you will need to use d3 to append new
//       // tags for each key-value in the metadata.
//       Object.entries(result).forEach(([key, value]) => {
//         PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
//       });
//       // BONUS: Build the Gauge Chart
//       buildGauge(result.wfreq);
//     });
//   }
//   function buildCharts(sample) {
//     d3.json("samples.json").then((data) => {
//       var samples = data.samples;
//       var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
//       var result = resultArray[0];
//       var otu_ids = result.otu_ids;
//       var otu_labels = result.otu_labels;
//       var sample_values = result.sample_values;
//       // Build a Bubble Chart
//       var bubbleLayout = {
//         title: "Bacteria Cultures Per Sample",
//         margin: { t: 0 },
//         hovermode: "closest",
//         xaxis: { title: "OTU ID" },
//         margin: { t: 30}
//       };
//       var bubbleData = [
//         {
//           x: otu_ids,
//           y: sample_values,
//           text: otu_labels,
//           mode: "markers",
//           marker: {
//             size: sample_values,
//             color: otu_ids,
//             colorscale: "Earth"
//           }
//         }
//       ];
//       Plotly.newPlot("bubble", bubbleData, bubbleLayout);
//       var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
//       var barData = [
//         {
//           y: yticks,
//           x: sample_values.slice(0, 10).reverse(),
//           text: otu_labels.slice(0, 10).reverse(),
//           type: "bar",
//           orientation: "h",
//         }
//       ];
//       var barLayout = {
//         title: "Top 10 Bacteria Cultures Found",
//         margin: { t: 30, l: 150 }
//       };
//       Plotly.newPlot("bar", barData, barLayout);
//     });
//   }
//   function init() {
//     // Grab a reference to the dropdown select element
//     var selector = d3.select("#selDataset");
//     // Use the list of sample names to populate the select options
//     d3.json("samples.json").then((data) => {
//       var sampleNames = data.names;
//       sampleNames.forEach((sample) => {
//         selector
//           .append("option")
//           .text(sample)
//           .property("value", sample);
//       });
//       // Use the first sample from the list to build the initial plots
//       var firstSample = sampleNames[0];
//       buildCharts(firstSample);
//       buildMetadata(firstSample);
//     });
//   }
//   function optionChanged(newSample) {
//     // Fetch new data each time a new sample is selected
//     buildCharts(newSample);
//     buildMetadata(newSample);
//   }
//   // Initialize the dashboard
//   init();
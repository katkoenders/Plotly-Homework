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
            size:sample_values,
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
    Plotly.newPlot("bar",graphdata,barlayout);
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


# Plot.ly Homework - Belly Button Biodiversity

# Introduction
Analyzing data of microbial species. Vizualizations displayed OTU's (operational taxonomic units) for each individual. Demographic information of each individual was also given. 

# Process
1. The samples.json was read using the D3 library. 
2. A horizontal bar chart with a dropdown menu was created so that the top ten OTU's in that particular individual was displayed. The variable name sample_values was used for the values on the bar chart. The variable name otu_ids was used for the labels. Also the variable name otu_labels was used for for the hovertext. 
3. The bubble chart that shows each sample was created. The variable name otu_ids was used for the x values and the variable name sample_values was used for values. The variable name sample_values was used for the marker size and the variable name otu_ids was used for the marker colors. Lastly the variable name otu_labels was used for the text values.
4. The sample metadata was created and displayed. 
5. Each key-value pair from the metadata JSON object was created and displayed on the page. 
6. The code was also written so that every time a new sample was selected the plots would all be updated. 

# Technology Used
* Javascript
* HTML

# Conclusion
When the code is running a website is able to come up with the data displayed. The data is displayed using a horizontal bar chart, a bubble chart, and sample metadata. The website is able to update when a new sample was selected. 

![image](https://user-images.githubusercontent.com/57878641/87359212-fce01c00-c52c-11ea-9647-0650ababa5ba.png)


![image](https://user-images.githubusercontent.com/57878641/87359528-98718c80-c52d-11ea-9c8b-7aede2e6a051.png)

# Contributors
Katrina Koenders was the sole contributor for this project. 

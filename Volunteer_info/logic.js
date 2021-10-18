// Create arrays - Volunteers state wide and over 10 years : Data from:
// https://www.statista.com/statistics/1092454/australia-volunteers-of-fire-service-organizations/
var state_info_2020 = [{
    state: "WA",
    vol_ff: "11810",
    support_staff: "2398"
},
{
    state: "VIC",
    vol_ff: "32679",
    support_staff: "22030" 
},
{
    state: "NSW",
    vol_ff: "73272",
    support_staff: "8315"
},
{
    state: "QLD",
    vol_ff: "12650",
    support_staff: "18454" 
},
{
    state: "SA",
    vol_ff: "10505",
    support_staff: "2947"
},
{
    state: "NT",
    vol_ff: "268",
    support_staff: "0" 
},
{
    state: "ACT",
    vol_ff: "1234",
    support_staff: "0" 
},
{
    state: "TAS",
    vol_ff: "4164",
    support_staff: "936"
}];

// Create arrays based solely on 2019 - 2020 Bushfire Season : Data from:
// https://www.aph.gov.au/About_Parliament/Parliamentary_Departments/Parliamentary_Library/pubs/rp/rp1920/Quick_Guides/AustralianBushfires

var countries = ["Canada", "New Zealand", "United Arab Emirates", "Denamrk", 
                "Palau", "United Kingdom", "Fiji", "Papua New Guinea", 
                "United States", "France", "Samoa", "Tuvalu", "Indonesia", 
                "Saudi Arabia", "Vanuatu", "Japan", "Singapore", "South Africa", 
                "Malaysia", "Solomon Islands", "Nauru", "South Korea"];


// Tabs
function openFire(evt, fireName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(fireName).style.display = "block";
    evt.currentTarget.className += " active";
  }
//   End Tabs
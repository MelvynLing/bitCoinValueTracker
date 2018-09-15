// Get references to page elements
var $initialAmount = $("#initialAmount");
var $entryDate = $("#entryDate");
var $exitDate = $("#exitDate");
var $bookValue = $initialAmount;
var $netAmount = "test";
var $gainLoss = "test";
var $submitBtn = $("#submit");
var $investorTableBody = $("#investor-table-body");
var $deleteButton = $(".deleteButton");

// The API object contains methods for each kind of request we'll make
var API = {
  saveInvestor: function(investor) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/investors",
      data: JSON.stringify(investor)
    });
  },
  getInvestors: function() {
    return $.ajax({
      url: "api/investors",
      type: "GET"
    });
  },
  deleteInvestor: function(id) {
    return $.ajax({
      url: "api/investors/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshInvestors = function() {
  API.getInvestors().then(function(data) {
    var $investors = data.map(function(investor) {
      //  alert(investor.id);
      //  testAppend = "<td>test123</td>";

      trAppend =
        "<tr><td>" +
        investor.initialAmount +
        "</td><td>" +
        investor.entryDate +
        "</td><td>" +
        investor.exitDate +
        "</td><td>" +
        investor.bookValue +
        "</td><td>" +
        investor.netAmount +
        "</td><td>" +
        investor.gainLoss +
        "</td></tr>";

      /*  var $a = $("<a>")
        .text(investor.id)
        .attr("href", "/investor/" + investor.id);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $tr.append($button);
  */
      //console.log(investor.initialAmount);
      //var dumb = "" + investor.initialAmount;
      //console.log(dumb);

      return trAppend;
    });
    $investorTableBody.empty();
    $investorTableBody.append($investors);
  });
};

//console.log(investor.initialAmount);
//console.log(initialAmount);

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var investor = {
    initialAmount: $initialAmount.val().trim(),
    entryDate: $entryDate.val().trim(),
    exitDate: $exitDate.val().trim(),
    bookValue: $bookValue.val().trim(),
    netAmount: $netAmount,
    gainLoss: $gainLoss
  };

  API.saveInvestor(investor).then(function() {
    refreshInvestors();
  });

  $initialAmount.val("");
  $entryDate.val("");
  $exitDate.val("");

  $.getJSON(
    "https://api.coindesk.com/v1/bpi/historical/close.json?start=" +
      investor.entryDate +
      "&end=" +
      investor.exitDate +
      "&currency=CAD",
    function(data) {
      var dateArray = data.bpi;
      //console.log(data.bpi);
      console.log(dateArray);
      //console.log(investor.entryDate);
      //console.log(investor.exitDate);
      var rateStateDate = dateArray[investor.entryDate];
      //console.log(data.bpi[entryDate]);
      console.log(rateStateDate);
      var rateEndDate = dateArray[investor.exitDate];
      //console.log(data.bpi[exitDate]);
      console.log(rateEndDate);
      var startDateAmount = investor.initialAmount / rateStateDate;
      console.log(startDateAmount);
      var endDateAmount = investor.initialAmount / rateEndDate;
      console.log(endDateAmount);
      var netLossProfit = startDateAmount - endDateAmount;
      console.log(netLossProfit);
      var cadNetLossProfit = netLossProfit * endDateAmount;
      console.log(cadNetLossProfit);
      var finalamount = cadNetLossProfit * rateEndDate;
      console.log(finalamount);
    }
  );

  //console.log(investor.initialAmount);
  //var dumb = "" + investor.initialAmount;
  //console.log(dumb);

  //console.log($initialAmount);
  //console.log($entryDate);
  //console.log($exitDate);
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this).attr("data-id");

  API.deleteInvestor(idToDelete).then(function() {
    refreshInvestors();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$deleteButton.on("click", handleDeleteBtnClick);

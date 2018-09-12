// Get references to page elements
var $initialAmount = $("#initialAmount");
var $entryDate = $("#entryDate");
var $exitDate = $("#exitDate");
var $bookValue = $initialAmount;
var $netAmount = "test";
var $gainLoss = "test";
var $submitBtn = $("#submit");
var $investorTable = $("#investor-table");
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
      var $a = $("<a>")
        .text(investor.id)
        .attr("href", "/investor/" + investor.id);

      var $tr = $("<tr>")
        .attr({
          class: "table-info-row",
          "data-id": investor.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $tr.append($button);

      return $tr;
    });

    $investorTable.empty();
    $investorTable.append($investors);
  });
};

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
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this).attr("data-id");

  API.deleteInvestor(idToDelete);
  
  
  //.then(function() {
    //refreshInvestors();
 // });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$deleteButton.on("click", handleDeleteBtnClick);

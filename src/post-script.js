// import { $, jQuery } from "jquery";
let markdownFile, authCode, userId, errorDiv;

document.getElementById("mdfile").onchange = function(evt) {
  if (!window.FileReader) return; // Browser is not compatible

  var reader = new FileReader();

  reader.onload = function(evt) {
    if (evt.target.readyState != 2) return;
    if (evt.target.error) {
      alert("Error while reading file");
      return;
    }

    filecontent = evt.target.result;

    document.getElementById("rawmd").value = evt.target.result;

    document.getElementById("postpreview").innerHTML = marked(
      evt.target.result
    );
  };

  reader.readAsText(evt.target.files[0]);
};

document.getElementById("rawmd").onchange = function(evt) {
  document.getElementById("postpreview").innerHTML = marked(
    document.getElementById("rawmd").value
  );
};

$("#getIdButton").click(function() {
  authCode = document.getElementById("authcode").value;
  $.ajax({
    type: "GET",
    url: "https://cors-anywhere.herokuapp.com/https://api.medium.com/v1/me",
    headers: {
      Authorization: "Bearer " + authCode,
      contentType: "application/json;charset=utf-8",
      Accept: "application / json",
      acceptCharset: "utf-8"
    },
    success: function(response) {
      console.log(response);
      userId = response.data.id;
      errorDiv = document.getElementById("error-message");
      errorDiv.innerHTML = "Ready to go!";
    },
    error: function(xhr, status, error) {
      var err = eval("(" + xhr.responseText + ")");
      console.log(err);
      errorDiv = document.getElementById("error-message");
      errorDiv.innerHTML = err;
    }
  });
});

$("#submitPostOrgButton").click(function() {
  let postTitle = $("input[name=title]").val();
  let markdownFile = document.getElementById("rawmd").value;

  $.ajax({
    type: "POST",
    url: `https://cors-anywhere.herokuapp.com/https://api.medium.com/v1/publications/f70c19ed6433/posts`,
    headers: {
      Authorization: "Bearer " + authCode,
      contentType: "application/json;charset=utf-8",
      Accept: "application / json",
      acceptCharset: "utf-8"
    },
    data: {
      title: postTitle,
      contentFormat: "markdown",
      content: markdownFile,
      tags: ["development", "design"],
      publishStatus: "draft"
    },
    success: function(response) {
      console.log(response);
      errorDiv = document.getElementById("error-message");
      errorDiv.style.color = "#008800";
      errorDiv.innerHTML = "Success!";
    },
    error: function(xhr, status, error) {
      var err = eval("(" + xhr.responseText + ")");
      console.log(err);
      console.log(err);
      errorDiv = document.getElementById("error-message");
      errorDiv.innerHTML = err;
    }
  });
});

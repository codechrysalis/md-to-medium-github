// import { $, jQuery } from "jquery";
let markdownFile, authCode, userId;

let rawMarkdown = document.getElementById("rawmd");
let previewBox = document.getElementById("postpreview");
let errorDiv = document.getElementById("error-message");

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

    rawMarkdown.value = evt.target.result;

    previewBox.innerHTML = marked(evt.target.result);
  };

  reader.readAsText(evt.target.files[0]);
};

rawMarkdown.onchange = function(evt) {
  previewBox.innerHTML = marked(rawMarkdown.value);
};

$("#getIdButton").click(function() {
  errorDiv.innerHTML = "Loading...";
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
      errorDiv.innerHTML = "Ready to go!";
    },
    error: function(xhr, status, error) {
      var err = eval("(" + xhr.responseText + ")");
      console.log(err);
      errorDiv.innerHTML = err;
    }
  });
});

$("#submitPostOrgButton").click(function() {
  errorDiv.innerHTML = "Working...";
  let postTitle = $("input[name=title]").val();
  let markdownFile = rawMarkdown.value;

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
      errorDiv.style.color = "#008800";
      errorDiv.innerHTML = "Success!";
    },
    error: function(xhr, status, error) {
      var err = eval("(" + xhr.responseText + ")");
      console.log(err);
      console.log(err);
      errorDiv.innerHTML = err;
    }
  });
});

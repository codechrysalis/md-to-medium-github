// import { $, jQuery } from "jquery";
let markdownFile;
let authCode, userId;

document.forms["postform"].elements["mdfile"].onchange = function(evt) {
  if (!window.FileReader) return; // Browser is not compatible

  var reader = new FileReader();

  reader.onload = function(evt) {
    if (evt.target.readyState != 2) return;
    if (evt.target.error) {
      alert("Error while reading file");
      return;
    }

    filecontent = evt.target.result;

    document.forms["postform"].elements["rawmd"].value = evt.target.result;

    document.getElementById("postpreview").innerHTML = marked(
      evt.target.result
    );
  };

  reader.readAsText(evt.target.files[0]);
};

document.forms["postform"].elements["rawmd"].onchange = function(evt) {
  document.getElementById("postpreview").innerHTML =
    "Post Preview: \n" +
    marked(document.forms["postform"].elements["rawmd"].value);
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
      document.getElementById("userId").value = response.data.id;
    },
    error: function(xhr, status, error) {
      var err = eval("(" + xhr.responseText + ")");
      console.log(err);
    }
  });
});

$("#getOrgIdButton").click(function() {
  userId = document.getElementById("userId").value;
  authCode = document.getElementById("authcode").value;
  $.ajax({
    type: "GET",
    url: `https://cors-anywhere.herokuapp.com/https://api.medium.com/v1/users/${userId}/publications`,
    headers: {
      Authorization: "Bearer " + authCode,
      contentType: "application/json;charset=utf-8",
      Accept: "application / json",
      acceptCharset: "utf-8"
    },
    success: function(response) {
      console.log(response);
      document.getElementById("userId").value = response.data.id;
    },
    error: function(xhr, status, error) {
      var err = eval("(" + xhr.responseText + ")");
      console.log(err);
    }
  });
});

$("#submitPostButton").click(function() {
  userId = document.getElementById("userId").value;
  let postTitle = $("input[name=title]").val();
  let markdownFile = document.forms["postform"].elements["rawmd"].value;
  let originalUrl = $("input[name = canonicalUrl]").val();

  // let userId =
  //   "195f829573f133446e8314efec18df99cdcae04356b3bc29bfc9ed97e5155d11d";

  $.ajax({
    type: "POST",
    url: `https://cors-anywhere.herokuapp.com/https://api.medium.com/v1/users/${userId}/posts`,
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
      canonicalUrl: originalUrl
    },
    success: function(response) {
      console.log(response);
    },
    error: function(xhr, status, error) {
      var err = eval("(" + xhr.responseText + ")");
      console.log(err);
    }
  });
});

$("#submitPostOrgButton").click(function() {
  userId = document.getElementById("userId").value;
  let postTitle = $("input[name=title]").val();
  let markdownFile = document.forms["postform"].elements["rawmd"].value;
  let originalUrl = $("input[name = canonicalUrl]").val();

  $.ajax({
    type: "POST",
    url: `https://cors-anywhere.herokuapp.com/https://api.medium.com/v1/publications/${publicationId}/posts`,
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
      canonicalUrl: originalUrl,
      tags: ["development", "design"],
      publishStatus: "draft"
    },
    success: function(response) {
      console.log(response);
    },
    error: function(xhr, status, error) {
      var err = eval("(" + xhr.responseText + ")");
      console.log(err);
    }
  });
});

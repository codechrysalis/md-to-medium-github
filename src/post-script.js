// import { $, jQuery } from "jquery";
let markdownFile;

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

    document.forms["postform"].elements["rawmd"].value =
      "Raw Markdown: \n" + evt.target.result;

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

$("#submitPostButton").click(function() {
  let postTitle = $("input[name=title]").val();
  let markdownFile = document.forms["postform"].elements["rawmd"].value;
  let originalUrl = $("input[name = canonicalUrl]").val();

  // If you need to get your ID, use this!

  // $.ajax({
  //   type: "GET",
  //   url: "https://api.medium.com/v1/me",
  //   headers: {
  //     Authorization:
  //       "Bearer " +
  //       "2a515fe743d0ea3327a9140ac3e9e235aab6d7ce57a34d7632fd7edcd9b5460e3",
  //     contentType: "application/json;charset=utf-8",
  //     Accept: "application / json",
  //     acceptCharset: "utf-8"
  //   },
  //   success: function(response) {
  //     console.log(response);
  //   },
  //   error: function(xhr, status, error) {
  //     var err = eval("(" + xhr.responseText + ")");
  //     console.log(err);
  //   }
  // });

  let userId =
    "195f829573f133446e8314efec18df99cdcae04356b3bc29bfc9ed97e5155d11d";

  $.ajax({
    type: "POST",
    url: `https://api.medium.com/v1/users/${userId}/posts`,
    headers: {
      Authorization:
        "Bearer " +
        "2a515fe743d0ea3327a9140ac3e9e235aab6d7ce57a34d7632fd7edcd9b5460e3",
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

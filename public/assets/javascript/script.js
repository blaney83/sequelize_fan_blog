$(function () {

    $(".create-form").on("submit", (event) => {
        event.preventDefault();

        let newTheory = {
            media_name: $("#name1").val().trim(),
            creator: $("#user").val().trim(),
            theory: $("#theoBody").val().trim(),
        };

        $.ajax("/api/theories", {
            type: "POST",
            data: newTheory
        }).then(function () {
            console.log("Added Theory");
            location.reload();
        })
    });

    $(".delete").on("click", (event) => {
        event.preventDefault();
        let id = event.target.id

        $.ajax("/api/theories/" + id, {
            type: "DELETE",
        }).then(function () {
            console.log("Theory Deleted");
            location.reload();
        })
    });

    $(".like").on("click", (event) => {
        event.preventDefault();
        let id = event.target.id
        let currLikes = parseInt(event.target.type);
        console.log(currLikes);
        let updateLikes = {
            likes: currLikes + 1
        }

        $.ajax("/api/theories/" + id, {
            type: "PUT",
            data: updateLikes
        }).then(function () {
            console.log("Added Like!");
            location.reload();
        })
    });

    $(".change-title-pen").on("click", (event) => {
        let id = event.target.id
        let titleSelector = 'h5#' + id + '.card-title'
        let theorySelector = 'p#' + id + '.card-text'
        let titleValue = editPost(titleSelector)
        let theoryValue = editPost(theorySelector)
        $("input#name.new-title").attr("value", titleValue);
        $("textarea#name.new-post").text(theoryValue);
        $(".change-title").on("click", (event) => {
            console.log(id)
            event.preventDefault();
            let updateTitle = {
                media_name: $(".new-title").val().trim(),
                theory: $(".new-post").val().trim()
            }
            $.ajax("/api/theories/" + id, {
                type: "PUT",
                data: updateTitle
            }).then(function () {
                console.log("Changed Title!");
                location.reload();
            })
        });
    });

    $(document).on("click", "#loginbtn", function (event) {
        //send a post request to author DB and set a local storage key for the session
        let username = $("#username").val().trim();
        let password = $("#password").val().trim();
        let userData = {
            creator: username,
            password: password
        };

        localStorage.setItem("username", username);
        $.ajax("/api/users", {
            type: "POST",
            data: userData
        }).then(function (data) {
            // renderPosts(data)
            console.log("logged in" + data.id)
            console.log("logged in" + JSON.stringify(data))
            localStorage.setItem("userId", data.id);

        });
        renderPosts()
    })

    function renderPosts(resp) {
        rowsToAdd = [];
        $.post("/main",
            function (data) {
                console.log("renderPosts fired")
                console.log("theories_table" + data)
                data.forEach(function (val) {
                    console.log(val)
                    rowsToAdd.push(createAuthorRow(val));
                })
                // renderAuthorList(rowsToAdd);
                // nameInput.val("");
            }).then(function () {
                console.log(rowsToAdd)
                columnContents = rowsToAdd.join("")
                console.log(rowsToAdd)
                console.log(columnContents)
                // $("#insertCardsHere").text(cardHtml)
                $("#insertCardsHere").html(columnContents)
                console.log($("#insertCardsHere"))


                renderPostCards(columnContents)
            });
        // postArray = [];
        console.log("users post is firing")
    };

    function createAuthorRow(postObj) {
        console.log(postObj)
        let postTitle = postObj.media_name;
        let postBody = postObj.theory;
        let postLikes = postObj.likes;
        let postDate = postObj.date_posted;
        let postId = postObj.id;
        let cardHtml = '<div class="card" style="width: 100%;"><div class="card-body"><h5 class="card-title justify-content-between" id=' + postId + '>' + postTitle + '<button type="button" class="btn btn-primary change-title-pen" data-toggle="modal" data-target="#exampleModal" id=' + postId + '><i class="tiny material-icons" id=' + postId + '>edit</i></button></h5><h6 class="card-subtitle mb-2 text-muted">Created by: still working on this part<br>' + postDate + '</h6><p class="card-text" id=' + postId + '>' + postBody + '</p><p>Likes: ' + postLikes + '</p><a href="#" class="card-link">Comment</a><a href="#" class="card-link delete" id=' + postId + '>Delete</a><a href="#" class="card-link like" id=' + postId + ' type=' + postLikes + '>Like</a></div></div>';
        console.log(cardHtml)
        return (cardHtml)
    };

    function renderPostCards(html) {
        function waitRender(html) {
            $("#insertCardsHere").html(html)
            console.log("listening")
        }
        setTimeout(waitRender, 2000)
    }

    $(document).ready(function (event) {
        let uName = localStorage.getItem("username");
        $("#welcomeModal").css("display", "block");
        $("#appendUserHere").append("<p>Author: " + uName + "</p>")
        $("#targetWelcomeback").html("<p>Good to see you " + uName + "! </p>")
        $("#closeWelcomeModal").on("click", function (event) {
            $("#welcomeModal").css("display", "none")

        });

        $(".signOut").on("click", function (event) {
            localStorage.clear();
            $.ajax("/", {
                type: "GET",
                data: "none"
            }).then((resp) => {
                $("body").html(resp)
                console.log("Log-out successful");
            })
        })
    })

    function editPost(blerb) {
        let messy = $(blerb).html();
        messy.split();
        if (messy.indexOf("<") >= 0) {
            console.log("Hi Im a title because I have a <button>")
            toString(messy)
            let messyArray = messy.split("<")
            let cleanText = messyArray[0].trim()
            return cleanText;
        } else {
            console.log("Hi, Im a post because I only have text")
            let cleanText = messy.trim()
            return cleanText;
        }
    }
})
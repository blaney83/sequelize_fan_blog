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

    $(document).on("click", "#loginbtn", function(event){
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
        }).then(function(resp){
            console.log(resp);
        })
    })

    $(document).ready(function(event){
        $("#welcomeModal").css("display", "block")
        $("#targetWelcomeback").html("<p>Good to see you " + localStorage.getItem("username") + "! </p>")
        console.log($("#targetWelcomeback").text());
        $("#closeWelcomeModal").on("click", function(event){
            console.log("listening")
            $("#welcomeModal").css("display", "none")
        });
        $(".signOut").on("click", function(event){
            localStorage.clear();
            $.ajax("/", {
                type: "GET",
                data: "none"
            }).then((resp)=>{
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
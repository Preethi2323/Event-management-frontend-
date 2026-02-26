$(document).ready(function(){

    
    $(".registerBtn").click(function(){
        var eventName = $(this).data("event");
        $("#eventName").val(eventName);
        var myModal = new bootstrap.Modal(document.getElementById('registerModal'));
        myModal.show();
    });

    
    $("#registerForm").submit(function(e){
        e.preventDefault();

        let name = $("#name").val();
        let email = $("#email").val();
        let phone = $("#phone").val();
        let event = $("#eventName").val();

        if(name === "" || email === "" || phone === ""){
            alert("Please fill all fields");
            return;
        }

        let registration = { name, email, phone, event };

        let users = JSON.parse(localStorage.getItem("registrations")) || [];
        users.push(registration);
        localStorage.setItem("registrations", JSON.stringify(users));

        alert("Registration Successful!");
        $("#registerForm")[0].reset();
        location.reload();
    });


    $("#searchEvent").on("keyup", function(){
        let value = $(this).val().toLowerCase();
        $(".event-card").filter(function(){
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });


    function updateCountdown(){
        let eventDate = new Date("March 30, 2026 10:00:00").getTime();
        let now = new Date().getTime();
        let gap = eventDate - now;

        let days = Math.floor(gap / (1000 * 60 * 60 * 24));
        let hours = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((gap % (1000 * 60)) / 1000);

        $("#countdown").html(
            `Next Event Starts In: ${days}d ${hours}h ${minutes}m ${seconds}s`
        );
    }

    setInterval(updateCountdown, 1000);


    $("#toggleMode").click(function(){
        $("body").toggleClass("dark-mode");
    });

    
    $("#viewRegistrations").click(function(){
        let users = JSON.parse(localStorage.getItem("registrations")) || [];
        let table = `
            <table class="table table-bordered">
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Event</th>
            </tr>
        `;

        users.forEach(user => {
            table += `
                <tr>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td>${user.event}</td>
                </tr>
            `;
        });

        table += "</table>";
        $("#registrationTable").html(table);
    });


    $("#exportData").click(function(){
        let data = localStorage.getItem("registrations");
        let blob = new Blob([data], {type: "application/json"});
        let url = URL.createObjectURL(blob);

        let a = document.createElement("a");
        a.href = url;
        a.download = "registrations.json";
        a.click();
    });
 
$(".filterBtn").click(function(){
    let filter = $(this).data("filter");

    if(filter === "all"){
        $(".event-card").show();
    } else {
        $(".event-card").hide();
        $('.event-card[data-category="'+filter+'"]').show();
    }
});   
$('a.nav-link').on('click', function(e){
    if(this.hash !== ""){
        e.preventDefault();
        const hash = this.hash;

        $('html, body').animate({
            scrollTop: $(hash).offset().top - 70
        }, 800);
    }
});

});

// Initial Events

let events = [
    {
        name: "Tech Conference",
        date: "2026-08-15",
        description: "Technology Event"
    },

    {
        name: "Music Festival",
        date: "2026-07-20",
        description: "Live Music Show"
    },

    {
        name: "Sports Day",
        date: "2025-01-10",
        description: "Sports Activities"
    }
];

// Display Events

function displayEvents(filteredEvents = events) {

    const eventList = document.getElementById("eventList");

    eventList.innerHTML = "";

    filteredEvents.forEach((event, index) => {

        let today = new Date();

        let eventDate = new Date(event.date);

        let cardClass = eventDate < today ? "past" : "upcoming";

        let card = document.createElement("div");

        card.classList.add("event-card");
        card.classList.add(cardClass);

        card.innerHTML = `
            <h3>${event.name}</h3>
            <p><strong>Date:</strong> ${event.date}</p>
            <p>${event.description}</p>

            <button class="delete-btn"
            onclick="deleteEvent(${index})">
            Delete
            </button>
        `;

        eventList.appendChild(card);

    });

}

// Add Event

document.getElementById("eventForm")
    .addEventListener("submit", function(e) {

        e.preventDefault();

        let name =
            document.getElementById("eventName").value;

        let date =
            document.getElementById("eventDate").value;

        let description =
            document.getElementById("eventDescription").value;

        let warning =
            document.getElementById("warningMessage");

        if (
            name === "" ||
            date === "" ||
            description === ""
        ) {

            warning.textContent =
                "Please fill all fields.";

            return;
        }

        warning.textContent = "";

        events.push({
            name,
            date,
            description
        });

        sortEvents();

        displayEvents();

        document.getElementById("eventForm").reset();

    });

// Delete Event

function deleteEvent(index) {

    events.splice(index, 1);

    displayEvents();

}

// Search Event

document.getElementById("searchInput")
    .addEventListener("keyup", function() {

        let searchValue =
            this.value.toLowerCase();

        let filteredEvents =
            events.filter(event =>

                event.name.toLowerCase()
                    .includes(searchValue)

                ||

                event.date.includes(searchValue)

            );

        displayEvents(filteredEvents);

    });

// Sort Events

function sortEvents() {

    events.sort((a, b) => {

        return new Date(a.date)
            - new Date(b.date);

    });

}

// Initial Display

sortEvents();

displayEvents();
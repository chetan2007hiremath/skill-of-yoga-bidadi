// ==========================================
// AIEMS HOSTEL PORTAL
// COMPLAINT MANAGEMENT
// ==========================================


// Get HTML elements
const complaintForm = document.getElementById("complaintForm");
const complaintList = document.getElementById("complaintList");


// Get saved complaints from Local Storage
let complaints =
    JSON.parse(localStorage.getItem("aiemsHostelComplaints")) || [];


// ==========================================
// DISPLAY COMPLAINTS
// ==========================================

function displayComplaints() {

    complaintList.innerHTML = "";

    // No complaints
    if (complaints.length === 0) {

        complaintList.innerHTML = `
            <p>
                No complaints submitted yet.
            </p>
        `;

        return;
    }


    // Display every complaint
    complaints.forEach(function (complaint) {

        const complaintCard =
            document.createElement("div");

        complaintCard.className = "complaint-card";


        // Status class
        let statusClass = "pending";

        if (complaint.status === "In Progress") {
            statusClass = "progress";
        }

        if (complaint.status === "Resolved") {
            statusClass = "completed";
        }


        complaintCard.innerHTML = `

            <h3>
                Complaint #${complaint.id}
            </h3>

            <p>
                <strong>Student:</strong>
                ${complaint.studentName}
            </p>

            <p>
                <strong>Room:</strong>
                ${complaint.roomNumber}
            </p>

            <p>
                <strong>Category:</strong>
                ${complaint.category}
            </p>

            <p>
                <strong>Problem:</strong>
                ${complaint.complaint}
            </p>

            <p>
                <strong>Submitted:</strong>
                ${complaint.date}
            </p>

            <p>
                <strong>Status:</strong>

                <span class="status ${statusClass}">
                    ${complaint.status}
                </span>

            </p>

            <button
                onclick="deleteComplaint(${complaint.id})">
                Delete Complaint
            </button>

        `;


        complaintList.appendChild(complaintCard);

    });
}



// ==========================================
// SUBMIT COMPLAINT
// ==========================================

complaintForm.addEventListener(
    "submit",
    function (event) {

        // Stop page refresh
        event.preventDefault();


        // Get form values
        const studentName =
            document.getElementById("studentName").value.trim();

        const roomNumber =
            document.getElementById("roomNumber").value.trim();

        const category =
            document.getElementById("category").value;

        const complaintText =
            document.getElementById("complaint").value.trim();


        // Create current date
        const currentDate =
            new Date().toLocaleString();


        // Create unique complaint ID
        const complaintID =
            Date.now();


        // Create complaint object
        const newComplaint = {

            id: complaintID,

            studentName: studentName,

            roomNumber: roomNumber,

            category: category,

            complaint: complaintText,

            status: "Pending",

            date: currentDate

        };


        // Add complaint
        complaints.push(newComplaint);


        // Save to Local Storage
        localStorage.setItem(
            "aiemsHostelComplaints",
            JSON.stringify(complaints)
        );


        // Show complaints
        displayComplaints();


        // Clear form
        complaintForm.reset();


        // Success message
        alert(
            "Complaint submitted successfully!"
        );


        // Scroll to complaint status
        document
            .querySelector(".complaint-status")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);



// ==========================================
// DELETE COMPLAINT
// ==========================================

function deleteComplaint(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this complaint?"
        );


    if (!confirmDelete) {
        return;
    }


    // Remove complaint
    complaints =
        complaints.filter(function (complaint) {

            return complaint.id !== id;

        });


    // Update Local Storage
    localStorage.setItem(
        "aiemsHostelComplaints",
        JSON.stringify(complaints)
    );


    // Display again
    displayComplaints();

}



// ==========================================
// LOAD COMPLAINTS WHEN WEBSITE OPENS
// ==========================================

displayComplaints();
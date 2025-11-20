/*
    Lab 5 - JavaScript: Forms & Events Essentials
    Student: Jas (200604948)
    File: js/script.js
*/

// Global variable for Excel result (as requested in the instructions)
let result;

// Run after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    const mainForm = document.getElementById("main-form");

    if (mainForm) {
        const pageType = mainForm.dataset.page;

        if (pageType === "home") {
            // Home page: membership form
            mainForm.addEventListener("submit", function (event) {
                event.preventDefault();
                userForm();
            });
        } else if (pageType === "excel") {
            // Excel page: numbers and functions
            mainForm.addEventListener("submit", function (event) {
                event.preventDefault();
                myExcelFuns();
            });

            // Theme buttons (Excel page)
            const btnLight = document.getElementById("theme-light");
            const btnDark = document.getElementById("theme-dark");

            if (btnLight) {
                btnLight.addEventListener("click", function () {
                    document.body.classList.add("light-theme");
                    document.body.classList.remove("dark-theme");
                });
            }

            if (btnDark) {
                btnDark.addEventListener("click", function () {
                    document.body.classList.add("dark-theme");
                    document.body.classList.remove("light-theme");
                });
            }
        }
    }
});

/* ======================
   Part 1: userForm()
   ====================== */

function userForm() {
    // Get values from the form using DOM
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();
    const city = document.getElementById("city").value.trim();
    const province = document.getElementById("province").value.trim();

    // Membership type: check which radio button is selected
    let membership = "Basic";
    if (document.getElementById("premium").checked) {
        membership = "Premium";
    } else if (document.getElementById("standard").checked) {
        membership = "Standard";
    } else if (document.getElementById("basic").checked) {
        membership = "Basic";
    }

    // Build output string
    const fullName = firstName + " " + lastName;

    let outputHtml = "<h2>Membership Summary</h2>";
    outputHtml += "<p><strong>Full Name:</strong> " + fullName + "</p>";
    outputHtml += "<p><strong>Email:</strong> " + email + "</p>";
    outputHtml += "<p><strong>Address:</strong> " + address + ", " + city + ", " + province + "</p>";
    outputHtml += "<p><strong>Membership:</strong> " + membership + "</p>";

    // Print to the output div using innerHTML
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = outputHtml;
}

/* ======================
   Part 2: myExcelFuns()
   ====================== */

function myExcelFuns() {
    // 1. Get the string of numbers from the input
    let numberStr = document.getElementById("numbers").value;

    // 2. Trim spaces at the beginning and end
    numberStr = numberStr.trim();

    // If empty, show an alert and stop
    if (numberStr === "") {
        alert("Please enter some numbers separated by spaces.");
        return;
    }

    // 3. Split into an array using space as delimiter
    const rawArray = numberStr.split(" ");

    // 4. Build a clean array: numbers only, no empty strings
    let finalNumericArray = [];

    for (let i = 0; i < rawArray.length; i++) {
        let value = rawArray[i].trim();

        if (value !== "") {
            let num = parseFloat(value);
            if (!isNaN(num)) {
                finalNumericArray.push(num);
            }
        }
    }

    // If no valid numbers found
    if (finalNumericArray.length === 0) {
        alert("No valid numbers were found. Please check your input.");
        return;
    }

    // 5. Determine which radio button is selected
    if (document.getElementById("sum").checked) {
        // AutoSum
        let total = 0;
        for (let i = 0; i < finalNumericArray.length; i++) {
            total += finalNumericArray[i];
        }
        result = total;
    } else if (document.getElementById("avg").checked) {
        // Average
        let total = 0;
        for (let i = 0; i < finalNumericArray.length; i++) {
            total += finalNumericArray[i];
        }
        result = total / finalNumericArray.length;
    } else if (document.getElementById("max").checked) {
        // Maximum value
        result = Math.max.apply(null, finalNumericArray);
    } else {
        // Minimum value (id="min")
        result = Math.min.apply(null, finalNumericArray);
    }

    // 6. Output result in the "output" div
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "<h2>Result</h2><p>" + result + "</p>";
}

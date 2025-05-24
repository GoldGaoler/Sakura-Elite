const body = document.querySelector("body");
    const passwordInput = document.getElementById("password-input");
    const togglePasswordBtn = document.getElementById("toggle-password");
    const submitBtn = document.getElementById("submit-password");
    const unitSelect = document.getElementById("unit-select");
    const popup = document.getElementById("popup");

    function showPopup(message, type = "error") {
      popup.textContent = message;
      popup.className = `popup show ${type}`;
      setTimeout(() => popup.classList.remove("show"), 3000);
    }

    togglePasswordBtn.addEventListener("click", function () {
      const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);

      this.innerHTML = type === "password"
        ? `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
             <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Z"/>
           </svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
             <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Z"/>
           </svg>`;
    });

    submitBtn.addEventListener("click", async () => {
      const unit = unitSelect.value;
      const password = parseInt(passwordInput.value, 10);

      if (!unit || isNaN(password)) {
        showPopup("Please select a unit and enter a valid numeric password.");
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "Logging in...";

      try {
        const response = await fetch("/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ unit, password }),
        });

        const data = await response.json();

        if (data.success) {
          showPopup("Login successful!", "success");
          body.style.backgroundColor = "rgb(29, 219, 51)";
          setTimeout(() => {
            window.location.href = `/unit.html?unit=${unit}`;
          }, 1000);
        } else {
          body.style.backgroundColor = "rgb(255, 93, 61)";
          showPopup("Incorrect password.");
        }
      } catch (error) {
        showPopup("Error logging in. Please try again.");
        console.error(error);
      }

      submitBtn.disabled = false;
      submitBtn.textContent = "Submit";
    });
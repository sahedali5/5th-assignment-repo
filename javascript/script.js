function updateDate() {
    const dateElement = document.getElementById("real-time-date");
    const currentDate = new Date();
    const day = currentDate.toLocaleString("default", { weekday: "long" });
    const month = currentDate.toLocaleString("default", { month: "long" });
    const date = currentDate.getDate();
    const year = currentDate.getFullYear();
    const fullDate = `${day}, ${month} ${date}, ${year}`;
    dateElement.textContent = fullDate;
}
setInterval(updateDate, 1000);
updateDate();
document.addEventListener("DOMContentLoaded", function () {
    // Get the task count element (Task Assign count)
    let taskCountElement = document.querySelector(".text-3xl.font-medium.text-sky-900");

    // Get the completed task count element (Completed task counter)
    let completedTaskElement = document.querySelector(".text-indigo-300");

    // Get the message container and clear history button
    let messageContainer = document.getElementById("message-container");
    let clearHistoryBtn = document.getElementById("clear-history-btn");

    // Convert the text content to a number
    let taskCount = parseInt(taskCountElement.textContent.trim()) || 0;
    let completedCount = parseInt(completedTaskElement.textContent.trim()) || 25; // Default to 25

    // Track the number of completed tasks
    let totalTasks = taskCount;
    let completedTasks = 0;

    // Select all "Completed" buttons
    let completeButtons = document.querySelectorAll(".btn.bg-green-950");

    completeButtons.forEach((button) => {
        button.addEventListener("click", function () {
            if (taskCount > 0) {
                taskCount--; // Decrease task count
                completedCount++; // Increase completed count
                completedTasks++; // Track completed task count

                // Update UI
                taskCountElement.textContent = taskCount;
                completedTaskElement.textContent = completedCount;

                // Add message in the aside bar with timestamp
                const cardTitle = button.closest(".flex-col").querySelector(".text-2xl").textContent;
                let now = new Date();
                let currentTime = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
                const newMessage = document.createElement("p");
                newMessage.textContent = ` Task Completed: ${cardTitle}at ${currentTime}`;

                // Add message to the container
                messageContainer.prepend(newMessage);

                // Disable the button & change background color
                button.disabled = true;
                button.style.backgroundColor = "gray";
                button.style.cursor = "not-allowed";

                // Show alert confirmation
                alert("Board Updated Successfully");

                // Check if all 6 tasks are completed
                if (completedTasks === totalTasks) {
                    setTimeout(() => {
                        alert("Congratulations! You won! All tasks are completed!");
                    }, 300);
                }
            }
        });
    });

    // Clear History Button Functionality
    clearHistoryBtn.addEventListener("click", function () {
        messageContainer.innerHTML = ""; // Clear messages
    });
});

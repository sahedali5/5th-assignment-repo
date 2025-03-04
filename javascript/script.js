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
    let taskCountElement = document.querySelector(".text-3xl.font-medium.text-sky-900");
    let completedTaskElement = document.querySelector(".text-indigo-300");
    let messageContainer = document.getElementById("message-container");
    let clearHistoryBtn = document.getElementById("clear-history-btn");
    let taskCount = parseInt(taskCountElement.textContent.trim()) || 0;
    let completedCount = parseInt(completedTaskElement.textContent.trim()) || 25;
    let totalTasks = taskCount;
    let completedTasks = 0;
    let completeButtons = document.querySelectorAll(".btn.bg-green-950");
    completeButtons.forEach((button) => {
        button.addEventListener("click", function () {
            if (taskCount > 0) {
                taskCount--;
                completedCount++;
                completedTasks++;
                taskCountElement.textContent = taskCount;
                completedTaskElement.textContent = completedCount;
                const cardTitle = button.closest(".flex-col").querySelector(".text-2xl").textContent;
                let now = new Date();
                let currentTime = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
                const newMessage = document.createElement("p");
                newMessage.textContent = ` Task Completed: ${cardTitle}at ${currentTime}`;
                messageContainer.prepend(newMessage);

                button.disabled = true;
                button.style.backgroundColor = "gray";
                button.style.cursor = "not-allowed";
                alert("Board Updated Successfully");
                if (completedTasks === totalTasks) {
                    setTimeout(() => {
                        alert("Congratulations! You won! All tasks are completed!");
                    }, 300);
                }
            }
        });
    });
    clearHistoryBtn.addEventListener("click", function () {
        messageContainer.innerHTML = "";
    });
});

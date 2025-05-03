const loadInitialTasks = () => {
  const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("task-list"); // Get the task list element
  // Set the class of the task item
  taskList.innerHTML = "";
  // console.log(existingTasks);
  for (let i = 0; i < existingTasks.length; i++) {
    const taskItem = document.createElement("li"); // Create a new list item for the task
    taskItem.setAttribute("class", "task-item");

    const newTask = existingTasks[i]; // Get the current task from the updated tasks array
    taskItem.setAttribute("id", `${newTask.taskID}`);
    taskItem.innerHTML = `<input type="checkbox" name="taskName" id ="taskName${
      newTask.taskID
    }" class="checkbox"/>
      <span><label for ="taskName" class ="task-name">${
        newTask.task
      }</label></span>
      <div class="task-actions">
        <span class="status" id="taskStatus${newTask.taskID}">${
      newTask.completed ? "Completed" : "Incomplete"
    }</span>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      </div>`;

    taskList.append(taskItem);
  }
};

document.addEventListener("DOMContentLoaded", loadInitialTasks);

const addTask = () => {
  const taskName = document.getElementById("taskName").value.trim(); // Get the task name from the input field and trim whitespace

  if (taskName === "") {
    // Check if the input is empty or contains only whitespace
    alert("Please enter a task name.");
  } else {
    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let newTask = [];
    if (document.getElementById("addTask").innerHTML === "Add") {
      newTask = { taskID: Date.now(), task: taskName, completed: false };
    } else if (document.getElementById("addTask").innerHTML === "Save") {
      newTask = { taskID: Date.now(), task: taskName, completed: false };
    }

    const updatedTasks = [...existingTasks, newTask]; // Add the new task to the existing tasks array

    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save the updated tasks array to local storage
    const taskList = document.getElementById("task-list"); // Get the task list element
    taskList.innerHTML = "";

    for (let i = 0; i < updatedTasks.length; i++) {
      const taskItem = document.createElement("li"); // Create a new list item for the task
      taskItem.setAttribute("class", "task-item"); // Set the class of the task item

      const newTask = updatedTasks[i]; // Get the current task from the updated tasks array
      taskItem.setAttribute("id", `${newTask.taskID}`);
      taskItem.innerHTML = `  <input type="checkbox" name="taskName" id ="taskName${
        newTask.taskID
      }" class="checkbox"/>
        <span><label for ="taskName" class ="task-name">${
          newTask.task
        }</label></span>
        <div class="task-actions">
          <span class="status" id="taskStatus${newTask.taskID}">${
        newTask.completed ? "Completed" : "Incomplete"
      }</span>
          <button class="edit">Edit</button>
          <button class="delete">Delete</button>
        </div>`;
      taskList.append(taskItem);
    }

    document.getElementById("taskName").value = ""; // Clear the input field after adding the task
    document.getElementById("addTask").innerHTML = "Add";
  }
};


document.getElementById("addTask").addEventListener("click", addTask);
//code for adding task ends here



//code for checkbox starts here
document.getElementById("task-list").addEventListener("click", (e) => {
  if (e.target.type === "checkbox") {
    const taskItem = e.target.closest(".task-item");
    const currentStatus = taskItem.querySelector(".status").innerHTML;

    if (currentStatus === "Incomplete") {
      taskItem.querySelector(".status").innerHTML = "Completed";
      taskItem.querySelector(".status").classList.add("completed");
      taskItem.querySelector(".task-name").classList.add("completed");
    } else if (currentStatus === "Completed") {
      taskItem.querySelector(".status").innerHTML = "Incomplete";
      taskItem.querySelector(".status").classList.remove("completed");
      taskItem.querySelector(".task-name").classList.remove("completed");
    }
  }
});
//code for checkbox ends here



//code for deleting task starts here
document.getElementById("task-list").addEventListener("click",  (e) => {
  if (e.target.classList.contains("delete")) {
    const taskItem = e.target.closest(".task-item");
    const taskItemID = e.target.closest(".task-item").getAttribute("id");
    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    for (i = 0; i < existingTasks.length; i++) {
      if (existingTasks[i].taskID == taskItemID) {
        existingTasks.splice(i, 1);
        localStorage.setItem("tasks", JSON.stringify(existingTasks));
      }
    }
    taskItem.remove();
  }
});

//code for deleting task ends here




//code for editing task starts here

document.getElementById("task-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("edit")) {
    const taskItem = e.target.closest(".task-item");
    const taskItemID = e.target.closest(".task-item").getAttribute("id");
    const taskName = taskItem.querySelector(".task-name").innerHTML;
    document.getElementById("taskName").value = taskName;
    document.getElementById("addTask").innerHTML = "Save";
    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    for (i = 0; i < existingTasks.length; i++) {
      if (existingTasks[i].taskID == taskItemID) {
        existingTasks.splice(i, 1);
        localStorage.setItem("tasks", JSON.stringify(existingTasks));
      }
    }
    taskitem.remove();
  }
  
})


//code for editing task ends here

//code for editing tasks starts here

/*
document.getElementById("task-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("edit")) {
    const taskItem = e.target.closest(".task-item");
    const taskItemID = e.target.closest(".task-item").getAttribute("id");
    const taskName = taskItem.querySelector(".task-name").innerHTML;
    document.getElementById("taskName").value = taskName;
    document.getElementById("addTask").innerHTML = "Save";
    document.getElementById("addTask").removeEventListener("click", addTask);

    document.getElementById("addTask").addEventListener("click", () => {
      console.log("save")
      const taskName = document.getElementById("taskName").value.trim();
      const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      console.log(existingTasks);

      for (let i = 0; i < existingTasks.length; i++) {
        if (existingTasks[i].taskID == taskItemID) {
          existingTasks.splice(i, 1);
          localStorage.setItem(
            "tasks",
            JSON.stringify(existingTasks)
          );

          const latestTasks = JSON.parse(localStorage.getItem("tasks")) || [];

          newTask = {
            taskID: existingTasks[i].taskID,
            task: taskName,
            completed: false,
          }; // Create a new task object

          console.log(newTask.taskID);
          const editedTasks = [...latestTasks, newTask]; // Add the new task to the existing tasks array
          localStorage.setItem(
            "tasks",
            JSON.stringify(editedTasks)
          ); // Save the updated tasks array to local storage
          console.log(editedTasks);

          const taskList = document.getElementById("task-list"); // Get the task list element
          taskList.innerHTML = "";
      
          for (let i = 0; i < editedTasks.length; i++) {
            const taskItem = document.createElement("li"); // Create a new list item for the task
            taskItem.setAttribute("class", "task-item"); // Set the class of the task item
      
            const newTask = editedTasks[i]; // Get the current task from the updated tasks array
            taskItem.setAttribute("id", `${newTask.taskID}`);
            taskItem.innerHTML = `  <input type="checkbox" name="taskName" id ="taskName${
              newTask.taskID
            }" class="checkbox"/>
              <span><label for ="taskName" class ="task-name">${
                newTask.task
              }</label></span>
              <div class="task-actions">
                <span class="status" id="taskStatus${newTask.taskID}">${
              newTask.completed ? "Completed" : "Incomplete"
            }</span>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
              </div>`;
            taskList.append(taskItem);
          }
    
          document.getElementById("taskName").value = ""; // Clear the input field after adding the task
          document.getElementById("addTask").innerHTML = "Add";


        }
      }
      
      
    


    });
  }
});
*/

//code for editing tasks ends here

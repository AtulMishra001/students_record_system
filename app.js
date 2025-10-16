/* -------------------------------For the evaluator----------------------------------
  for data retention, I have used local storage and created a property called data to store an array of objects in which each object represents a student.
  this file has 7 main functions.
  1. display() => displays the  data.
  2. getData() => returns the data from localStorage after converting it in to JSON from String.
  3. addStudent(student) => adds the provided student to data.
  4. updateStudent(data) => updates the provided student to data
  5. deleteStudent(id, email) => delete the student from data.
  6. updateMode(id, email) => sets the form for an update by disabling the ID input field and submit button to update.
  7. displayMessage(message, mode) => Display the provided message in the article element and sets the theme of it based on mode.
*/

//all the input fields
let input_name = document.querySelector(".student-name");
let input_id = document.querySelector(".student-id");
let input_email = document.querySelector(".student-email");
let input_address = document.querySelector(".student-address");
let input_course = document.querySelector(".student-course");
let input_number = document.querySelector(".student-number");
let display_messsage = document.querySelector("article");
const submit = document.querySelector(".submit-btn");

//form
let student_form = document.querySelector("#form");
//display div
let displaySection = document.querySelector(".display");

//checking if localstorage has data inside or not.
if (localStorage.length == 0) {
  localStorage.setItem("data", JSON.stringify([]));
}

document.addEventListener("DOMContentLoaded", () => {
  display();
  //catching the button clicked inside the display section using event delegation by e.target.closest("button");
  displaySection.addEventListener("click", (e) => {
    const clickedButton = e.target.closest("button");
    //getting the exact student card on which the button is clicked
    const studentCard = clickedButton.closest(".card");
    //checking if the clicked button is for updation or deletion.
    if (clickedButton && clickedButton.classList.contains("delete")) {
      deleteStudent(
        studentCard.dataset.studentId,
        studentCard.dataset.studentEmail
      );
    } else if (clickedButton && clickedButton.classList.contains("update"))
      updateMode(
        studentCard.dataset.studentId,
        studentCard.dataset.studentEmail
      );
  });
});

//submit event
student_form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  //creating an object from form data
  const studentData = Object.fromEntries(formData);

  //checking if any field contains only white spaces
  for (key in studentData) {
    if (studentData[key].trim() === "") {
      const input = document.querySelector(`[name=${key}]`);
      input.classList.add("error-border");
      input.value = "";
      input.placeholder = `Enter valid value`;
      displayMessage("empty spaces are not allowed", "warning")
      return;
    }
    else {
      document.querySelector(`[name=${key}]`).classList.remove("error-border");
    }
  }
  if(studentData.number.length < 10) {
    displayMessage("number should conatin at least 10 digits", "warning");
    return;
  }

  try {
    if (!student_form.hasAttribute("updating")) {
      addStudent(studentData);
    } else {
      updateStudent(studentData);
    }
  } catch (error) {
    console.log(error);
    displayMessage(error, "warning");
  }

  display();
});

// GETDATA function
function getData() {
  return JSON.parse(localStorage.getItem("data"));
}

//ADDStudent function
function addStudent(student) {
  //checking if student with same id or email already exists
  const currentData = getData();
  const doesStudentExists = currentData.some(
    (element) => element.id == student.id || element.email == student.email
  );
  if (doesStudentExists) {
    console.log("student already exists");
    throw new Error(
      `student already existes with id: ${student.id} or email: ${student.email}`
    );
  }
  localStorage.setItem("data", JSON.stringify([...currentData, student]));
  student_form.reset();
  displayMessage(
    `Student with ID ${student.id} has been added successfully`,
    "success"
  );
}

//UPDATESTUDENT function
function updateStudent(data) {
  const currentData = getData();
  currentData.forEach((student, index, currentData) => {
    if (student.id === data.id) {
      currentData[index] = data;
    }
  });
  localStorage.setItem("data", JSON.stringify(currentData));
  submit.innerText = "Submit";
  student_form.reset();
  input_id.removeAttribute("readonly");
  student_form.removeAttribute("updating");
  displayMessage(
    `Student with ID ${data.id} has been updated successfully`,
    "success"
  );
  display();
}

//DISPLAY function
function display() {
  /** @type Array*/
  const data = getData();
  console.log(data," from display")
  displaySection.innerHTML = "";

  data.map(
    /**
     * @param {{id: number, name: string, course: string, email: string, number: number, address: string}} student
     */
    (student) => {
      const studentCard = document.createElement("div");
      studentCard.innerHTML = `<div data-student-id=${student.id} data-student-email=${student.email} class="card min-w-[300px] max-w-[300px] h-fit bg-white rounded-xl p-4 text-lg text-secondary space-y-2">
        <span class="text-md font-semibold text-indigo-600 id">${student.id}</span>

        <p class="font-bold text-xl name">${student.name}</p>
        <p class="text-base course">${student.course}</p>
        <p class="email">${student.email}</p>
        <p class="number">${student.number}</p>
        <p class="address">${student.address}</p>
        
        <div class="card-btns flex gap-2 w-fit ml-auto pt-2">
          <button class="update action-btn inline-flex items-center justify-center">
            <i class="material-icons text-xl">edit</i>
          </button>
          <button class="delete action-btn inline-flex items-center justify-center">
            <i class="material-icons text-xl">delete</i>
          </button>
        </div>
    </div>`;
      displaySection.appendChild(studentCard);
    }
  );
}

//DELETESTUDENT function
function deleteStudent(id = "", email = "") {
  const data = getData();
  console.log(`from delete`, data)
  data.forEach((student, index, data) => {
    if (student.id == id || student.email == email) {
      data.splice(index, index == 0 ?1:index);
    }
  });
  localStorage.setItem("data", JSON.stringify(data));
  displayMessage(`Student with ID ${id} has been deleted`, "warning");
  display();
}

//UPDATESTUDENT function
function updateMode(id, email) {
  student_form.setAttribute("updating", "");
  /**@type Array */
  const data = getData();
  const studentToUpdate = data.find((card) =>
    card.id == id && card.email == email ? true : false
  );
  input_id.value = studentToUpdate.id;
  input_id.setAttribute("readonly", true);
  input_name.value = studentToUpdate.name;
  input_course.value = studentToUpdate.course;
  input_email.value = studentToUpdate.email;
  input_number.value = studentToUpdate.number;
  input_address.value = studentToUpdate.address;
  submit.innerText = "Update";
}

//DISPLAYMESSAGE function
function displayMessage(message, mode) {
  if (mode == "warning") {
    display_messsage.style.backgroundColor = "#4C2F36";
    display_messsage.style.Color = "#E19CB8";
    display_messsage.style.font = "bold";
    display_messsage.innerText = message;
  } else if (mode == "success") {
    display_messsage.style.backgroundColor = "#BCE0C8";
    display_messsage.style.color = "#4FAD60";
    display_messsage.style.font = "bold";
    display_messsage.innerText = message;
  }

  setTimeout(() => {
    display_messsage.style.backgroundColor = "transparent";
    display_messsage.style.color = "white";
    display_messsage.style.font = "default";
    display_messsage.innerText =
      " You can register new student, update the existing ones and delete them also there is a display section below to see the students records.";
  }, 5000);
}

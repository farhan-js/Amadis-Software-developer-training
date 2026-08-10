let employees = JSON.parse(localStorage.getItem("employees")) || [];

let editIndex = -1;

const form = document.getElementById("employeeForm");

const empId = document.getElementById("empId");
const empName = document.getElementById("empName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const department = document.getElementById("department");
const designation = document.getElementById("designation");
const salary = document.getElementById("salary");
const status = document.getElementById("status");

const search = document.getElementById("search");
const filterStatus = document.getElementById("filterStatus");
const sortEmployee = document.getElementById("sortEmployee");
const exportCSV = document.getElementById("exportCSV");

const table = document.getElementById("employeeTable");

const totalEmployee = document.getElementById("totalEmployee");
const activeEmployee = document.getElementById("activeEmployee");
const inactiveEmployee = document.getElementById("inactiveEmployee");

displayEmployees(employees);
updateDashboard();

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (
    empId.value.trim() === "" ||
    empName.value.trim() === "" ||
    email.value.trim() === "" ||
    phone.value.trim() === "" ||
    department.value.trim() === "" ||
    designation.value.trim() === "" ||
    salary.value.trim() === "" ||
    status.value === ""
  ) {
    alert("Please fill all fields.");
    return;
  }

  if (!/^[0-9]{10}$/.test(phone.value)) {
    alert("Phone number must contain 10 digits.");
    return;
  }

  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email.value)) {
    alert("Invalid Email Address.");
    return;
  }

  if (Number(salary.value) <= 0) {
    alert("Salary must be greater than 0.");
    return;
  }

  if (editIndex === -1) {
    let duplicate = employees.find((emp) => emp.id === empId.value);

    if (duplicate) {
      alert("Employee ID already exists.");
      return;
    }

    let employee = {
      id: empId.value,
      name: empName.value,
      email: email.value,
      phone: phone.value,
      department: department.value,
      designation: designation.value,
      salary: salary.value,
      status: status.value,
    };

    employees.push(employee);
  } else {
    employees[editIndex] = {
      id: empId.value,
      name: empName.value,
      email: email.value,
      phone: phone.value,
      department: department.value,
      designation: designation.value,
      salary: salary.value,
      status: status.value,
    };

    editIndex = -1;
  }

  saveEmployees();

  displayEmployees(employees);

  updateDashboard();

  form.reset();
});

function displayEmployees(data) {
  table.innerHTML = "";

  if (data.length === 0) {
    table.innerHTML = `
      <tr>
        <td colspan="9">No Records Found</td>
      </tr>
    `;

    return;
  }
  data.forEach((employee, index) => {
    table.innerHTML += `

        <tr>

            <td>${employee.id}</td>

            <td>${employee.name}</td>

            <td>${employee.email}</td>

            <td>${employee.phone}</td>

            <td>${employee.department}</td>

            <td>${employee.designation}</td>

            <td>${employee.salary}</td>

            <td>${employee.status}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editEmployee(${index})">
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteEmployee(${index})">
                    Delete
                </button>

            </td>

        </tr>

        `;
  });
}

function editEmployee(index) {
  editIndex = index;
  empId.value = employees[index].id;
  empName.value = employees[index].name;
  email.value = employees[index].email;
  phone.value = employees[index].phone;
  department.value = employees[index].department;
  designation.value = employees[index].designation;
  salary.value = employees[index].salary;
  status.value = employees[index].status;

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function deleteEmployee(index) {
  let confirmDelete = confirm("Are you sure you want to delete this employee?");

  if (confirmDelete) {
    employees.splice(index, 1);

    saveEmployees();

    displayEmployees(employees);

    updateDashboard();
  }
}

function saveEmployees() {
  localStorage.setItem("employees", JSON.stringify(employees));
}

function updateDashboard() {
  totalEmployee.textContent = employees.length;

  let active = employees.filter((emp) => emp.status === "Active").length;

  let inactive = employees.filter((emp) => emp.status === "Inactive").length;

  activeEmployee.textContent = active;

  inactiveEmployee.textContent = inactive;
}

search.addEventListener("keyup", function () {
  applyFilters();
});

filterStatus.addEventListener("change", function () {
  applyFilters();
});

sortEmployee.addEventListener("change", function () {
  applyFilters();
});

function applyFilters() {
  let data = [...employees];

  let keyword = search.value.toLowerCase();

  if (keyword !== "") {
    data = data.filter(
      (emp) =>
        emp.name.toLowerCase().includes(keyword) ||
        emp.id.toLowerCase().includes(keyword),
    );
    console.log(data);
  }

  if (filterStatus.value !== "All") {
    data = data.filter((emp) => emp.status === filterStatus.value);
  }

  if (sortEmployee.value === "name") {
    data.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortEmployee.value === "id") {
    data.sort((a, b) => a.id.localeCompare(b.id));
  }
  if (data.length === 0)
    document.getElementById("noresult").innerText = "No Value Found";
  else document.getElementById("noresult").innerText = "";
  displayEmployees(data);
}

exportCSV.addEventListener("click", exportToCSV);

function exportToCSV() {
  if (employees.length === 0) {
    alert("No employee data available.");

    return;
  }

  let csv =
    "Employee ID,Name,Email,Phone,Department,Designation,Salary,Status\n";

  employees.forEach(function (emp) {
    csv +=
      `"${emp.id}",` +
      `"${emp.name}",` +
      `"${emp.email}",` +
      `"${emp.phone}",` +
      `"${emp.department}",` +
      `"${emp.designation}",` +
      `"${emp.salary}",` +
      `"${emp.status}"\n`;
  });

  let blob = new Blob([csv], {
    type: "text/csv",
  });

  let url = window.URL.createObjectURL(blob);

  let link = document.createElement("a");

  link.href = url;

  link.download = "employees.csv";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  window.URL.revokeObjectURL(url);
}

function resetForm() {
  form.reset();

  editIndex = -1;
}

function getEmployeeCount() {
  return employees.length;
}

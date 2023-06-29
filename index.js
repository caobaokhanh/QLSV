// Danh sách sinh viên
let students = [];

function addStudent() {
  // B1: DOM
  let id = document.getElementById("txtMaSV").value;
  let name = document.getElementById("txtTenSV").value;
  let email = document.getElementById("txtEmail").value;
  let password = document.getElementById("txtPass").value;
  let date = document.getElementById("txtNgaySinh").value;
  let coures = document.getElementById("khSV").value;
  let math = +document.getElementById("txtDiemToan").value;
  let physics = +document.getElementById("txtDiemLy").value;
  let chemistry = +document.getElementById("txtDiemHoa").value;

  //B2: Khởi tạo đối tượng Student
  let student = new Student(
    id,
    name,
    email,
    password,
    date,
    coures,
    math,
    physics,
    chemistry
  );

  // B3: Thêm đối tượng student vào danh sách
  students.push(student);

  // B4: Hiển thị danh sách student ra giao diện
  display(students);

  // B5: Reset form
  resetForm();
}

// Hàm nhận vào mảng students và hiển thị ra giao diện
function display(students) {
  let html = students.reduce((result, value) => {
    return (
      result +
      `
        <tr>
            <td>${value.id}</td>
            <td>${value.name}</td>
            <td>${value.email}</td>
            <td>${value.date}</td>
            <td>${value.coures}</td>
            <td>${value.caclScore()}</td>
            <td>
                <button 
                class="btn btn-warning"
                onclick="selectStudent('${value.id}')">
                    Chỉnh sửa
                </button>
                <button 
                class="btn btn-danger" 
                onclick="removeStudent('${value.id}')">
                    Xóa
                </button>
            </td>
        </tr>
      `
    );
  }, "");

  document.getElementById("tbodySinhVien").innerHTML = html;
}

function resetForm() {
  /* Cách 1:
  let id = document.getElementById("txtMaSV");
  let name = document.getElementById("txtTenSV");
  let email = document.getElementById("txtEmail");
  let password = document.getElementById("txtPass");
  let date = document.getElementById("txtNgaySinh");
  let coures = document.getElementById("khSV");
  let math = document.getElementById("txtDiemToan");
  let physics = document.getElementById("txtDiemLy");
  let chemistry = document.getElementById("txtDiemHoa");

  id.value = "";
  name.value = "";
  email.value = "";
  password.value = "";
  date.value = "";
  coures.value = "";
  math.value = "";
  physics.value = "";
  chemistry.value = ""; */

  // Cách 2:
  document.getElementById("txtMaSV").value = "";
  document.getElementById("txtTenSV").value = "";
  document.getElementById("txtEmail").value = "";
  document.getElementById("txtPass").value = "";
  document.getElementById("txtNgaySinh").value = "";
  document.getElementById("khSV").value = "";
  document.getElementById("txtDiemToan").value = "";
  document.getElementById("txtDiemLy").value = "";
  document.getElementById("txtDiemHoa").value = "";

  document.getElementById("txtMaSV").disabled = false;
  document.getElementById("btnAdd").disabled = false;
}

function findStudent() {
  // B1: DOM
  let search = document.getElementById("txtSearch").value;

  // B2: Lọc sinh viên có tên khớp với giá trị tìm kiếm và không đc thay đổi mảng ban đầu
  search = search.trim(); // Xóa khoảng trắng cuối
  search = search.toLowerCase(); // chuyển chữ hoa thành chữ thường

  let newStudents = students.filter((value) => {
    let name = value.name.trim().toLowerCase();
    return name.includes(search);
  });

  // Hiển thị ra giao diện
  display(newStudents);
}

function removeStudent(studentId) {
  // Cách 1:
  // Tìm index của phần tử student có id khớp với giá trị của studentId
  //   let index = students.findIndex((value) => {
  //     return value.id === studentId;
  //   });

  //   // Dựa vào index để xóa phần tử khỏi mảng
  //   if (index !== -1) {
  //     students.splice(index, 1);
  //   }

  //   display(students);

  // Cách 2:
  students = students.filter((value) => {
    return value.id !== studentId;
  });
  display(students);
}

function selectStudent(studentId) {
  let student = students.find((value) => {
    return value.id === studentId;
  });

  // fill thông tin của student lên giao diện
  document.getElementById("txtMaSV").value = student.id;
  document.getElementById("txtTenSV").value = student.name;
  document.getElementById("txtEmail").value = student.email;
  document.getElementById("txtPass").value = student.password;
  document.getElementById("txtNgaySinh").value = student.date;
  document.getElementById("khSV").value = student.coures;
  document.getElementById("txtDiemToan").value = student.math;
  document.getElementById("txtDiemLy").value = student.physics;
  document.getElementById("txtDiemHoa").value = student.chemistry;

  // disable input mã sinh viên và button thêm sinh viên
  document.getElementById("txtMaSV").disabled = true;
  document.getElementById("btnAdd").disabled = true;
}

function updateStudent() {
  // B1: DOM
  let id = document.getElementById("txtMaSV").value;
  let name = document.getElementById("txtTenSV").value;
  let email = document.getElementById("txtEmail").value;
  let password = document.getElementById("txtPass").value;
  let date = document.getElementById("txtNgaySinh").value;
  let coures = document.getElementById("khSV").value;
  let math = +document.getElementById("txtDiemToan").value;
  let physics = +document.getElementById("txtDiemLy").value;
  let chemistry = +document.getElementById("txtDiemHoa").value;

  //B2: Khởi tạo đối tượng Student
  let student = new Student(
    id,
    name,
    email,
    password,
    date,
    coures,
    math,
    physics,
    chemistry
  );

  // B3: Tìm index của phần tử student cần cập
  let index = students.findIndex((value) => {
    return value.id === id;
  });

  // Thay thế phần tử thứ index cho object student vừa tạo ở trên
  students[index] = student;

  // B4: Hiển thị danh sách
  display(students);

  // B5: Reset form
  resetForm(students);
}

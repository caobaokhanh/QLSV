// Danh sách sinh viên
let students = [];

// Biến kiểm tra xem form đã được submit hay chưa
let isSubmitted = false;

// Gọi hàm init để khởi tạo danh sách sinh viên nếu có
init();

function init() {
  // Student = null // []
  // Dùng Dấu hoặc " || " trong phép gán nó sẽ lấy giá trị truthy value đầu tiên
  students = JSON.parse(localStorage.getItem("students")) || [];

  students = students.map((value) => {
    return new Student(
      value.id,
      value.name,
      value.email,
      value.password,
      value.date,
      value.coures,
      value.math,
      value.physics,
      value.chemistry
    );
  });
  display(students);
}

function addStudent() {
  // B1: DOM
  // let id = document.getElementById("txtMaSV").value;
  // let name = document.getElementById("txtTenSV").value;
  // let email = document.getElementById("txtEmail").value;
  // let password = document.getElementById("txtPass").value;
  // let date = document.getElementById("txtNgaySinh").value;
  // let coures = document.getElementById("khSV").value;
  // let math = +document.getElementById("txtDiemToan").value;
  // let physics = +document.getElementById("txtDiemLy").value;
  // let chemistry = +document.getElementById("txtDiemHoa").value;

  // //B2: Khởi tạo đối tượng Student
  // let student = new Student(
  //   id,
  //   name,
  //   email,
  //   password,
  //   date,
  //   coures,
  //   math,
  //   physics,
  //   chemistry
  // );

  // let isValid = validate(student);
  // if (!isValid) {
  //   return;
  // }

  // =====================================================

  // B1 + B2: Gọi tới hàm validate để kiểm tra form và tạo đối tượng student
  isSubmitted = true;

  let student = validate();
  if (!student) {
    return;
  }

  // B3: Thêm đối tượng student vào danh sách
  students.push(student);
  localStorage.setItem("students", JSON.stringify(students));

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
  isSubmitted = false;

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

  document.getElementById("spanMaSV").innerHTML = "";
  document.getElementById("spanTenSV").innerHTML = "";
  document.getElementById("spanEmailSV").innerHTML = "";
  document.getElementById("spanMatKhau").innerHTML = "";
  document.getElementById("spanNgaySinh").innerHTML = "";
  document.getElementById("spanKhoaHoc").innerHTML = "";
  document.getElementById("spanToan").innerHTML = "";
  document.getElementById("spanLy").innerHTML = "";
  document.getElementById("spanHoa").innerHTML = "";

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

  localStorage.setItem("students", JSON.stringify(students));

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
  isSubmitted = true;
  let student = validate();
  if (!student) {
    return;
  }

  // // B1: DOM
  // let id = document.getElementById("txtMaSV").value;
  // let name = document.getElementById("txtTenSV").value;
  // let email = document.getElementById("txtEmail").value;
  // let password = document.getElementById("txtPass").value;
  // let date = document.getElementById("txtNgaySinh").value;
  // let coures = document.getElementById("khSV").value;
  // let math = +document.getElementById("txtDiemToan").value;
  // let physics = +document.getElementById("txtDiemLy").value;
  // let chemistry = +document.getElementById("txtDiemHoa").value;

  // //B2: Khởi tạo đối tượng Student
  // let student = new Student(
  //   id,
  //   name,
  //   email,
  //   password,
  //   date,
  //   coures,
  //   math,
  //   physics,
  //   chemistry
  // );

  // B3: Tìm index của phần tử student cần cập
  let index = students.findIndex((value) => {
    return value.id === student.id;
  });

  // Thay thế phần tử thứ index cho object student vừa tạo ở trên
  students[index] = student;

  localStorage.setItem("students", JSON.stringify(students));

  // B4: Hiển thị danh sách
  display(students);

  // B5: Reset form
  resetForm(students);
}

// Hàm kiểm tra giá trị có rỗng hay không
function isRequired(value) {
  if (!value.trim()) {
    // Đặt dấu ! để phủ định nếu nó là false thì phủ định nó là true để nó chạy vào trong cái if
    // Chuỗi rỗng
    return false;
  }
  return true;
}

// Hàm kiểm tra điểm có hợp lệ hay không
function isScore(value) {
  // Sử dụng hàm isNaN có sẳn trong JS để kiểm tra xem nó có phải là NaN hay không
  if (isNaN(value)) {
    return false;
  }
  if (value < 0 || value > 10) {
    return false;
  }

  return true;
}

// Hàm kiểm tra mật khẩu: có ít nhất 8 kí tự, 1 chữ hoa, 1 chữ thường, 1 số, 1 kí tự đặc biệt
function isPassword(value) {
  let regex =
    /^(?=.*[A-Z])(?=.*[!&%\/()=\?\^\*\+\]\[#><;:,\._-|@])(?=.*[0-9])(?=.*[a-z]).{8,40}$/;

  return regex.test(value);
}

// Hàm kiểm tra email
function isEmail(value) {
  let regex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
  return regex.test(value);
}

// Hàm kiểm tra tất cả input trên form có hợp lệ hay không
function validate() {
  let id = document.getElementById("txtMaSV").value;
  let name = document.getElementById("txtTenSV").value;
  let email = document.getElementById("txtEmail").value;
  let password = document.getElementById("txtPass").value;
  let date = document.getElementById("txtNgaySinh").value;
  let coures = document.getElementById("khSV").value;
  let math = document.getElementById("txtDiemToan").value;
  let physics = document.getElementById("txtDiemLy").value;
  let chemistry = document.getElementById("txtDiemHoa").value;

  // Math, physics, chemistry không ép kiểu để hàm isRequired kiểm tra xem nó có rỗng hay k

  // Kĩ thuật đặt cờ hiệu
  let isValid = true; // Sử dụng isValid để mặc định thông tin của student là true

  if (!isRequired(id)) {
    // Không hợp lệ
    isValid = false;
    document.getElementById("spanMaSV").innerHTML =
      "Mã sinh viên không được để trống";
  }

  if (!isRequired(name)) {
    isValid = false;
    document.getElementById("spanTenSV").innerHTML =
      "Tên sinh viên không được để trống";
  }

  if (!isRequired(email)) {
    isValid = false;
    document.getElementById("spanEmailSV").innerHTML =
      "Email sinh viên không được để trống";
  } else if (!isEmail(email)) {
    isValid = false;
    document.getElementById("spanEmailSV").innerHTML =
      "Email sinh viên không hợp lệ";
  }

  if (!isRequired(password)) {
    isValid = false;
    document.getElementById("spanMatKhau").innerHTML =
      "Mật khẩu không được để trống";
  } else if (!isPassword(password)) {
    isValid = false;
    document.getElementById("spanMatKhau").innerHTML = "Mật khẩu không hợp lệ";
  }

  if (!isRequired(date)) {
    isValid = false;
    document.getElementById("spanNgaySinh").innerHTML =
      "Ngày sinh không được để trống";
  }

  if (!isRequired(coures)) {
    isValid = false;
    document.getElementById("spanKhoaHoc").innerHTML =
      "Khóa học không được để trống";
  }

  if (!isRequired(math)) {
    isValid = false;
    document.getElementById("spanToan").innerHTML =
      "Điểm Toán không được để trống";
  } else if (!isScore(+math)) {
    isValid = false;
    document.getElementById("spanToan").innerHTML = "Điểm Toán không hợp lệ";
  }

  if (!isRequired(physics)) {
    isValid = false;
    document.getElementById("spanLy").innerHTML = "Điểm Lý không được để trống";
  } else if (!isScore(+physics)) {
    isValid = false;
    document.getElementById("spanLy").innerHTML = "Điểm Lý không hợp lệ";
  }

  if (!isRequired(chemistry)) {
    isValid = false;
    document.getElementById("spanHoa").innerHTML =
      "Điểm Hóa không được để trống";
  } else if (!isScore(+chemistry)) {
    isValid = false;
    document.getElementById("spanHoa").innerHTML = "Điểm Hóa không hợp lệ";
  }

  if (isValid) {
    // Form hợp lệ => tạo ra đối tượng student để trả về
    let student = new Student(
      id,
      name,
      email,
      password,
      date,
      coures,
      +math,
      +physics,
      +chemistry
    );

    return student;
  }

  // Form không hợp lệ => Không tạo đối tượng student
  return undefined;
}

document.getElementById("txtMaSV").oninput = (event) => {
  if (!isSubmitted) return;

  // Tất cả sự kiện trong Javascript đều nhận đc đối tượng event
  // event.target: phần tử html phát sinh sự kiện
  let idSpan = document.getElementById("spanMaSV");
  if (isRequired(event.target.value)) {
    idSpan.innerHTML = "";
  } else {
    idSpan.innerHTML = "Mã sinh viên không được để trống";
  }
};

document.getElementById("txtTenSV").oninput = (event) => {
  if (!isSubmitted) return;

  // Tất cả sự kiện trong Javascript đều nhận đc đối tượng event
  // event.target: phần tử html phát sinh sự kiện
  let nameSpan = document.getElementById("spanTenSV");
  if (isRequired(event.target.value)) {
    nameSpan.innerHTML = "";
  } else {
    nameSpan.innerHTML = "Tên sinh viên không được để trống";
  }
};

document.getElementById("txtEmail").oninput = (event) => {
  if (!isSubmitted) return;

  // Tất cả sự kiện trong Javascript đều nhận đc đối tượng event
  // event.target: phần tử html phát sinh sự kiện
  let emailSpan = document.getElementById("spanEmailSV");
  if (isRequired(event.target.value)) {
    emailSpan.innerHTML = "";
  } else {
    emailSpan.innerHTML = "Email sinh viên không được để trống";
  }
};

document.getElementById("txtPass").oninput = (event) => {
  if (!isSubmitted) return;

  // Tất cả sự kiện trong Javascript đều nhận đc đối tượng event
  // event.target: phần tử html phát sinh sự kiện
  let pwSpan = document.getElementById("spanMatKhau");
  if (isRequired(event.target.value)) {
    pwSpan.innerHTML = "";
  } else {
    pwSpan.innerHTML = "Mật khẩu không được để trống";
  }
};

document.getElementById("txtNgaySinh").oninput = (event) => {
  if (!isSubmitted) return;

  // Tất cả sự kiện trong Javascript đều nhận đc đối tượng event
  // event.target: phần tử html phát sinh sự kiện
  let dateSpan = document.getElementById("spanNgaySinh");
  if (isRequired(event.target.value)) {
    dateSpan.innerHTML = "";
  } else {
    dateSpan.innerHTML = "Ngày sinh không được để trống";
  }
};

document.getElementById("khSV").oninput = (event) => {
  if (!isSubmitted) return;

  // Tất cả sự kiện trong Javascript đều nhận đc đối tượng event
  // event.target: phần tử html phát sinh sự kiện
  let couresSpan = document.getElementById("spanKhoaHoc");
  if (isRequired(event.target.value)) {
    couresSpan.innerHTML = "";
  } else {
    couresSpan.innerHTML = "Khóa học không được để trống";
  }
};

document.getElementById("txtDiemToan").oninput = (event) => {
  if (!isSubmitted) return;

  // Tất cả sự kiện trong Javascript đều nhận đc đối tượng event
  // event.target: phần tử html phát sinh sự kiện
  let mathSpan = document.getElementById("spanToan");
  if (isRequired(event.target.value)) {
    mathSpan.innerHTML = "";
  } else {
    mathSpan.innerHTML = "Điểm Toán không được để trống";
  }
};

document.getElementById("txtDiemLy").oninput = (event) => {
  if (!isSubmitted) return;

  // Tất cả sự kiện trong Javascript đều nhận đc đối tượng event
  // event.target: phần tử html phát sinh sự kiện
  let physicsSpan = document.getElementById("spanLy");
  if (isRequired(event.target.value)) {
    physicsSpan.innerHTML = "";
  } else {
    physicsSpan.innerHTML = "Điểm Lý không được để trống";
  }
};

document.getElementById("txtDiemHoa").oninput = (event) => {
  if (!isSubmitted) return;

  // Tất cả sự kiện trong Javascript đều nhận đc đối tượng event
  // event.target: phần tử html phát sinh sự kiện
  let chemistrySpan = document.getElementById("spanHoa");
  if (isRequired(event.target.value)) {
    chemistrySpan.innerHTML = "";
  } else {
    chemistrySpan.innerHTML = "Điểm Hóa không được để trống";
  }
};

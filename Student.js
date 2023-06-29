// Định nghĩa Student constructor
function Student(
  id,
  name,
  email,
  password,
  date,
  coures,
  math,
  physics,
  chemistry
) {
  this.id = id;
  this.name = name;
  this.email = email;
  this.password = password;
  this.date = date;
  this.coures = coures;
  this.math = math;
  this.physics = physics;
  this.chemistry = chemistry;
}
Student.prototype.caclScore = function () {
  return (this.math + this.physics + this.chemistry) / 3;
};

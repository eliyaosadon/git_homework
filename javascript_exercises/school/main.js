import { Principal } from "./Principal.js"
import { Teacher } from "./Teacher.js"
import { Student } from "./Student.js"

// principals
const p1 = new Principal("Martin", 1991)
const p2 = new Principal("Martha", 1990)

// teachers
const t1 = new Teacher("Cassandra", 2002, 40000)
const t2 = new Teacher("Kevin", 2006, 30000)

// students
const s1 = new Student("Ronda", 2017)
const s2 = new Student("Byron", 2016)


// 1 & 2
p1.hireTeacher(t1)
console.log(p1.teachers)

p1.hireTeacher(t2)
console.log(p1.teachers)

// 3 & 4
p1.recruitStudent(s1)
p1.recruitStudent(s2)
console.log(p1.students)

// 5
p1.expelStudent(s1)
console.log(p1.students)

// 6
p1.transferStudent(s2, p2)
console.log(p1.students)
console.log(p2.students)

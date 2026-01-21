import { Person } from "./person.js"

export class Principal extends Person {
    constructor(name, startYear) {
        super(name, startYear)
        this.teachers = []
        this.students = []
    }

    hireTeacher(teacher) {
        this.teachers.push(teacher)
        console.log(`${this.name} just hired ${teacher.name}`)
    }

    recruitStudent(student) {
        this.students.push(student)
    }

    expelStudent(student) {
        this.students = this.students.filter(s => s.name !== student.name)
    }

    transferStudent(student, otherPrincipal) {
        this.expelStudent(student)
        otherPrincipal.recruitStudent(student)
    }
}

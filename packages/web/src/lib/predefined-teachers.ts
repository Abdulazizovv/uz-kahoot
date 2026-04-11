export interface PredefinedTeacherAccount {
  login: string
  password: string
  first_name: string
  last_name: string
}

// Teachers are pre-defined here (no self-registration).
// Later you can move this list to a JSON file under `config/` if needed.
export const predefinedTeachers: PredefinedTeacherAccount[] = [
  {
    login: "teacher",
    password: "teacher1",
    first_name: "Jasurbek",
    last_name: "Erkinov",
  },
]


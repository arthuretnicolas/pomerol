// @flow

type RoleType = {
  name: string,
  id: string
}

export const roles: Array<RoleType> = [
  {
    id: 'viewer',
    name: 'Viewer'
  },
  {
    id: 'author',
    name: 'Author'
  },
  {
    id: 'manager',
    name: 'Manager'
  },
  {
    id: 'admin',
    name: 'Admin'
  }
]

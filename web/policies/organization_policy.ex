defmodule Pomerol.OrganizationPolicy do
  import Pomerol.Helpers.Policy, only: [get_membership: 2, get_role: 1, author_or_higher?: 1, member?: 1]

  alias Pomerol.User
  alias Pomerol.Organization

  def create?(%User{} = user), do: true

  def update?(%User{admin: true}, %Organization{}), do: true
  def update?(%User{} = user, %Organization{} = organization), do: organization |> get_membership(user) |> get_role |> author_or_higher?

  def show?(%User{admin: true}, %Organization{}), do: true
  def show?(%User{} = user, %Organization{} = organization), do: organization |> get_membership(user) |> get_role |> member?
end

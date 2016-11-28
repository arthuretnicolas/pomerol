defmodule Pomerol.OrganizationPolicy do
  import Pomerol.Helpers.Policy,
    only: [get_membership: 2, get_role: 1, admin_or_higher?: 1]

  alias Pomerol.User
  alias Pomerol.Organization

  def create?(%User{admin: true}), do: true
  def create?(%User{admin: false}), do: false

  def update?(%User{admin: true}, %Organization{}), do: true
  def update?(%User{} = user, %Organization{} = organization), do: organization |> get_membership(user) |> get_role |> admin_or_higher?
end

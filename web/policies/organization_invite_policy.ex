defmodule Pomerol.OrganizationInvitePolicy do
  import Pomerol.Helpers.Policy, only: [get_membership: 2, get_role: 1, manager_or_higher?: 1]
  alias Pomerol.User
  alias Pomerol.OrganizationInvite
  alias Ecto.Changeset

  def create?(%User{admin: true}, %Changeset{}), do: true
  def create?(%User{} = user, %Changeset{changes: %{email: email, role: given_role}} = changeset) do
    user_membership = changeset |> get_membership(user)
    user_role = user_membership |> get_role
    different_email = email != user.email

    case [user_role, given_role, different_email] do
      # Non-member, viewer, author, can't do anything
      [nil, _, _] -> false
      ["viewer", _, _] -> false
      ["author", _, _] -> false
      # user cannot invite his email
      [_, _, false] -> false
      # manager or higher can invite only if role is equal or lower
      ["manager", "admin", true] -> false
      ["manager", _, true] -> true
      ["admin", _, true] -> true
      ["owner", _, true] -> true
      # No other role change is allowed
      [_, _, _] -> false
    end
  end
  def create?(%User{}, %Changeset{}), do: false

  def update?(%User{admin: true}, %OrganizationInvite{}), do: true
  def update?(%User{} = user, %OrganizationInvite{} = organization_invite), do: organization_invite |> get_membership(user) |> get_role |> manager_or_higher?

  def delete?(%User{admin: true}, %OrganizationInvite{}), do: true
  def delete?(%User{} = user, %OrganizationInvite{} = organization_invite), do: organization_invite |> get_membership(user) |> get_role |> manager_or_higher?

end

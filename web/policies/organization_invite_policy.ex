defmodule Pomerol.OrganizationInvitePolicy do
  import Pomerol.Helpers.Policy, only: [get_membership: 2, get_role: 1, manager_or_higher?: 1]
  alias Pomerol.User
  alias Pomerol.OrganizationInvite
  alias Ecto.Changeset

  def create?(%User{admin: true}, %Changeset{}), do: true
  def create?(%User{} = user, %Changeset{} = changeset), do: changeset |> get_membership(user) |> get_role |> manager_or_higher?
  def create?(%User{}, %Changeset{}), do: false

  def update?(%User{admin: true}, %OrganizationInvite{}), do: true
  def update?(%User{} = user, %OrganizationInvite{} = organization_invite), do: organization_invite |> get_membership(user) |> get_role |> manager_or_higher?

  def delete?(%User{admin: true}, %OrganizationInvite{}), do: true
  def delete?(%User{} = user, %OrganizationInvite{} = organization_invite), do: organization_invite |> get_membership(user) |> get_role |> manager_or_higher?

end

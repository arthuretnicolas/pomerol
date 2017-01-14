defmodule Pomerol.OrganizationItemPolicy do
  import Pomerol.Helpers.Policy, only: [get_membership: 2, get_role: 1, author_or_higher?: 1]

  alias Pomerol.{OrganizationItem, User}
  alias Ecto.Changeset

  def create?(%User{admin: true}, %OrganizationItem{}), do: true
  def create?(%User{admin: true}, %Changeset{}), do: true
  def create?(%User{} = user, %OrganizationItem{} = organization_item), do: organization_item |> get_membership(user) |> get_role |> author_or_higher?
  def create?(%User{} = user, %Changeset{} = changeset), do: changeset |> get_membership(user) |> get_role |> author_or_higher?

  def update?(%User{admin: true}, %Changeset{}), do: true
  def update?(%User{} = user, %Changeset{data: %OrganizationItem{} = organization_item} = changeset), do: organization_item |> get_membership(user) |> get_role |> author_or_higher?
  def update?(%User{}, %Changeset{}), do: false
end

defmodule Pomerol.UserPolicy do
  import Pomerol.Helpers.Policy, only: [get_membership: 2, get_role: 1, member?: 1]

  alias Pomerol.User
  alias Ecto.Changeset

  # user try to change current_organization_id -> verify membership
  def update?(%User{} = current_user, %Changeset{changes: %{current_organization_id: current_organization_id}, data: %User{} = user} = changeset) do
    owner = current_user.id == user.id
    member = changeset |> get_membership(current_user) |> get_role |> member?
    owner && member
  end

  # user try to update his "profile" without updating current_organization_id
  def update?(%User{} = user, %Changeset{data: %User{} = current_user} = changeset) do
    user.id == current_user.id
  end
end

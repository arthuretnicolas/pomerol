defmodule Pomerol.OrganizationService do
  use Pomerol.Web, :service
  alias Pomerol.{Repo, OrganizationMembership, User}

  def insert(changeset, params) do
    Multi.new
    |> Multi.insert(:organization, changeset)
    |> Multi.run(:insert_organization_membership, &(insert_organization_membership(params["user_id"], &1[:organization])))
    |> Multi.run(:update_user_current_organization, &(update_user_current_organization(params["user_id"], &1[:organization])))
  end

  def insert_organization_membership(user_id, organization) do
    Repo.insert(OrganizationMembership.create_changeset(%OrganizationMembership{}, %{organization_id: organization.id, member_id: user_id, role: "owner"}))
    {:ok, organization}
  end

  def update_user_current_organization(user_id, organization) do
    user = User |> Repo.get!(user_id)
    changeset = User.update_changeset(user, %{current_organization_id: organization.id})
    Repo.update(changeset)
    {:ok, organization}
  end

end

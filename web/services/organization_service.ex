defmodule Pomerol.OrganizationService do
  use Pomerol.Web, :service
  alias Pomerol.{Repo, OrganizationMembership}

  def insert(changeset, params) do
    Multi.new
    |> Multi.insert(:organization, changeset)
    |> Multi.run(:insert_organization_membership, &(insert_organization_membership(params["user_id"], &1[:organization])))
  end

  def insert_organization_membership(user_id, organization) do
    Repo.insert(OrganizationMembership.create_changeset(%OrganizationMembership{}, %{organization_id: organization.id, member_id: user_id, role: "owner"}))
    {:ok, organization}
  end

end

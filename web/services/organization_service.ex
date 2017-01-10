defmodule Pomerol.OrganizationService do
  use Pomerol.Web, :service
  alias Pomerol.{Repo, OrganizationMembership, OrganizationTaxRate, User}

  def insert(changeset, params) do
    Multi.new
    |> Multi.insert(:organization, changeset)
    |> Multi.run(:insert_organization_membership, &(insert_organization_membership(params["user_id"], &1[:organization])))
    |> Multi.run(:update_user_current_organization, &(update_user_current_organization(params["user_id"], &1[:organization])))
    |> Multi.run(:insert_organization_default_tax_rates, &(insert_organization_default_tax_rates(&1[:organization])))
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

  def insert_organization_default_tax_rates(organization) do
    changeset = OrganizationTaxRate.create_changeset(%OrganizationTaxRate{}, %{organization_id: organization.id, name: "NO TAX", tax_rate_percent: 0})
    Repo.insert(changeset)
    changeset = OrganizationTaxRate.create_default_changeset(%OrganizationTaxRate{}, %{organization_id: organization.id, name: "20% TAX", tax_rate_percent: 20})
    Repo.insert(changeset)
    {:ok, organization}
  end

end

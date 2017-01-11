defmodule Pomerol.OrganizationSalesCategoryPolicy do
  import Pomerol.Helpers.Policy, only: [get_membership: 2, get_role: 1, author_or_higher?: 1, get_organization_tax_rate: 1, get_organization: 1]

  alias Pomerol.{OrganizationSalesCategory, User}
  alias Ecto.Changeset

  def create?(%User{admin: true}, %OrganizationSalesCategory{}), do: true
  def create?(%User{admin: true}, %Changeset{}), do: true
  def create?(%User{} = user, %OrganizationSalesCategory{} = organization_sales_category), do: organization_sales_category |> get_membership(user) |> get_role |> author_or_higher?
  def create?(%User{} = user, %Changeset{changes: %{organization_tax_rate_id: organization_tax_rate_id, organization_id: organization_id}} = changeset) do
    author_or_higher = changeset |> get_membership(user) |> get_role |> author_or_higher?
    organization = changeset |> get_organization_tax_rate |> get_organization
    author_or_higher && organization.id == organization_id
  end
  def create?(%User{} = user, %Changeset{} = changeset), do: changeset |> get_membership(user) |> get_role |> author_or_higher?

  def update?(%User{admin: true}, %Changeset{}), do: true
  # If the user changes the organization_tax_rate_id -> verify that it belongs to the current_organization
  def update?(%User{} = user, %Changeset{changes: %{organization_tax_rate_id: organization_tax_rate_id}, data: %OrganizationSalesCategory{} = organization_sales_category} = changeset) do
    organization = changeset |> get_organization_tax_rate |> get_organization
    author_or_higher = organization_sales_category |> get_membership(user) |> get_role |> author_or_higher?
    organization_sales_category.organization_id == organization.id && author_or_higher
  end
  def update?(%User{} = user, %Changeset{data: %OrganizationSalesCategory{} = organization_sales_category} = changeset), do: organization_sales_category |> get_membership(user) |> get_role |> author_or_higher?
  def update?(%User{}, %Changeset{}), do: false

end

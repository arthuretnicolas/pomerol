defmodule Pomerol.Helpers.Policy do
  @moduledoc """
  Holds helpers for extracting record relationships and determining roles for
  authorization policies.
  """

  import Ecto.Query

  alias Pomerol.{Organization, OrganizationMembership, OrganizationInvite, OrganizationTaxRate, OrganizationTransactionalEmail, OrganizationSalesCategory, Quote, Repo, User, Contact, NotificationEmail}
  alias Ecto.Changeset

  @doc """
  Retrieves the specified user's membership record, from an `Ecto.Changeset`,
  containing an `organization_id` field, or from a `Pomerol.Organization` struct

  Returns `Pomerol.OrganizationMembership`
  """
  def get_membership(nil, %User{}), do: nil
  def get_membership(%Changeset{changes: %{organization_id: organization_id}}, %User{id: user_id}), do: do_get_membership(organization_id, user_id)
  def get_membership(%Changeset{changes: %{current_organization_id: current_organization_id}}, %User{id: user_id}), do: do_get_membership(current_organization_id, user_id)
  def get_membership(%OrganizationInvite{organization_id: organization_id}, %User{id: user_id}), do: do_get_membership(organization_id, user_id)
  def get_membership(%OrganizationTaxRate{organization_id: organization_id}, %User{id: user_id}), do: do_get_membership(organization_id, user_id)
  def get_membership(%OrganizationSalesCategory{organization_id: organization_id}, %User{id: user_id}), do: do_get_membership(organization_id, user_id)
  def get_membership(%OrganizationTransactionalEmail{organization_id: organization_id}, %User{id: user_id}), do: do_get_membership(organization_id, user_id)
  def get_membership(%NotificationEmail{organization_id: organization_id}, %User{id: user_id}), do: do_get_membership(organization_id, user_id)
  def get_membership(%Contact{organization_id: organization_id}, %User{id: user_id}), do: do_get_membership(organization_id, user_id)
  def get_membership(%Quote{organization_id: organization_id}, %User{id: user_id}), do: do_get_membership(organization_id, user_id)
  def get_membership(%Organization{id: organization_id}, %User{id: user_id}), do: do_get_membership(organization_id, user_id)
  defp do_get_membership(organization_id, user_id) do
    OrganizationMembership
    |> where([m], m.member_id == ^user_id and m.organization_id == ^organization_id)
    |> Repo.one
  end

  @doc """
  Retrieves the role field, from a `Pomerol.OrganizationMembership` struct or an `Ecto.Changeset`

  Returns `:string`
  """
  def get_role(nil), do: nil
  def get_role(%OrganizationMembership{role: role}), do: role
  def get_role(%Changeset{} = changeset), do: changeset |> Changeset.get_field(:role)

  @doc """
  Determines if provided string is equal to "owner"
  """
  def owner?("owner"), do: true
  def owner?(_), do: false

  def member?(role) when role in ["viewer", "author", "manager", "admin", "owner"], do: true
  def member?(_), do: false

  def author_or_higher?(role) when role in ["owner", "admin", "manager", "author"], do: true
  def author_or_higher?(_), do: false

  @doc """
  Determines if provided string is equal to one of `["admin", "owner"]`
  """
  def admin_or_higher?(role) when role in ["admin", "owner"], do: true
  def admin_or_higher?(_), do: false

  @doc """
  Determines if provided string is equal to one of `["manager","admin", "owner"]`
  """
  def manager_or_higher?(role) when role in ["manager", "admin", "owner"], do: true
  def manager_or_higher?(_), do: false

  def get_current_organization(%{current_organization_id: current_organization_id}), do: Organization |> Repo.get(current_organization_id)
  def get_current_organization(%Changeset{changes: %{current_organization_id: current_organization_id}}), do: Organization |> Repo.get(current_organization_id)
  def get_current_organization(_), do: nil

  def get_organization_tax_rate(%{organization_tax_rate_id: organization_tax_rate_id}), do: OrganizationTaxRate |> Repo.get(organization_tax_rate_id)
  def get_organization_tax_rate(%Changeset{changes: %{organization_tax_rate_id: organization_tax_rate_id}}), do: OrganizationTaxRate |> Repo.get(organization_tax_rate_id)
  def get_organization_tax_rate(_), do: nil

  def get_organization(%{organization_id: organization_id}), do: Organization |> Repo.get(organization_id)
  def get_organization(%Changeset{changes: %{organization_id: organization_id}}), do: Organization |> Repo.get(organization_id)
  def get_organization(_), do: nil

end

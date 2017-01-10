defmodule Pomerol.OrganizationTaxRateService do
  use Pomerol.Web, :service
  alias Pomerol.{Repo, OrganizationTaxRate, Organization}
  alias Ecto.Multi
  import Ecto.Query

  def update(%OrganizationTaxRate{} = organization_tax_rate, attributes) do
    changeset = organization_tax_rate |> OrganizationTaxRate.update_changeset(attributes)
    do_update(changeset)
  end

  defp do_update(%Changeset{changes: %{default: true}} = changeset) do
    multi =
      Multi.new
      |> Multi.update(:organization_tax_rate, changeset)
      |> Multi.run(:update_old_default_tax_rate, &update_old_default_tax_rate/1)

    case Repo.transaction(multi) do
      {:ok, %{
        organization_tax_rate: organization_tax_rate
      }} ->
        {:ok, organization_tax_rate}
      {:error, :organization_tax_rate, %Ecto.Changeset{} = changeset, %{}} ->
        {:error, changeset}
      {:error, _failed_operation, _failed_value, _changes_so_far} ->
        {:error, :unhandled}
    end
  end

  defp do_update(%Changeset{} = changeset) do
    with {:ok, organization_tax_rate} <- Repo.update(changeset) do
      {:ok, organization_tax_rate}
    else
      {:error, changeset} -> {:error, changeset}
      _ -> {:error, :unhandled}
    end
  end

  defp update_old_default_tax_rate(%{organization_tax_rate: %OrganizationTaxRate{id: id, organization_id: organization_id}}) do
    old_organization_tax_rate_default =
      from(o in OrganizationTaxRate, where: o.id != ^id and o.organization_id == ^organization_id and o.default == true)
      |> Repo.one()

    old_organization_tax_rate_default
    |> OrganizationTaxRate.update_default_changeset(%{default: false})
    |> Repo.update
  end

end
